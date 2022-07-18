import React from "react";
import { useWeb3React } from "@web3-react/core";
import { formatBigNumber, NoticeEmitter, getBigNumber } from "../utils";
import { ethers } from "ethers";
import { initialize } from "./client";
;
;;

const getTTBalance = async (account) => {
    if (!window.ERC20Contract) {
        initialize()
    }
    return window.ERC20Contract.balanceOf(account)
}

//
const getTotalSupply = async () => {
    if (!window.ERC20Contract) {
        initialize()
    }
    const totalSupply = await window.ERC20Contract.totalSupply()
    return formatBigNumber(totalSupply)
}

// function like  this should update every time the block number changes
const getTotalMint = async () => {
    if (!window.ERC20Contract) {
        initialize()
    }
    const totalMint = await window.ERC20Contract.totalMint()
    return formatBigNumber(totalMint)
}

const useTotalBurn = () => {
    const { account, library } = useWeb3React();
    const [balance, setBalance] = React.useState();
    React.useEffect(() => {
        if (window.ERC20Contract) {
            window.ERC20Contract.totalBurn()
                .then((result) => {
                    setBalance(formatBigNumber(result));
                })
                .catch((err) => {
                    console.log("err: " + err);
                    setBalance("failed to load balance");
                });
        }
    }, [library, account]);
    return balance;
}

const useIsSwapLocked = () => {
    const { account, library } = useWeb3React();
    const defaultStatus = "unknown";
    const [isSwapLocked, setIsSwapLocked] = React.useState(defaultStatus);
    React.useEffect(() => {
        if (window.ERC20Contract) {
            window.ERC20Contract.isSwapLocked()
                .then((result) => {
                    setIsSwapLocked(result.toString());
                })
                .catch((err) => {
                    console.log("err: " + err);
                    setIsSwapLocked(defaultStatus);
                });
        }
    }, [library, account]);
    return isSwapLocked ;
}

const useIsOpenTrading = () => {
    const { account, library } = useWeb3React();
    const defaultStatus = "unknown";

    const [isOpenTrading, setIsOpenTrading] = React.useState(defaultStatus);
    React.useEffect(() => {
        if (window.ERC20Contract) {
            window.ERC20Contract.isOpenTrading()
                .then((result) => {
                    setIsOpenTrading(result.toString());
                })
                .catch((err) => {
                    console.log("err: " + err);
                    setIsOpenTrading(defaultStatus);
                });
        }
    }, [library, account]);
    return isOpenTrading;
}

const MintToken = async () => {
    const tokenAmount = ethers.utils.parseUnits("1000.0", 9);
    if (window.Signer) {
        window.Toast.promise(
            window.ERC20Contract.connect(window.Signer).mint(
                "0x6E2EE712C203be8950Bc33AC9B4065CC90B1155C",
                tokenAmount
            )((resolve, reject) => {
                setTimeout(() => {
                    this.resolvePromise ? resolve(null) : reject(null);
                    this.resolvePromise = !this.resolvePromise;
                }, 3000);
            }),
            {
                pending: "Promise is pending",
                success: "Promise resolved 👌",
                error: "Promise rejected 🤯",
            }
        );
    }
}


// faucet
const requestTokens = async (library) => {
    if (!window.Signer || !window.ERC721Contract) {
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.ERC20Contract.connect(window.Signer).requestTokens({
                gasLimit: 300000,
            });
            library.once(tx.hash, (transaction) => {
                if (transaction.status === 1) {
                    resolve({
                        success: true,
                    });
                } else {
                    resolve({
                        success: false,
                    });
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

// get FaucetAmount
const getFaucetAmount = async () => {
    if (!window.ERC721Contract) {
        console.warn("in getTotalSurvivors ");
        initialize();
    }
    const total = await window.ERC20Contract.faucetAmount();
    // 1000,0000,0000.0
    return ethers.utils.formatUnits(total.toString(), 9);
}

export {
    getTTBalance,
    getTotalSupply,
    getTotalMint,
    requestTokens,
    useTotalBurn,
    useIsSwapLocked,
    useIsOpenTrading,
    MintToken,
    getFaucetAmount,
}
