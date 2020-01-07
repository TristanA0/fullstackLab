import React from 'react';
import * as d3 from 'd3';

const departements = {
  "01": "Ain",
  "02": "Aisne",
  "03": "Allier",
  "04": "Alpes-te-Provence",
  "05": "Hautes",
  "06": "Alpes-mes",
  "07": "Ardèche",
  "08": "Ardennes",
  "09": "Ariège",
  "10": "Aube",
  "11": "Aude",
  "12": "Aveyron",
  "13": "Bouches-du-Rhône",
  "14": "Calvados",
  "15": "Cantal",
  "16": "Charente",
  "17": "Charente-maritime",
  "18": "Cher",
  "19": "Corrèze",
  "2a": "Corse-du-sud",
  "2b": "Haute-Corse",
  "21": "Côte-d'Or",
  "22": "Côtes-d'Armor",
  "23": "Creuse",
  "24": "Dordogne",
  "25": "Doubs",
  "26": "Drôme",
  "27": "Eure",
  "28": "Eure-et-loir",
  "29": "Finistère",
  "30": "Gard",
  "31": "Haute-garonne",
  "32": "Gers",
  "33": "Gironde",
  "34": "Hérault",
  "35": "Ille-et-vilaine",
  "36": "Indre",
  "37": "Indre-et-loire",
  "38": "Isère",
  "39": "Jura",
  "40": "Landes",
  "41": "Loir-et-cher",
  "42": "Loire",
  "43": "Haute-loire",
  "44": "Loire-atlantique",
  "45": "Loiret",
  "46": "Lot",
  "47": "Lot-et-garonne",
  "48": "Lozère",
  "49": "Maine-et-loire",
  "50": "Manche",
  "51": "Marne",
  "52": "Haute-marne",
  "53": "Mayenne",
  "54": "Meurthe-et-moselle",
  "55": "Meuse",
  "56": "Morbihan",
  "57": "Moselle",
  "58": "Nièvre",
  "59": "Nord",
  "60": "Oise",
  "61": "Orne",
  "62": "Pas-de-calais",
  "63": "Puy-de-dôme",
  "64": "Pyrénées-atlantiques",
  "65": "Hautes-Pyrénées",
  "66": "Pyrénées-orientales",
  "67": "Bas-rhin",
  "68": "Haut-rhin",
  "69": "Rhône",
  "70": "Haute-saône",
  "71": "Saône-et-loire",
  "72": "Sarthe",
  "73": "Savoie",
  "74": "Haute-savoie",
  "75": "Paris",
  "76": "Seine-maritime",
  "77": "Seine-et-marne",
  "78": "Yvelines",
  "79": "Deux-sèvres",
  "80": "Somme",
  "81": "Tarn",
  "82": "Tarn-et-garonne",
  "83": "Var",
  "84": "Vaucluse",
  "85": "Vendée",
  "86": "Vienne",
  "87": "Haute-vienne",
  "88": "Vosges",
  "89": "Yonne",
  "90": "Territoire de belfort",
  "91": "Essonne",
  "92": "Hauts-de-seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-marne",
  "95": "Val-d'oise",
  "971": "Guadeloupe",
  "972": "Martinique",
  "973": "Guyane",
  "974": "La réunion",
  "976": "Mayotte"
};

let colors = [
  "#5151ff",
  "#4949f8",
  "#4141e1",
  "#4343dc",
  "#3131c8",
  "#2a2abe",
  "#3434b9",
  "#3333b4",
  "#3232af",
  "#3333aa",
  "#3434a0",
  "#30309b",
  "#2f2f93",
  "#292991",
  "#2d2d87",
  "#28287d",
  "#242473",
  "#222269",
]


//https://observablehq.com/@d3/pie-chart
class SalesByRegions extends React.Component {
    constructor() {
      super();
    }
    componentDidMount() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-regions").html("Error while request api");
      }

    }

    componentDidUpdate() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-regions").html("Error while request api");
      }
    }

    draw() {
      console.log(colors);
      const data = this.props.salesByRegions;

      var text = "";

      var width = 500;
      var height = 500;
      var thickness = 40;

      var radius = Math.min(width, height) / 2;
      var color = d3.scaleOrdinal()
        .range(colors);

      d3.select("#graph-regions").html("");

      var svg = d3.select("#graph-regions")
        .append('svg')
        .attr('class', 'pie')
        .attr('width', width)
        .attr('height', height);

      var g = svg.append('g')
        .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

      var arc = d3.arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      var path = g.selectAll('path')
        .data(pie(data))
        .enter()
        .append("g")
        .on("mouseover", function(d) {
          let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");

          g.append("text")
            .attr("class", "name-text")
            .text(`${departements[d.data.name]} (${d.data.name})`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');

          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
        .append('path')
        .attr('d', arc)
        .attr('fill', (d,i) => color(i))
        .on("mouseover", function(d) {
          d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black");
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current));
        })
        .each(function(d, i) { this._current = i; });


      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(text);
    }

    render(){
      return (
        <div>
          <div id="graph-regions"><p>Loading...</p></div>
        </div>
      )
    }
  }

  export default SalesByRegions;
