import { NoticeEmitter } from "../utils";
import { initialize } from "./client";

const getDailyIncome = async () => {
  if (!window.MineContract) {
    initialize();
  }
  return window.MineContract.DAILY_EARNED();
};

const getUnaccountedRewards = async () => {
  if (!window.MineContract) {
    initialize();
  }
  return await window.MineContract.unaccountedRewards();
};

const stake = async (account, tokenIds) => {
  if (!window.MineContract) {
    initialize();
  }
  return new Promise(async (resolve, reject) => {
    try {
      const tx = await window.MineContract.connect(window.Signer).staking(
        account,
        tokenIds,
        {
          gasLimit: 300000 * tokenIds.length,
        }
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
      reject(e);
    }
    // local store this tx hash and tokenIds
    const survivorIDs = [];
    NoticeEmitter.on("stake success", (survivorID) => {
      if (tokenIds.some((id) => id.toString() === survivorID.toString())) {
        survivorIDs.push(survivorID);
        if (survivorIDs.length === tokenIds.length) {
          resolve({
            success: true,
            survivorIDs,
          });
        }
      }
    });
  });
};

// TODO: fix this
const getStakedNFTSWithAccount = async (account) => {
  if (!window.ProxyContract && !window.ERC721Contract) {
    initialize();
  }
  const stakes = await window.MineContract.getStakedNFTs(account);
  // account = "0x8c358c1B3E85FD2142b5010375f209ECF581c8d0";
  // const totalSurvivors = await getTotalFoundedSurvivors();
  // const batchSize = 200;
  // const batch = Math.floor(totalSurvivors / batchSize);
  // const stakes = [];
  // if (totalSurvivors < batchSize) {
  //   const batchStake = await window.MineContract.getStaked(
  //     account,
  //     1,
  //     totalSurvivors
  //   )
  //   stakes.push(...batchStake)
  // } else {
  //   for (let i = 0; i < batch; i++) {
  //     const batchStake = await window.MineContract.getStaked(
  //       account,
  //       1 + i * batchSize,
  //       i * batchSize + batchSize
  //     );
  //     stakes.push(...batchStake);
  //   }
  //   const batchStake = await window.MineContract.getStaked(
  //     account,
  //     batch * batchSize + 1,
  //     totalSurvivors.toNumber()
  //   );
  //   stakes.push(...batchStake);
  // }
  if (stakes && stakes.length > 0) {
    return Array.from(stakes).sort((a, b) => a - b);
  }
  return [];
};

// get nft info
const getStakedDetails = (tokenIds) => {
  if (!window.ERC721Contract) {
    initialize();
  }
  return window.MineContract.getStakedNFTsDetails(tokenIds);
};

const claim = async (tokenIds) => {
  if (!window.MineContract || !window.Signer) {
    initialize();
  }
  return new Promise(async (resolve, reject) => {
    try {
      const tx = await window.MineContract.connect(window.Signer).claimMany(
        tokenIds,
        false,
        {
          gasLimit: 300000 * tokenIds.length,
        }
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
      reject(e);
    }
    const survivors = [];
    NoticeEmitter.on("claim success", (survivorID, isApe) => {
      if (tokenIds.some((id) => id.toString() === survivorID.toString())) {
        survivors.push({
          survivorID: survivorID,
          isApe: isApe,
        });
        if (survivors.length === tokenIds.length) {
          resolve({
            success: true,
            survivors,
          });
        }
      }
    });
  });
};

const rescue = async (tokenIds) => {
  if (!window.MineContract || !window.Signer) {
    initialize();
  }

  return new Promise(async (resolve, reject) => {
    try {
      const tx = await window.MineContract.connect(window.Signer).claimMany(
        tokenIds,
        true,
        {
          gasLimit: 300000 * tokenIds.length,
        }
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
      reject(e);
    }
    const survivors = [];
    NoticeEmitter.on("rescue success", (survivorID, isApe) => {
      if (tokenIds.some((id) => id.toString() === survivorID.toString())) {
        survivors.push({
          survivorID: survivorID,
          isApe: isApe,
        });
        if (survivors.length === tokenIds.length) {
          resolve({
            success: true,
            survivors,
          });
        }
      }
    });
  });
};

export {
  getDailyIncome,
  stake,
  claim,
  rescue,
  getUnaccountedRewards,
  getStakedNFTSWithAccount,
  getStakedDetails,
};
