import { getBigNumber, NoticeEmitter } from "../utils";
import { initialize } from "./client";

// ------get function------
const getListItems = async (startIndex, pageNum) => {
    if (!window.listContract) {
        console.warn("in list getListItems ");
        initialize();
    }
    return await window.listContract.getListItems(startIndex, pageNum);
};

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
    getListItems,
    listing,
    unlist, // 通过map退回给原地址
    buy // 查看
};
