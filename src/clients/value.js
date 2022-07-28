import { getBigNumber, NoticeEmitter } from "../utils";
import { initialize } from "./client";

// ------get function------
const getValueBalance = async (account) => {
    if (!window.VSDContract) {
        console.warn("in value getValueBalance");
        initialize();
    }
    return window.VSDContract.balanceOf(account);
};

const getValueAllowance = async (fromAddress, toAddress) => {
    if (!window.VSDContract) {
        console.warn("in value getValueAllowance ");
        initialize();
    }
    return window.VSDContract.allowance(fromAddress, toAddress);
};

// ------post function-----
const valueApprove = async (spender, account) => {
    if (!window.Signer || !window.VSDContract) {
        console.warn("in value valueApprove ");
        initialize();
    }
    return new Promise(async (resolve, reject) => {
        try {
            const tx = await window.VSDContract.connect(window.Signer).approve(
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
    getValueBalance,
    getValueAllowance,
    valueApprove
};
