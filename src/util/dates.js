function getHHMMSS(date) {
    let s = date.getSeconds()
    let m = date.getMinutes()
    let h = date.getHours()

    let full = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    return full
}


export { getHHMMSS }