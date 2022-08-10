import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getUserStakedNum = async (account) => {
    if (!window.mineContract) {
        console.warn("in getUserStakedNum ");
        initialize();
    }
    const userStake = await window.mineContract.getUserStakedNum(account);
    return formatNumber(userStake)
};

const getUserStaked = async (account, startIndex, pageNum) => {
    if (!window.mineContract) {
        console.warn("in valuebleNFT getUserStaked ");
        initialize();
    }
    return await window.mineContract.getUserStaked(account, startIndex, pageNum);
}

const getAllStakedNum = async () => {
    if (!window.mineContract) {
        console.warn("in getAllStakedNum ");
        initialize();
    }
    const allStakeNum = await window.mineContract.getAllStakedNum();
    return formatNumber(allStakeNum)
};


const getAllStaked = async (startIndex, pageNum) => {
    if (!window.mineContract) {
        console.warn("in valuebleNFT getAllStaked ");
        initialize();
    }
    return await window.mineContract.getAllStaked(startIndex, pageNum);
}


// ------post function-----
const staking = async (amount, tokenIds) => {
    if (!window.Signer || !window.mineContract) {
        console.warn("in valuebleNFT safeMint ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.mineContract.connect(window.Signer).staking(
                amount,
                tokenIds
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
                console.log(transaction)
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
        // local store this tx hash
        console.log('amount===', amount)
        NoticeEmitter.on("staking success", (tokenIds) => {
            resolve({
                success: true,
                tokenIds,
            });
        });
    });
};

const rescue = async (tokenIds) => {
    if (!window.Signer || !window.mineContract) {
        console.warn("in valuebleNFT safeMint ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.mineContract.connect(window.Signer).rescue(
                tokenIds
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
                console.log(transaction)
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
        // local store this tx hash
        console.log('amount===', amount)
        NoticeEmitter.on("rescue success", (tokenIds) => {
            resolve({
                success: true,
                tokenIds,
            });
        });
    });
};

export {
    getUserStakedNum, // 用户质押的数量。
    getUserStaked, // list 合约地址，上架的NFT 总个数。
    getAllStakedNum,
    getAllStaked,
    staking, //批量质押
    rescue, //批量解质押
};
