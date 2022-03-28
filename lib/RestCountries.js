let _ = require('lodash');
let request = require('request');

class RestCountries {

  constructor() {
    this.apiHost = 'https://restcountries.com';
  }

  getAll() {
    if (this.getAllResponse) {
      return this.getAllResponse;
    }

    let options = {
      url: this.apiHost + '/v3.1/all'
    };
    this.getAllResponse = this._performAsyncRequest(options);
    return this.getAllResponse;
  }

  findByName(countryName) {
    let options = {
      url: this.apiHost + `/v3.1/name/${countryName}`
    };

    return this._performAsyncRequest(options);
  }

  findByFullName(countryName) {
    let options = {
      url: this.apiHost + `/v3.1/name/${countryName}?fullText=true`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCode(isoCountryCode) {
    let options = {
      url: this.apiHost + `/v3.1/alpha/${isoCountryCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCodes(isoCountryCodes) {
    let options = {
      url: this.apiHost + `/v3.1/alpha?codes=${isoCountryCodes}`
    };

    return this._performAsyncRequest(options);
  }

  findByCurrency(currency) {
    let options = {
      url: this.apiHost + `/v3.1/currency/${currency}`
    };

    return this._performAsyncRequest(options);
  }

  findByLanguageName(languageCode) {
    let options = {
      url: this.apiHost + `/v3.1/lang/${languageCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByCapitalCity(city) {
    let options = {
      url: this.apiHost + `/v3.1/capital/${city}`
    };

    return this._performAsyncRequest(options);
  }

  findByCallingCode(callingCode) {
    // Just available in V2
    let options = {
      url: this.apiHost + `/v2/callingcode/${callingCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByRegion(region) {
    let options = {
      url: this.apiHost + `/v3.1/region/${region}`
    };

    return this._performAsyncRequest(options);
  }

  getAllGroupedByRegion() {
    return this.getAll().then((getAllResponse) => {
      let groupedByResponse = {};
      let uniqRegions = _.uniq(_.map(getAllResponse, 'region'));

      _.forEach(uniqRegions, function(subRegion, index) {
        let subRegionKey = subRegion.toLowerCase().replace(' ', '-');
        let countriesBySubRegion = _.filter(getAllResponse, {'region': subRegion});
        groupedByResponse[subRegionKey] = countriesBySubRegion;
      });

      return groupedByResponse;
    });
  }

  getAllGroupedBySubRegion() {
    return this.getAll().then((getAllResponse) => {
      let groupedByResponse = {};
      let uniqSubRegions = _.compact(_.uniq(_.map(getAllResponse, 'subregion')));

      _.forEach(uniqSubRegions, function(region, index) {
        let regionKey = region.toLowerCase().replace(' ', '-');
        let countriesBySubRegion = _.filter(getAllResponse, {'subregion': regionKey});
        groupedByResponse[regionKey] = countriesBySubRegion;
      });

      return groupedByResponse;
    });
  }

  findCountryFlagByCountryName(countryName) {
    return this.getAll().then(getAllResponse => {
      let country = _.filter(getAllResponse, function(a){ return a.name && a.name.common === countryName; })[0];
      if (country) {
        return {countryName: country.name.common, flag: country.flag};
      } else {
        return [];
      }
    })
  }

  findCountryByForeignName(foreignName) {
    return this.getAll().then(getAllResponse => {
      let country = _.find(getAllResponse, function(country) {
        return _.find(country.translations, function(languageTranslation, index) {
          if (languageTranslation.common === foreignName) return country;
        });
      });
      return country ? country : [];
    });
  }

  getNearestCountryToPosition(targetLocation) {
    return this.getAll().then(getAllResponse => {
      return this._closestLocation(targetLocation, getAllResponse)
    })
  }

  _closestLocation(targetLocation, getAllResponse) {
    function vectorDistance(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy)
    }

    function getDistance(target, dataLocation) {
      var dx = target.lat - dataLocation.lat,
          dy = target.lon - dataLocation.lon

      return vectorDistance(dx, dy)
    }
    return getAllResponse.reduce(function(prev, curr) {
      var prevDistance = getDistance(targetLocation , {lat: prev.latlng[0], lon: prev.latlng[1]}),
          currDistance = getDistance(targetLocation , {lat: curr.latlng[0], lon: curr.latlng[1]});
      return (prevDistance < currDistance) ? prev : curr;
    });
  }

  getAllGroupedByTimezone() {
    return this.getAll().then((getAllResponse) => {
      let groupedByResponse = {};
      let uniqTimeZones = _.uniq([].concat.apply([], _.map(getAllResponse, 'timezones')));
      _.forEach(uniqTimeZones, function(timeZone, index) {
        let countriesByTimeZone = _.filter(getAllResponse, country => _.includes(country.timezones, timeZone));
        groupedByResponse[timeZone] = countriesByTimeZone;
      });
      return groupedByResponse;
    });
  }

  getCountriesByTimezone(timezone) {
    return this.getAll().then((getAllResponse) => {
      let response = {};
      response[timezone] = _.filter(getAllResponse, country => _.includes(country.timezones, timezone));
      return response;
    });
  }

  _performAsyncRequest(opt) {
    return new Promise((resolve, reject) => {
      request.get(opt, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          let response = JSON.parse(body);
          resolve(response);
        }
      });
    });
  }
}

module.exports = RestCountries;
