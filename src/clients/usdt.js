import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getUsdtBalance = async (account) => {
    if (!window.usdtContract) {
        console.warn("in usdt getUsdtBalance");
        initialize();
    }
    const balance = await window.usdtContract.balanceOf(account)
    return balance;
};

const getUsdtAllowance = async (fromAddress, toAddress) => {
    if (!window.usdtContract) {
        console.warn("in usdt getUsdtAllowance ");
        initialize();
    }
    const allowanceValue = await window.usdtContract.allowance(fromAddress, toAddress);
    return allowanceValue
};

// ------post function-----
const usdtApprove = async (spender, amount) => {
    if (!window.Signer || !window.usdtContract) {
        console.warn("in usdt usdtApprove ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.usdtContract.connect(window.Signer).approve(
                spender,
                amount
                // {
                //   gasLimit: window.ERC721Contract.estimate.safeMint * amount,
                // }
            );

            window.Library.once(tx.hash, (transaction) => {
                if (transaction.status === 1) {
                    resolve({success: true})
                    // window.Library.call(tx)
                    //     .then((res) => {
                    //         console.log(res)
                    //         resolve(res)
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //         reject(err);
                    //     });
                } else {
                    resolve({success: false})
                }
                console.log(transaction)
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
