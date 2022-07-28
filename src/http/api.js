import { Messages, ServerError } from './code'
import { http } from './http'

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

export {
    apiPostLogin,
    apiPostCreateUser
}