import React from 'react';
import GraphTimeSeries from './GraphTimeSeries';
import SalesByRegions from './SalesByRegions';
import ChartBar from './ChartBar';

class App extends React.Component {
    state = {
        priceSquareMeter: [],
        isLoadedSquareMeter: false,
        salesByRegions: [],
        salesInterval: [],
        salesIntervalType: "year",
        salesIntervalStart: "2015-01-01",
        salesIntervalEnd: "2019-12-31",
        isLoadedSalesInterval: false,
        salesByRegionsYear : "2019",
        isLoadedSalesByRegions: false,
        error: false
    }

    getDataSalesByDates() {
      const obj = this;

      fetch('https://localhost:8443/property_value/sales_by_dates?interval='+this.state.salesIntervalType+'&start='+this.state.salesIntervalStart+'&end='+this.state.salesIntervalEnd)
      .then(res => res.json())
      .then((data) => {
          let value = [];
          for (let i in data["hydra:member"]) {
              let date = new Date(data["hydra:member"][i]["cur_date"].split(" ")[0]);
              let sales = data["hydra:member"][i]["sales"];

              let dateName = date.getFullYear();
              if(this.state.salesIntervalType == "month")
                dateName = date.getMonth()+1 + "/"+date.getFullYear();
              if(this.state.salesIntervalType == "day")
                dateName =date.getDate() + "/"+ date.getMonth()+1 + "/"+date.getFullYear();

              let v = { "date": dateName, "value": sales }
              value.push(v);
          }
          obj.setState({ ...obj.state, salesInterval: value, isLoadedSalesInterval: true });
      })
      .catch(err => { obj.setState({ ...obj.state, error: true }); })
    }

    getDataSalesByRegions() {
      const obj = this;
      fetch('https://localhost:8443/property_value/sales_by_regions?year='+obj.state.salesByRegionsYear)
        .then(res => res.json())
        .then((data) => {
          let value = [];
          for (let i in data["hydra:member"]) {
            value[i] = {
              name : data["hydra:member"][i]["region"],
              value : data["hydra:member"][i]["sales"]
            }
          }
          obj.setState({ ...obj.state, salesByRegions: value, isLoadedSalesByRegions : true });
        })
        .catch(err => { obj.setState({...obj.state, isLoadedSalesByRegions : false, error: true }); });
    }

    componentDidMount() {
        const obj = this;

        fetch('https://localhost:8443/property_value/price_square_meter_by_month')
        .then(res => res.json())
        .then((data) => {
            let value = [];
            for (let i in data["hydra:member"]) {
                let date = new Date(data["hydra:member"][i]["cur_date"].split(" ")[0]);
                let month = date.getMonth()+1;
                let price = data["hydra:member"][i]["priceSquareM"];

                if (!(date.getFullYear() in value))
                    value[date.getFullYear()] = [];

                value[date.getFullYear()][month] = parseFloat(price);
            }
            obj.setState({ ...obj.state, priceSquareMeter: value, isLoadedSquareMeter: true });
        })
        .catch(err => { obj.setState({ ...obj.state, error: true }); })
        obj.getDataSalesByRegions();

        obj.getDataSalesByDates();
    }

    changeTypeInterval(event) {
      this.setState({ ...this.state, salesInterval: [], isLoadedSalesInterval: false, salesIntervalType: event.target.value }, this.getDataSalesByDates);
    }

    changeStartInterval(event) {
      if(event.target.value != "")
        this.setState({ ...this.state, salesInterval: [], isLoadedSalesInterval: false, salesIntervalStart: event.target.value }, this.getDataSalesByDates);
    }

    changeEndInterval(event) {
      if(event.target.value != "")
        this.setState({ ...this.state, salesInterval: [], isLoadedSalesInterval: false, salesIntervalEnd: event.target.value }, this.getDataSalesByDates);
    }


    render(){
      return (
        <div>
            <GraphTimeSeries priceSquareMeter={this.state.priceSquareMeter} isLoaded={this.state.isLoadedSquareMeter} error={this.state.error}/>
            <SalesByRegions salesByRegions={this.state.salesByRegions} isLoaded={this.state.isLoadedSquareMeter} error={this.state.error}/>

            <h2> Vente par interval </h2>
            <div>
              <span> Vente par </span>
              <select id="date" onChange={this.changeTypeInterval.bind(this)}>
                <option value="year">Année</option>
                <option value="month">Mois</option>
                <option value="day">Jour</option>
              </select>
              <br/>
              <span> Entre le </span>
              <input type="date" defaultValue="2015-01-01" onChange={this.changeStartInterval.bind(this)}/>
              <br/>
              <span> Et le </span>
              <input type="date" defaultValue="2019-12-31" onChange={this.changeEndInterval.bind(this)}/>
            </div>
            <ChartBar salesInterval={this.state.salesInterval} isLoaded={this.state.isLoadedSalesInterval} error={this.state.error}/>
          <span> Choisir année : </span>
          <select id="annee" onChange={this.changeYear.bind(this)}>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>
        </div>
        <SalesByRegions salesByRegions={this.state.salesByRegions} isLoaded={this.state.isLoadedSalesByRegions} error={this.state.error}/>
      </div>
    )
  }
  }

  export default App;
