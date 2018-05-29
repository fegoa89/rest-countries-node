# Rest Country Node
A Node.js wrapper library around the API provided by https://restcountries.eu .


## Usage

```javascript
var RestCountries = require('rest-countries-node');
restCountries = new RestCountries;
```

### getAll()

Returns all countries information:

```javascript
restCountries.getAll()
  .then(response => {
    /*...*/
  });
```

### findByName()

Search by country name. It can be the native name or partial name:

```javascript
restCountries.findByName('france')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "FR",
          "alpha3Code": "FRA",
          "altSpellings": [
            "FR",
            "French Republic",
            "République française"
          ],
          ...
        }
      ]
    */
  });
```

### findByFullName()

Search by country full name:

```javascript
restCountries.findByFullName('france')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "FR",
          "alpha3Code": "FRA",
          "altSpellings": [
            "FR",
            "French Republic",
            "République française"
          ],
          ...
        }
      ]
    */
  });
```

### findByIsoCountryCode()

Search by ISO 3166-1 2-letter or 3-letter country code:

```javascript
restCountries.findByIsoCountryCode('bg')
  .then(response => {
    /*
      {
        "alpha2Code": "BG",
        "alpha3Code": "BGR",
        "altSpellings": [
          "BG",
          "Republic of Bulgaria",
          "Република България"
        ],
        ...
      }
    */
  });
```

### findByIsoCountryCodes()

Search by list of ISO 3166-1 2-letter or 3-letter country codes:

```javascript
restCountries.findByIsoCountryCodes('pl;gb;it')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "PL",
          "alpha3Code": "POL",
          "altSpellings": [
            "PL",
            "Republic of Poland",
            "Rzeczpospolita Polska"
          ],
          ...
        },
        {
          "alpha2Code": "GB",
          "alpha3Code": "GBR",
          "altSpellings": [
            "GB",
            "UK",
            "Great Britain"
          ],
          ...
        },
        {
          "alpha2Code": "IT",
          "alpha3Code": "ITA",
          "altSpellings": [
            "IT",
            "Italian Republic",
            "Repubblica italiana"
          ],
          ...
        }
      ]
    */
  });
```

### findByCurrency()

Search by ISO 4217 currency code:

```javascript
restCountries.findByCurrency('pln')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "PL",
          "alpha3Code": "POL",
          "altSpellings": [
            "PL",
            "Republic of Poland",
            "Rzeczpospolita Polska"
          ],
          ...
        }
      ]
    */
  });
```

### findByLanguageCode()

Search by ISO 639-1 language code:

```javascript
restCountries.findByLanguageCode('it')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "VA",
          "alpha3Code": "VAT",
          "altSpellings": [
            "Sancta Sedes",
            "Vatican",
            "The Vatican"
          ],
          ...
        },
        {
          "alpha2Code": "IT",
          "alpha3Code": "ITA",
          "altSpellings": [
            "IT",
            "Italian Republic",
            "Repubblica italiana"
          ],
          ...
        }
      ]
    */
  });
```

### findByCapitalCity()

Search by capital city:

```javascript
restCountries.findByCapitalCity('tallinn')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "EE",
          "alpha3Code": "EST",
          "altSpellings": [
            "EE",
            "Eesti",
            "Republic of Estonia",
            "Eesti Vabariik"
          ],
          ...
        }
      ]
    */
  });
```

### findByCallingCode()

Search by calling code:

```javascript
restCountries.findByCallingCode('377')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "MC",
          "alpha3Code": "MCO",
          "altSpellings": [
            "MC",
            "Principality of Monaco",
            "Principauté de Monaco"
          ],
          ...
        }
      ]
    */
  });
```

### findByRegion()

Search by region (Africa, Americas, Asia, Europe, Oceania) :

```javascript
restCountries.findByRegion('oceania')
  .then(response => {
    /*
      [
        {
          "alpha2Code": "AS",
          "alpha3Code": "ASM",
          "altSpellings": [
            "AS",
            "Amerika Sāmoa",
            "Amelika Sāmoa",
            "Sāmoa Amelika"
          ],
          ...
        },
        ...
      ]
    */
  });
```

### getAllGroupedBySubRegion()

Returns a list of countries grouped by subregions:

```javascript
restCountries.getAllGroupedBySubRegion()
  .then(response => {
    /*
      { "southern-europe":
        [
          {
            "alpha2Code": "ES",
            "alpha3Code": "ESP",
            "altSpellings": [
              "ES",
              "Kingdom of Spain",
              "Reino de España"
            ],
            ...
          },
          ...
        ],
        "south-america":
        [
          {
            "alpha2Code": "CO",
            "alpha3Code": "COL",
            "altSpellings": [
              "CO",
              "Republic of Colombia",
              "República de Colombia"
            ],
            ...
          },
          ...
        ],
        ...
      }
    */
  });
```

### findCountryFlagByCountryName()

Returns the flag for a given country :

```javascript
restCountries.findCountryFlagByCountryName('Spain')
  .then(response => {
    /*
      {
        "countryName": "Spain",
        "flag": "https://restcountries.eu/data/esp.svg"
      }
    */
  });
```

### findCountryByForeignName()

Returns the flag for a given country :

```javascript
restCountries.findCountryByForeignName('スペイン')
  .then(response => {
    /*
      {
        "alpha2Code": "ES",
        "alpha3Code": "ESP",
        "altSpellings": [
          "ES",
          "Kingdom of Spain",
          "Reino de España"
        ],
        ...
      }
    */
  });
```
