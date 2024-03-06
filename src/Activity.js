'use strict';

const axios = require('axios');

class Activity {

    constructor (type = '', participants = '') {
        this.type = type;
        this.participants = participants;
    }

    getAnActivity() {
        let url = 'https://www.boredapi.com/api/activity';

        if (this.type || this.participants) {
            url += '?';
            url += (this.type) ? `type=${this.type}&` : '';
            url += (this.participants) ? `participants=${this.participants}` : '';
        }

        return axios.get(url)
            .then(function (response) {
                return response.data;
            });
    }
}

module.exports = {
    Activity,
};