import { getBigNumber, NoticeEmitter } from "../utils";
import { initialize } from "./client";

// ------get function------
const getTotalPrice = async (amount) => {
    if (!window.socialNFTContract) {
        console.warn("in getPrice ");
        initialize();
    }
    const totalPrice = window.socialNFTContract.getTotalPrice(amount);
    return {
        totalUsdtPrice: totalPrice.totalUsdtPrice,
        totalValuePrice: totalPrice.totalValuePrice,
        totalVsdPrice: totalPrice.totalVsdPrice
    }
};

const getUserStakedNum = async (account) => {
    if (!window.socialNFTContract) {
        console.warn("in getUserStakedNum ");
        initialize();
    }
    return window.socialNFTContract.getUserStakedNum(account);
};

const getBalance = async (account) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getBalance ");
        initialize();
    }
    return window.socialNFTContract.balanceOf(account);
}

const getUserStakedTokenIDsByPage = async (account, startIndex, pageNum) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getgetUserStakedTokenIDsByPageBalance ");
        initialize();
    }
    return window.socialNFTContract.getUserStakedTokenIDsByPage(account, startIndex, pageNum);
}

const getAllStakedNum = async () => {
    if (!window.socialNFTContract) {
        console.warn("in getAllStakedNum ");
        initialize();
    }
    return window.socialNFTContract.getAllStakedNum();
};

const getTotalSupply = async () => {
    if (!window.socialNFTContract) {
        console.warn("in getTotalSupply ");
        initialize();
    }
    return window.socialNFTContract.totalSupply();
}

const getAllStakedTokenIDs = async (startIndex, pageNum) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getAllStakedTokenIDs ");
        initialize();
    }
    return window.socialNFTContract.getAllStakedTokenIDs(startIndex, pageNum);
}

const isStake = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT isStake ");
        initialize();
    }
    return window.socialNFTContract.isStake(tokenId);
}

const getTokenURI = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getTokenURI ");
        initialize();
    }
    return window.socialNFTContract.tokenURI(tokenId);
};

const getApproved = async (tokenId) => {
    if (!window.socialNFTContract) {
        console.warn("in socialNFT getApproved ");
        initialize();
    }
    return window.socialNFTContract.getApproved(tokenId);
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
    getTotalPrice,
    getUserStakedNum,
    getBalance,
    getUserStakedTokenIDsByPage,
    getAllStakedNum,
    getTotalSupply,
    getAllStakedTokenIDs,
    isStake,
    getTokenURI,
    getApproved,
    safeMint,
    stakeNFT,
    approve
};
