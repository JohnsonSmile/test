import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getTotalPrice = async (amount) => {
    if (!window.socialNFTContract) {
        console.warn("in getPrice ");
        initialize();
    }
    const totalPrice = await window.socialNFTContract.getTotalPrice(amount);
    return totalPrice;
};

const getUserStakedNum = async (account) => {
    if (!window.socialNFTContract) {
        console.warn("in getUserStakedNum ");
        initialize();
    }
    const userStake = await window.socialNFTContract.getUserStakedNum(account);
    return formatNumber(userStake)
};

const getBalance = async (account) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getBalance ");
        initialize();
    }
    const userBalance = await window.socialNFTContract.balanceOf(account);
    return formatNumber(userBalance);
}

const getUserStakedTokenIDsByPage = async (account, startIndex, pageNum) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getgetUserStakedTokenIDsByPageBalance ");
        initialize();
    }
    return await window.socialNFTContract.getUserStakedTokenIDsByPage(account, startIndex, pageNum);
}

const getAllStakedNum = async () => {
    if (!window.socialNFTContract) {
        console.warn("in getAllStakedNum ");
        initialize();
    }
    const allStakeNum = await window.socialNFTContract.getAllStakedNum();
    return formatNumber(allStakeNum)
};

const getTotalSupply = async () => {
    if (!window.socialNFTContract) {
        console.warn("in getTotalSupply ");
        initialize();
    }
    const total = await window.socialNFTContract.totalSupply()
    return getBigNumber(total);
}

const getAllStakedTokenIDs = async (startIndex, pageNum) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getAllStakedTokenIDs ");
        initialize();
    }
    return await window.socialNFTContract.getAllStakedTokenIDs(startIndex, pageNum);
}

const isStake = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT isStake ");
        initialize();
    }
    return await window.socialNFTContract.isStake(tokenId);
}

const getTokenURI = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getTokenURI ");
        initialize();
    }
    return await window.socialNFTContract.tokenURI(tokenId);
};

const getBaseURI = async () => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getTokenURI ");
        initialize();
    }
    return await window.socialNFTContract.baseURI();
}

const getApproved = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getApproved ");
        initialize();
    }
    return await window.socialNFTContract.getApproved(tokenId);
};

// ------post function-----
const safeMint = async (amount) => {
    if (!window.Signer || !window.socialNFTContract) {
        console.warn("in socialNFT safeMint ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.socialNFTContract.connect(window.Signer).safeMint(
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
                console.log(transaction)
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
        // local store this tx hash
        const tokenIds = [];
        NoticeEmitter.on("mint success", (tokenId) => {
            tokenIds.push(tokenId);
            if (tokenIds.length === amount) {
                resolve({
                    success: true,
                    tokenIds,
                });
            }
        });
    });
};

const stakeNFT = async (tokenId, isStake) => {
    if (!window.Signer || !window.socialNFTContract) {
        console.warn("in socialNFT stakeNFT ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.socialNFTContract.connect(window.Signer).stakeNFT(
                tokenId,
                isStake
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
    });
};

const approve = async (to, tokenId) => {
    if (!window.Signer || !window.socialNFTContract) {
        console.warn("in approve stakeNFT ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.socialNFTContract.connect(window.Signer).approve(
                to,
                tokenId
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
    });
};


export {
    getTotalPrice, // 得到铸造的总的价格，传递数量amount -> getAllowce(看有无授权) -> approve (usdt, vsd 等) -> safeMint
    getUserStakedNum, // 用户质押的数量。
    getBalance, // list 合约地址，上架的NFT 总个数。
    getUserStakedTokenIDsByPage, // 获取用户NFT的ID分页，不一定是质押的
    getAllStakedNum,
    getTotalSupply, // 已经 build 的nft总数量
    getAllStakedTokenIDs,
    isStake,
    getTokenURI,
    getBaseURI,
    getApproved,
    safeMint,
    stakeNFT,
    approve // list上架流程需要， approve list to 为 list的合约地址,
};
