import React from 'react';
import * as d3 from 'd3';

class GraphTimeSeries extends React.Component {
    componentDidMount() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-squaremeter").html("Error while request api");
      }

    }

    componentDidUpdate() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-squaremeter").html("Error while request api");
      }
    }

    draw() {

      const data = this.props.priceSquareMeter;

      let margin = {top: 20, right: 20, bottom: 30, left: 10}
      let width = 960 - margin.left - margin.right;
      let height = 500 - margin.top - margin.bottom;
      
      let max = 0;
      let nbElem = 0;
      for (let i in data) {
        for (let index in data[i]) {
          if(index !== undefined)  {
            nbElem++;

            if(parseFloat(data[i][index]) > max)
              max = parseFloat(data[i][index]);
          }
        };
      }

      d3.select("#graph-squaremeter").html("");
      const svg = d3.select("#graph-squaremeter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Create scale
      var x = d3.scaleLinear()
        .domain([2015, 2020])
        .range([0, width]);

      var y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

      // Add scales to axis
      var xAxis = d3.axisBottom()
        .tickArguments([6])
        .scale(x)
        .tickFormat(d3.format("d"));

      var yAxis = d3.axisLeft()
        .scale(y);

      //Append group and insert axis
      svg.append("g")
        .attr("transform", "translate(50,0)")
        .call(yAxis);

      svg.append("g")
        .attr("transform", "translate(50, " + height + ")")
        .call(xAxis)

      y.domain([0, d3.max(data, function(d) { 
        let max = 0;

        for (let index in d) {
          if(index !== undefined) 
            if(parseFloat(d[index]) > max)
              max = parseFloat(d[index]);
        };
        
        return max; 
      })]);

      var line = d3.line();

      var dots = [];
      var count = 0;
      for (let i in data) {
        for (let index in data[i]) {
          if(index !== undefined) {
            let x = ((width-100)/nbElem)*count;
            let y = height - ((height/(max))*parseFloat(data[i][index]))-20;
            dots[count++] = [x, y];
          }
        };
      }

      var path = line(dots);

      d3.select('path')
        .attr('d', path)
        .attr("transform", "translate(0, 0)")
        .style("stroke", "#341EBF");
    }

    render(){
      return (
        <div>
          <div id="graph-squaremeter"><p>Loading...</p></div>
        </div>
      )
    }
  }

  export default GraphTimeSeries;
