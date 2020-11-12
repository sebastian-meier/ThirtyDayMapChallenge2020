const fs = require('fs')
const csv=require('csvtojson')

Promise.all([
    csv().fromFile('./gtfs/stop_times.txt'),
    csv().fromFile('./gtfs/stops.txt')
]).then((data) => {

    const times = data[0]
    const stops = data[1]

    const stopMap = {}
    const locMap = {}
    stops.forEach((stop, si) => {
        const key = stop.stop_lat + '-' + stop.stop_lon;
        if (key in locMap) {
            stopMap[stop.stop_id] = locMap[key];
        } else {
            stopMap[stop.stop_id] = si;
            locMap[key] = si;
            stop['count'] = 0;
        }
    })

    const getID = (stop) => {
        return stops[stopMap[stop.stop_id]].stop_id;
    }; 

    const connections = {}
    let cTrip = false
    let lStop = false
    times.forEach((time) => {
        if (cTrip === time.trip_id) {
            const connectionKey = [stopMap[time.stop_id],stopMap[lStop.stop_id]].sort().join('-')
            if (!(connectionKey in connections)) {
                connections[connectionKey] = {
                    weight: 0,
                    source: stopMap[time.stop_id],
                    target: stopMap[lStop.stop_id]
                }
            }
            connections[connectionKey].weight += 1
        }
        lStop = time
        cTrip = time.trip_id
        stops[stopMap[time.stop_id]].count += 1
    })

    let geojson = {
        type: "FeatureCollection",
        features: []
    }
    let csv = 'id,count,lat,lon'
    for (let key in stops) {
        if (stops[key].count > 0) {
            csv += `\n${stops[key].stop_id},${stops[key].count},${stops[key].stop_lat},${stops[key].stop_lon}`
            geojson.features.push({
                type: "Feature",
                properties: {
                    id: stops[key].stop_id,
                    count: stops[key].count
                },
                geometry:{
                    type: "Point",
                    coordinates:[parseFloat(stops[key].stop_lon), parseFloat(stops[key].stop_lat)]
                }
            })
        }
    }
    fs.writeFileSync('nodes.csv', csv, 'utf8')
    fs.writeFileSync('nodes.geojson', JSON.stringify(geojson), 'utf8')

    geojson = {
        type: "FeatureCollection",
        features: []
    }
    csv = 'source,target,weight'
    for (let key in connections) {
        csv += `\n${connections[key].source},${connections[key].target},${connections[key].weight}`
        geojson.features.push({
            type: "Feature",
            properties: {
                weight: connections[key].weight
            },
            geometry:{
                type: "LineString",
                coordinates:[
                    [parseFloat(stops[connections[key].source].stop_lon), parseFloat(stops[connections[key].source].stop_lat)],
                    [parseFloat(stops[connections[key].target].stop_lon), parseFloat(stops[connections[key].target].stop_lat)]
                ]
            }
        })
    }
    fs.writeFileSync('links.csv', csv, 'utf8')
    fs.writeFileSync('links.geojson', JSON.stringify(geojson), 'utf8')
})