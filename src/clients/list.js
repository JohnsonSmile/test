import { getBigNumber, NoticeEmitter, formatNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getListItems = async (startIndex, pageNum) => {
    if (!window.listContract) {
        console.warn("in list getListItems ");
        initialize();
    }
    return await window.listContract.getListItems(startIndex, pageNum);
};

const getUserListItemsNum = async (account) => {
    if (!window.listContract) {
        console.warn("in list getListItems ");
        initialize();
    }
    const userListItemsNum = await window.listContract.getUserListItemsNum(account);
    return formatNumber(userListItemsNum);
};

const getUserListItems = async (account, startIndex, pageNum) => {
    if (!window.listContract) {
        console.warn("in list getListItems ");
        initialize();
    }
    const userListItems = await window.listContract.getUserListItems(account, startIndex, pageNum);
    return userListItems;
}



// ------post function-----
const listing = async (tokenId, price) => {
    if (!window.Signer || !window.listContract) {
        console.warn("in list listing ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.listContract.connect(window.Signer).listing(
                tokenId,
                price
                // {
                //   gasLimit: window.ERC721Contract.estimate.safeMint * amount,
                // }
            );

            window.Library.once(tx.hash, (transaction) => {
                if (transaction.status === 1) {
                    resolve({ success: true });
                    // window.Library.call(tx)
                    //     .then((res) => {
                    //         console.log(res);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //         reject(err);
                    //     });
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

const unlist = async (tokenId) => {
    if (!window.Signer || !window.listContract) {
        console.warn("in list unlist ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.listContract.connect(window.Signer).unlist(
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

const buy = async (tokenId) => {
    if (!window.Signer || !window.listContract) {
        console.warn("in list buy ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.listContract.connect(window.Signer).buy(
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
    getListItems,//所有上架的NFT
    getUserListItemsNum,//得到用户listing的数量
    getUserListItems,//得到用户listing的NFT的具体信息
    listing,
    unlist, // 通过map退回给原地址
    buy // 购买
};
