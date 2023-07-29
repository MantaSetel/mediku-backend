const jwt = require('jsonwebtoken')
const { publicKey, privateKey } = require('../config/auth')

const signJwt = (object, options) => {
    // eslint-disable-next-line no-unused-vars
    const removeSensitiveInfo = ({ password, ...rest }) => rest
    return jwt.sign(removeSensitiveInfo(object), privateKey, {
        algorithm: 'RS256',
        ...options,
    })
}

const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (err) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null,
        }
    }
}

module.exports = {
    signJwt,
    verifyJwt,
}
