import { getBigNumber, NoticeEmitter } from "../utils";
import { initialize } from "./client";

// ------get function------
const getUsdtBalance = async (account) => {
    if (!window.usdtContract) {
        console.warn("in usdt getUsdtBalance");
        initialize();
    }
    return await window.usdtContract.balanceOf(account);
};

const getUsdtAllowance = async (fromAddress, toAddress) => {
    if (!window.usdtContract) {
        console.warn("in usdt getUsdtAllowance ");
        initialize();
    }
    return await window.usdtContract.allowance(fromAddress, toAddress);
};

// ------post function-----
const usdtApprove = async (spender, account) => {
    if (!window.Signer || !window.usdtContract) {
        console.warn("in usdt usdtApprove ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.usdtContract.connect(window.Signer).approve(
                spender,
                account
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
    getUsdtBalance,
    getUsdtAllowance,
    usdtApprove
};
