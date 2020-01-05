import React from 'react';
import GraphTimeSeries from './GraphTimeSeries';

class App extends React.Component {
    state = {
        priceSquareMeter: []
    }

    componentDidMount() {
        const obj = this;
        
        fetch('https://localhost:8443/property_value/price_square_meter_by_month')
        .then(res => res.json())
        .then((data) => {
            let value = [];
            for (let i in data["hydra:member"]) {
                let date = new Date(data["hydra:member"][i]["cur_date"]);
                let month = date.getMonth()+1;
                let price = data["hydra:member"][i]["priceSquareM"];

                if (!(date.getFullYear() in value)) 
                    value[date.getFullYear()] = [];

                value[date.getFullYear()][month] = price
            }
            obj.setState({ priceSquareMeter: value })
        })
        .catch(console.log)
    }
          
    render(){
      return (
        <GraphTimeSeries priceSquareMeter={this.state.priceSquareMeter}/>
      )
    }
  }
      
  export default App;
