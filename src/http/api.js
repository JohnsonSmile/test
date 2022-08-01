import { Messages, ServerError } from './code'
import { http } from './http'

// user
const apiPostLogin = async (account, sigHex, message) => {
    const resp = await http.post("/api/login", { account, sigHex, message })
    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}

const apiPostCreateUser = async (account, invitationCode) => {
    const resp = await http.post("/api/user", { account, invitationCode })

    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}

const apiGetSignInfos = async (account, year) => {
    const resp = await http.get('/api/signInInfo?account='+account+'&year='+year)
    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}

const apiPostSignIn = async (account) => {
    const resp = await http.post("/api/signIn", {account})
    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}



// NFT
const apiPostGetNFTInfos = async ({page, page_size, max_token_id, quality=0, alpha_grade=0}) => {

    const resp = await http.post("/api/nftInfos", {page, page_size, max_token_id, quality, alpha_grade})
    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}

const apiPostGetNFTInfosByIDs = async (ids) => {
    const resp = await http.post("/api/nfts", {ids})
    if (resp.status === 200) {
        return resp.data
    } else {
        return {
            code: resp.status,
            message: resp.statusText
        }
    }
}

export {
    apiPostLogin,
    apiPostCreateUser,
    apiPostGetNFTInfos,
    apiPostGetNFTInfosByIDs,
    apiGetSignInfos,
    apiPostSignIn,
}