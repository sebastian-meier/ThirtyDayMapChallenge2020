const stations = require('./fire_stations.json')
const fs = require('fs')
const fetch = require('node-fetch')

const results = {
  "type": "FeatureCollection",
  "name": "fire_stations_isochrones",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  ]  
};

(async () => {

  for (let i = 0; i < stations.features.length; i += 1) {
    for (let j = 0; j < 2; j += 1) {

      const feature = stations.features[i];
      const coord = feature.geometry.coordinates;

      const body = {
        "locations":[{"lat":coord[1],"lon":coord[0]}],
        "costing":"auto",
        "polygons":true,
        "denoise":0,
        "contours":[
          {"time":2 + j * 8,"color":"ff0000"},
          {"time":4 + j * 8,"color":"ff0000"},
          {"time":6 + j * 8,"color":"ff0000"},
          {"time":8 + j * 8,"color":"ff0000"}
        ]
      };
    
      const response = await fetch('http://localhost:8002/isochrone', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      });
      const json = await response.json();
    
      results.features = results.features.concat(json.features);
    }
  }
  
  results.features.sort((a, b) => {
    return b.properties.contour - a.properties.contour
  })

  fs.writeFileSync("results.json", JSON.stringify(results), "utf8")
})();