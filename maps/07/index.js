const search = {
    // natural:['wood','scrub','grassland','heath','tree_row','moor','meadow'],
    // boundary:['national_park'],
    // landuse:['forest','recreation_ground','village_green','grass','allotments','cemetery','meadow','orchard','greenfield','plant_nursery'],
    // leisure:['park','nature_reserve','garden','pitch','dog_park','golf_course']
}

let query = '<osm-script output="xml" timeout="25"><union>';

const types = ['node','way','relation']

types.forEach((type) => {

    Object.keys(search).forEach((key) => {
        search[key].forEach((value) => {
            query += ` <query type="${type}">
                <has-kv k="${key}" v="${value}"/>
                <bbox-query {{bbox}}/>
            </query>`
        })
    })

})


query += '</union><union><item/><recurse type="down"/></union><print mode="body"/></osm-script>'

console.log(query)