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
        const tid = tokenId
        // local store this tx hash
        NoticeEmitter.on("list success", ({tokenId, price, isList}) => {
            if (tid === tokenId.toNumber()) {
                resolve({
                    success: true,
                    tokenId,
                    price
                })
            }
        });
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
        const tid = tokenId
        // local store this tx hash
        NoticeEmitter.on("unlist success", ({tokenId}) => {
            if (tid === tokenId.toNumber()) {
                resolve({
                    success: true,
                    tokenId,
                })
            }
        });
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
        // local store this tx hash
        NoticeEmitter.on("buy success", (tokenId, price) => {
            resolve({
                success: true,
                tokenId,
            })
        });
    });
};

export {
    getListItems,//???????????????NFT
    getUserListItemsNum,//????????????listing?????????
    getUserListItems,//????????????listing???NFT???????????????
    listing,
    unlist, // ??????map??????????????????
    buy // ??????
};
