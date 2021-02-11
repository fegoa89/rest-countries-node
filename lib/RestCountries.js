let _ = require('lodash');
let request = require('request');

class RestCountries {

  constructor() {
    this.apiHost = 'https://restcountries.eu';
  }

  getAll() {
    if (this.getAllResponse) {
      return this.getAllResponse;
    }

    let options = {
      url: this.apiHost + '/rest/v2/all'
    };
    this.getAllResponse = this._performAsyncRequest(options);
    return this.getAllResponse;
  }

  findByName(countryName) {
    let options = {
      url: this.apiHost + `/rest/v2/name/${countryName}`
    };

    return this._performAsyncRequest(options);
  }

  findByFullName(countryName) {
    let options = {
      url: this.apiHost + `/rest/v2/name/${countryName}?fullText=true`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCode(isoCountryCode) {
    let options = {
      url: this.apiHost + `/rest/v2/alpha/${isoCountryCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByIsoCountryCodes(isoCountryCodes) {
    let options = {
      url: this.apiHost + `/rest/v2/alpha?codes=${isoCountryCodes}`
    };

    return this._performAsyncRequest(options);
  }

  findByCurrency(currency) {
    let options = {
      url: this.apiHost + `/rest/v2/currency/${currency}`
    };

    return this._performAsyncRequest(options);
  }

  findByLanguageCode(languageCode) {
    let options = {
      url: this.apiHost + `/rest/v2/lang/${languageCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByCapitalCity(city) {
    let options = {
      url: this.apiHost + `/rest/v2/capital/${city}`
    };

    return this._performAsyncRequest(options);
  }

  findByCallingCode(callingCode) {
    let options = {
      url: this.apiHost + `/rest/v2/callingcode/${callingCode}`
    };

    return this._performAsyncRequest(options);
  }

  findByRegion(region) {
    let options = {
      url: this.apiHost + `/rest/v2/region/${region}`
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
      let uniqSubRegions = _.uniq(_.map(getAllResponse, 'subregion'));

      _.forEach(uniqSubRegions, function(subRegion, index) {
        let subRegionKey = subRegion.toLowerCase().replace(' ', '-');
        let countriesBySubRegion = _.filter(getAllResponse, {'subregion': subRegion});
        groupedByResponse[subRegionKey] = countriesBySubRegion;
      });

      return groupedByResponse;
    });
  }

  findCountryFlagByCountryName(countryName) {
    return this.getAll().then(getAllResponse => {
      let country = _.find(getAllResponse, {name: countryName});
      if (country) {
        return {countryName: country.name, flag: country.flag};
      } else {
        return [];
      }
    })
  }

  findCountryByForeignName(foreignName) {
    return this.getAll().then(getAllResponse => {
      let found = _.find(getAllResponse, function(country) {
        return Object.values(country.translations).includes(foreignName);
      });
      return found ? found : [];
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
