function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage]
}

function getCurrentDateTime() {
    return new Date().toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, '')
}

module.exports = {
    getOffset,
    getCurrentDateTime
}