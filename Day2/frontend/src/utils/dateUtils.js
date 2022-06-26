function getDate(timestamp) {
    if (timestamp !== parseInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")) {
        const date = new Date(timestamp * 1000)
        let day = date.getDay()
        let month = date.getMonth()
        let year = date.getFullYear()

        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec
    } else {
        return "Not Set Yet"
    }
}

export { getDate }