import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getTotalPrice = async (amount, payType) => {
    if (!window.valuebleNFTContract) {
        console.warn("in getPrice ");
        initialize();
    }
    const totalPrice = await window.valuebleNFTContract.getTotalPrice(amount, payType);
    return totalPrice;
};

const getBalance = async (account) => {
    if (!window.valuebleNFTContract) {
        console.warn("in valuebleNFT getBalance ");
        initialize();
    }
    const userBalance = await window.valuebleNFTContract.balanceOf(account);
    return formatNumber(userBalance);
}

const getUserOwnNum = async (account) => {
    if (!window.valuebleNFTContract) {
        console.warn("in valuebleNFT getUserOwnNum ");
        initialize();
    }
    const userOwnNum = await window.valuebleNFTContract.getUserOwnNum(account);
    return formatNumber(userOwnNum);
}

const getUserOwn = async (account, startIndex, pageNum) => {
    if (!window.valuebleNFTContract) {
        console.warn("in valuebleNFT getUserOwn ");
        initialize();
    }
    const userOwn = await window.valuebleNFTContract.getUserOwn(account, startIndex, pageNum);
    return userOwn;
}

const getTotalSupply = async () => {
    if (!window.valuebleNFTContract) {
        console.warn("in getTotalSupply ");
        initialize();
    }
    const total = await window.valuebleNFTContract.totalSupply()
    return getBigNumber(total);
}

const getApproved = async (tokenId) => {
    if (!window.valuebleNFTContract) {
        console.warn("in valuebleNFT getApproved ");
        initialize();
    }
    return await window.valuebleNFTContract.getApproved(tokenId);
};


const getIsApprovedForAll = async (account, address) => {

    if (!window.valuebleNFTContract) {
        console.warn("in valuebleNFT isApprovedForAll ");
        initialize();
    }
    return await window.valuebleNFTContract.isApprovedForAll(account, address);
}

// ------post function-----
const safeMint = async (amount, payType, isStake) => {
    if (!window.Signer || !window.valuebleNFTContract) {
        console.warn("in valuebleNFT safeMint ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.valuebleNFTContract.connect(window.Signer).safeMint(
                amount,
                payType,
                isStake,
                {
                  gasLimit: 300000 * amount,
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
                console.log(transaction)
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
        // local store this tx hash
        console.log('amount===', amount)
        NoticeEmitter.on("mint success", (tokenIds) => {
            resolve({
                success: true,
                tokenIds,
            });
        });
    });
};


const approve = async (to, tokenId) => {
    if (!window.Signer || !window.valuebleNFTContract) {
        console.warn("in approve stakeNFT ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.valuebleNFTContract.connect(window.Signer).approve(
                to,
                tokenId
                // {
                //   gasLimit: window.ERC721Contract.estimate.safeMint * amount,
                // }
            );

            window.Library.once(tx.hash, (transaction) => {
                if (transaction.status === 1) {
                    // window.Library.call(tx)
                    //     .then((res) => {
                    //         console.log(res);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //         reject(err);
                    //     });
                    resolve({ success: true })
                } else {
                    resolve({ success: false })
                }
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const setApprovalForAll = async (operator, approved) => {
    if (!window.Signer || !window.valuebleNFTContract) {
        console.warn("in approve stakeNFT ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.valuebleNFTContract.connect(window.Signer).setApprovalForAll(
                operator,
                approved
                // {
                //   gasLimit: window.ERC721Contract.estimate.safeMint * amount,
                // }
            );

            window.Library.once(tx.hash, (transaction) => {
                if (transaction.status === 1) {
                    // window.Library.call(tx)
                    //     .then((res) => {
                    //         console.log(res);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //         reject(err);
                    //     });
                    resolve({ success: true })
                } else {
                    resolve({ success: false })
                }
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

const batchStakeNFT = () => {
    throw new Error('not implemented');
}

const getUserStakedTokenIDsByPage = () => {
    throw new Error('not implemented');
}

const getUserStakedNum = () => {
    throw new Error('not implemented');
}

const stakeNFT = () => {
    throw new Error('not implemented');
}

export {
    getTotalPrice, // 得到铸造的总的价格，传递数量amount -> getAllowce(看有无授权) -> approve (usdt, vsd 等) -> safeMint
    getBalance, // list 合约地址，上架的NFT 总个数。
    getUserOwnNum, // 获取用户NFT数量（包含Listing的NFT）
    getUserOwn,// 获取用户NFT tokenId（包含Listing的NFT） 包含品质
    getTotalSupply, // 已经 build 的nft总数量
    getApproved,
    getIsApprovedForAll,
    safeMint, // isStake_ 是否质押
    approve, // list上架流程需要， approve list to 为 list的合约地址,
    batchStakeNFT,
    getUserStakedTokenIDsByPage,
    getUserStakedNum,
    stakeNFT,
    setApprovalForAll,//operator: mineAddress approved:true
};
