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

      
      const width = 1000;
      const height = 1000;
      const numberElements = 60
      let max = 0;

      for (let i in data) {
        for (let index in data[i]) {
          if(index != undefined) 
            if(parseFloat(data[i][index]) > max)
              max = parseFloat(data[i][index]);
        };
      }

      d3.select("#graph-squaremeter").html("");
      const svg = d3.select("#graph-squaremeter")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Create scale
      var xScale = d3.scaleLinear()
        .domain([2015, 2020])
        .range([0, width - 50]);

      var yScale = d3.scaleLinear()
        .domain([0, max])
        .range([(height/2), 0]);
              
      // Add scales to axis
      var xAxis = d3.axisBottom()
        .tickArguments([6])
        .scale(xScale)
        .tickFormat(d3.format("d"));

      var yAxis = d3.axisLeft()
        .scale(yScale);

      //Append group and insert axis
      svg.append("g")
        .attr("transform", "translate(50, 10)")
        .call(yAxis);

      svg.append("g")
        .attr("transform", "translate(50, " + (height/2 + 10)+ ")")
        .call(xAxis)

      var line = d3.line();

      var dots = [];
      var count = 0;
      for (let i in data) {
        for (let index in data[i]) {
          if(index != undefined) {
            let x = ((width-100)/numberElements)*count;
            let y = height/2 - ((height/(2*max))*parseFloat(data[i][index]));
            dots[count++] = [x, y];
          }
        };
      }

      var path = line(dots);

      d3.select('path')
        .attr('d', path)
        .style("stroke", "#341EBF");
    }
          
    render(){
      return (
        <div>
          <h2>Prix moyen du m&#178;</h2>
          <div id="graph-squaremeter"><p>Loading...</p></div>
        </div>
      )
    }
  }
      
  export default GraphTimeSeries;
