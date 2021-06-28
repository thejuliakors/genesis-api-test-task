const request = require("request");
const constants = require('../constants');

class BTCService {

  static getCurrentRate(callback) {
    request(constants.EXCHANGE_RATES_API_URL, {json: true}, (err, res, body) => {
        const btcToUahRate = {
            btcToUahRate: body.uah,
        };
        callback(err, btcToUahRate);
    });
  }

}

module.exports = BTCService;
