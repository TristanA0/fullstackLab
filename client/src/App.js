import React from 'react';
import GraphTimeSeries from './GraphTimeSeries';
import SalesByRegions from './SalesByRegions';

class App extends React.Component {
    state = {
        priceSquareMeter: [],
        isLoadedSquareMeter: false,
        salesByRegions: [],
        error: false
    }

    formatDate(d) {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
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

                value[date.getFullYear()][month] = price;
            }
            obj.setState({ priceSquareMeter: value, isLoadedSquareMeter: true, salesByRegions: [], error: false });
        })
        .catch(err => { obj.setState({ priceSquareMeter: [], salesByRegions: [], isLoadedSquareMeter: false, error: true }); })
    }
          
    render(){
      return (
        <div>
            <GraphTimeSeries priceSquareMeter={this.state.priceSquareMeter} isLoaded={this.state.isLoadedSquareMeter} error={this.state.error}/>
            <SalesByRegions salesByRegions={this.state.salesByRegions} isLoaded={this.state.isLoadedSquareMeter} error={this.state.error}/>
        </div>
      )
    }
  }
      
  export default App;
