function getDate(timestamp) {
    if (timestamp !== parseInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")) {
        const date = new Date(timestamp * 1000)
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        return year + "/" + parseInt(parseInt(month)+1) + "/" + day + " " + hour + ":" + min + ":" + sec
    } else {
        return "Not Set Yet"
    }
}

export { getDate }