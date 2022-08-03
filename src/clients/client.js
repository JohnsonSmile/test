import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { contracts } from "./contracts";
import { ellipsisAccount } from "../utils/utils";
import { toast } from "react-toastify";
import { NoticeEmitter } from "../utils";

// web3 library
const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  initialize(provider);
  return library;
};

const initialize = (provider) => {
  const prov = provider ? provider : window.ethereum;
  window.provider = provider;
  const library = new ethers.providers.Web3Provider(prov);
  // contracts
  window.usdtContract = new ethers.Contract(
    contracts.usdt,
    contracts.usdtABI,
    library
  );
  window.VSDContract = new ethers.Contract(
    contracts.vsd,
    contracts.vsdABI,
    library
  );
  window.valueContract = new ethers.Contract(
    contracts.value,
    contracts.valueABI,
    library
  );
  window.socialNFTContract = new ethers.Contract(
    contracts.socialNFT,
    contracts.socialNFTABI,
    library
  );
  window.listContract = new ethers.Contract(
    contracts.list,
    contracts.listABI,
    library
  );

  window.swapContract = new ethers.Contract(
    contracts.swap,
    contracts.swapABI,
    library
  );

  window.Library = library;

  window.Signer = library.getSigner();

  // listener
  // socialnft
  window.socialNFTContract.on(
    "SafeMint",
    (owner, amount, tokenIds, safeMintAt) => {
      console.log(owner, amount, tokenIds, safeMintAt);
      const account = localStorage.getItem("account");
      if (account === owner) {
        NoticeEmitter.emit("mint success", tokenIds);
      }
    }
  );
  window.socialNFTContract.on(
    "Stake",
    (owner, tokenId, newStatu, stakeAt) => {
      // TODO: toast something!
      console.log(owner, tokenId, newStatu, stakeAt);
      const accountLocal = localStorage.getItem("account");
      if (accountLocal === owner && newStatu) {
        NoticeEmitter.emit("stake success", {tokenId, isStake: true});
        // toast.info(
        //   `You have stake your nft, tokenId is: ${tokenId.toString()}!`
        // );
      } else if (accountLocal === owner && !newStatu) {
        NoticeEmitter.emit("stake success", {tokenId, isStake: false});
        // toast.info(
        //   `You have unstake your nft, tokenId is: ${tokenId.toString()}!`
        // );
      }
    }
  );

  // list
  window.listContract.on(
    "List",
    (owner, tokenId, price, operation, opreateAt) => {
      const accountLocal = localStorage.getItem("account");
      if (accountLocal === owner) {
        if (operation) {
          NoticeEmitter.emit("list success", tokenId, price, true);
        } else {
          NoticeEmitter.emit("unlist success", tokenId, false);
        }
      }
    }
  );
  window.listContract.on(
    "Buy",
    (buyer, tokenId, price, buyAt) => {
      const accountLocal = localStorage.getItem("account");
      if (accountLocal === buyer) {
        NoticeEmitter.emit("buy success", tokenId, price);
      }
    });
};

const injected = new InjectedConnector({
  // supportedChainIds: [56, 97, 31337],
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 31337],
  // supportedChainIds: [56],
});

/*===========hooks=============*/
// useActivatingConnector
const useActivatingConnector = () => {
  const { connector } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState(injected);
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  return activatingConnector;
};

const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))
  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);
  return tried;
};

const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React();
  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };
      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};

/*===========methods=============*/
// toggle to wallet
const ToggleLoginButton = () => {
  const { active, error, activate, deactivate, account } = useWeb3React();
  useEffect(() => {
    if (error) {
      const msg = formatMessageError(error);
      toast.warn(msg);
    }
  }, [error]);

  useEffect(() => {
    if (account) {
      localStorage.setItem("account", account);
    } else {
      localStorage.setItem("account", "");
    }
  }, [account]);

  return (
    <Button
      fullWidth
      variant={"contained"}
      style={{
        background: "linear-gradient(to right, #39fe7b, #106552)",
        color: "#FFF",
        fontWeight: 700,
        border: "2px solid #4eadfe",
        width: 136,
        height: 48,
        borderRadius: 10,
      }}
      onClick={() => {
        !active ? activate(injected) : deactivate(injected);
      }}
    >
      {active ? ellipsisAccount(account) : "Connect Wallet"}
    </Button>
  );
};

const formatMessageError = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    // move this to config
    return "Please testing on BSC mainnet.";
  } else if (error instanceof UserRejectedRequestError) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
};

export {
  getLibrary,
  initialize,
  useActivatingConnector,
  useEagerConnect,
  useInactiveListener,
  ToggleLoginButton,
  injected,
};
