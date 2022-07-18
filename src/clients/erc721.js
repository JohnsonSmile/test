import { getBigNumber, NoticeEmitter } from "../utils";
import { initialize } from "./client";

// current price
const getPrice = async () => {
  if (!window.ERC721Contract) {
    console.warn("in getPrice ");
    initialize();
  }
  return window.ERC721Contract.price();
};

// now founded survivors
const getTotalFoundedSurvivors = async () => {
  if (!window.ERC721Contract) {
    console.warn("in getTotalFoundedWarriors ");
    initialize();
  }
  const now = await window.ERC721Contract.tokenID();
  return getBigNumber(now) - 1;
};

// total Survivors
const getTotalSurvivors = async () => {
  if (!window.ERC721Contract) {
    console.warn("in getTotalSurvivors ");
    initialize();
  }
  const total = await window.ERC721Contract._totalSupply();
  return getBigNumber(total);
};

// next id
const getNextSurvivorID = async () => {
  if (!window.ERC721Contract) {
    console.warn("in getNextSurvivorID");
    initialize();
  }
  return window.ERC721Contract.tokenID();
};

// list allNFTS
const getMyNFTs = async (account) => {
  if (!window.ERC721Contract) {
    initialize();
  }
  const unstakes = await window.ERC721Contract.getUnstakedNFTs(account);
  console.log("unstakes: " + unstakes);
  if (unstakes && unstakes.length > 0) {
    return Array.from(unstakes).sort((a, b) => a - b);
  }
  return [];
};

// get nft info
const getTokenURI = (tokenId) => {
  if (!window.ERC721Contract) {
    initialize();
  }
  return window.ERC721Contract.tokenURI(tokenId);
};

const getTokenAvalable = () => {
  if (!window.ERC721Contract) {
    initialize();
  }
  return window.ERC721Contract._revealed();
}

// find survivor
const mintNFT = async (amount) => {
  if (!window.Signer || !window.ERC721Contract) {
    initialize();
  }
  return new Promise(async (resolve, reject) => {
    try {
      const tx = await window.ERC721Contract.connect(window.Signer).safeMint(
        amount
        // {
        //   gasLimit: window.ERC721Contract.estimate.safeMint * amount,
        // }
      );

      window.Library.once(tx.hash, (transaction) => {
        if (transaction.status !== 1) {
          window.Library.call(tx)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
    // local store this tx hash
    const survivorIDs = [];
    NoticeEmitter.on("mint success", (survivorID) => {
      survivorIDs.push(survivorID);
      if (survivorIDs.length === amount) {
        resolve({
          success: true,
          survivorIDs,
        });
      }
    });
  });
};

export {
  getPrice,
  getTotalFoundedSurvivors,
  getTotalSurvivors,
  getNextSurvivorID,
  getMyNFTs,
  mintNFT,
  getTokenURI,
  getTokenAvalable,
};
