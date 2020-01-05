import React from 'react';
import * as d3 from 'd3';

class GraphTimeSeries extends React.Component {
    componentDidMount() {
      this.draw();
    }

    componentDidUpdate() {
      this.draw();
    }
      
    draw() {

      const data = this.props.priceSquareMeter;
      
    }
          
    render(){
      return (
        <div>
        </div>
      )
    }
  }
      
  export default GraphTimeSeries;
