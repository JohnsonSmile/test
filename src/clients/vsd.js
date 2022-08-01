import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getVSDBalance = async (account) => {
    if (!window.VSDContract) {
        console.warn("in vsd geVSDBalance");
        initialize();
    }
    const balance = await window.VSDContract.balanceOf(account)
    return balance;
};

const getVSDAllowance = async (fromAddress, toAddress) => {
    if (!window.usdtContract) {
        console.warn("in vsd getVSDAllowance ");
        initialize();
    }
    const allowanceValue = await window.VSDContract.allowance(fromAddress, toAddress);
    return allowanceValue
};

// ------post function-----
const VSDApprove = async (spender, amount) => {
    if (!window.Signer || !window.VSDContract) {
        console.warn("in vsd VSDApprove ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.VSDContract.connect(window.Signer).approve(
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
    getVSDBalance,
    getVSDAllowance,
    VSDApprove
};
