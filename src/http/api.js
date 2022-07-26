import { http } from './http'

const apiPostLogin = (account, sigHex, message) => {
    return http.post("/api/login", { account, sigHex, message })
}

const apiPostCreateUser = (account, invitationCode) => {
    return http.post("/api/user", { account, invitationCode })
}

export {
    apiPostLogin,
    apiPostCreateUser
}