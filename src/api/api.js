const api = new function() {
    
    this.domain = 'http://localhost:12345';
    this.name = 'slingcafe';
    this.version = 'v1';

    this.base = this.domain + '/' + this.name + '/' + this.version + '/';
}

export { api }