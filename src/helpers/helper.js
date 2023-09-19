const jwt = require("jsonwebtoken")
const { secret,
    accessTokenExpiresIn,
    refreshTokenExpiresIn } = require("../../config/auth.config")

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage]
}

function getCurrentDateTime() {
    return new Date().toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, '')
}

function generateTokens(user) {
    try {
        const payload = { id: user.id }
        const accessToken = jwt.sign(
            payload,
            secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: accessTokenExpiresIn
            }
        )
        const refreshToken = jwt.sign(
            payload,
            secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: refreshTokenExpiresIn
            }
        )
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error)
    }
}

function verifyRefreshToken(refreshToken) {
    let tokenData
    jwt.verify(refreshToken, secret, (err, decoded) => {
        if (err) {
            return { error: true }
        }
        tokenData = decoded
    })
    return { error: false, decoded: tokenData }
}

module.exports = {
    getOffset,
    getCurrentDateTime,
    generateTokens,
    verifyRefreshToken
}