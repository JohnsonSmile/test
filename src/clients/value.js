import { getBigNumber, NoticeEmitter, formatNumber, getFormatBigNumber } from "../utils";
import { initialize } from "./client";

// ------get function------
const getValueBalance = async (account) => {
    if (!window.valueContract) {
        console.warn("in value getValueBalance");
        initialize();
    }
    const balance = await window.valueContract.balanceOf(account)
    return balance;
};

const getValueAllowance = async (fromAddress, toAddress) => {
    if (!window.valueContract) {
        console.warn("in value getValueAllowance ");
        initialize();
    }
    const allowanceValue = await window.valueContract.allowance(fromAddress, toAddress);
    return allowanceValue
};

// ------post function-----
const valueApprove = async (spender, amount) => {
    if (!window.Signer || !window.valueContract) {
        console.warn("in value valueApprove ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.valueContract.connect(window.Signer).approve(
                spender,
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
                            resolve(res)
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
    });
};


export {
    getValueBalance,
    getValueAllowance,
    valueApprove
};
