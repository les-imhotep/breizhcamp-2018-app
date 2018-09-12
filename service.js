var rp = require('request-promise-native');

const DATA_SOURCE_URLS = ['http://www.breizhcamp.org/json/talks.json', 'http://www.breizhcamp.org/json/others.json'];

class Service {

    constructor() {
        this.talks = [];
    }

    init() {
        const reqs$ = DATA_SOURCE_URLS.map(url => rp(url, {
            json: true
        }));

        return Promise.all(reqs$)
            .then(result => {
                result.forEach(r => {
                    this.talks = this.talks.concat(r)
                });
                return this.talks.length;
            });
    }

    listerSessions() {
        return this.talks;
    }

    listerPresentateurs() {

    }
}

module.exports = Service;