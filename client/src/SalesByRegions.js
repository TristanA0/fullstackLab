import React from 'react';
import * as d3 from 'd3';

//https://observablehq.com/@d3/pie-chart
class SalesByRegions extends React.Component {
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

        
        
    }
          
    render(){
      return (
        <div>
          <h2>Vente par regions</h2>
          <div id="graph-regions"><p>Loading...</p></div>
        </div>
      )
    }
  }
      
  export default SalesByRegions;
