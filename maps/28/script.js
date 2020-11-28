const grid = {
    "Mitte": [1, 1],
    "Friedrichshain-Kreuzberg": [2, 1],
    "Pankow": [2, 0],
    "Charlottenburg-Wilmersdorf": [0, 1],
    "Spandau": [0, 0],
    "Steglitz-Zehlendorf": [0, 2],
    "Tempelhof-Schöneberg": [1, 2],
    "Neukölln": [2, 2],
    "Treptow-Köpenick": [3, 2],
    "Marzahn-Hellersdorf": [3, 1],
    "Lichtenberg": [3, 0],
    "Reinickendorf": [1, 0],
};

const labels = {
    100: '90+'
};

const axis = d3.axisRight();

const gridsize = 150;
const gridX = 4;
const gridY = 3;

const offset = 5;

const scale = d3.scaleLinear();
const axisScale = d3.scaleLinear();
const colorScale = d3.scaleLinear().range(['#00B694', '#00778E']);

const svg = d3.select('#container').append('svg')
    .attr('width', gridX * gridsize + 20 + 50)
    .attr('height', gridY * gridsize + 20)
    .append('g').attr('transform', 'translate(10 10)');

(async() => {
    const csv = await d3.csv('./ages_d3.csv');
    const data = [];
    const map = {};
    const ages = [];

    csv.forEach((line) => {
        if (!(line.region in map)) {
            map[line.region] = data.length;
            data.push({
                region: line.region,
                ages: []
            });
        }
        data[map[line.region]].ages.push({
            amount: parseInt(line.amount),
            age: parseInt(line.age)
        });
        ages.push(line.amount);
    });

    data.forEach((region) => {
        region.ages = region.ages.sort((a, b) => {
            return a.age - b.age;
        });
    });

    scale.domain([0, d3.max(ages)]).range([0, gridsize - 2 * offset - 10]);
    axisScale.domain([0, d3.max(ages)]).range([0, -(gridsize - 2 * offset - 10)]);
    colorScale.domain([0, d3.max(ages)]);

    axis.scale(axisScale).tickSize(-gridsize * 4 - 10);

    const axisGroups = svg.append('g').selectAll('g').data([0,1,2]).enter().append('g')
        .attr('transform', (d) => `translate(${gridsize * gridX + 10} ${d * gridsize + gridsize - offset})`)
        .call(axis);

    const groups = svg.append('g').selectAll('g').data(data).enter().append('g')
        .attr('transform', (d) => `translate(${grid[d.region][0] * gridsize} ${grid[d.region][1] * gridsize})`);

    groups.append('rect')
        .attr('width', gridsize)
        .attr('height', gridsize)
        .style('fill', 'transparent')
        .style('stroke', 'rgba(0,0,0,1)');

    groups.append('text')
        .attr("dx", 8)
        .attr("dy", 15)
        .style('font-weight', 'bold')
        .style('font-size', 10)
        .style('fill', 'black')
        .text((d) => d.region);
    
    const bars = groups.append('g').attr('transform', `translate(${offset} ${gridsize - offset})`)
        .selectAll('g').data((d) => d.ages).enter().append('g').attr('transform', (d, i) => `translate(${i * ((gridsize - 2 * offset) / data[0].ages.length)} ${0})`);
    
    bars.append('rect')
        .style('fill', (d) => colorScale(d.amount))
        .attr('x', 1)
        .attr('y', (d) => -scale(d.amount))
        .attr('height', (d) => scale(d.amount))
        .attr('width', ((gridsize - 2 * offset) / data[0].ages.length) - 2);
    
    const texts = bars.append('text')
        .attr('transform', 'translate(10.5 -4) rotate(-90)')
        .style('fill', 'white')
        .text((d) => (d.age in labels) ? labels[d.age] : d.age);

    texts.each(function (d) {
        const bb = this.getBoundingClientRect();
        const h = scale(d.amount);
        if (h - 4 < bb.width) {
            d3.select(this)
                .style('fill', colorScale(d.amount))
                .attr('transform', `translate(10.5 -${h + 2}) rotate(-90)`);
        }
    });

})();