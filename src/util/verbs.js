function POST(url, json) {
    return http_method('POST', url, json);
}
function PUT(url, json) {
    return http_method('PUT', url, json);
}
function GET(url, json) {
    return http_method('GET', url, json);
}
function DELETE(url, json) {
    return http_method('DELETE', url, json);
}

function http_method(method, url, json) {
    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body : json
    })
}

export { GET, PUT, POST, DELETE, http_method }