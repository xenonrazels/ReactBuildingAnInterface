import React, { Component } from 'react';
import '../css/App.css';
import AddAppoinments from './AddAppoinments';
import SearchAppoinments from './SerachAppoinments';
import ListAppoinments from './ListAppoinments';
import {without,findIndex} from 'lodash';

class  App extends Component {
  constructor(){
    super();
    this.state = {
      myAppoinments: [],
      lastIndex: 0,
      formDisplay: false,
      orderBy: 'aptDate',
      queryText:'',
      orderDir:'asc'
    }
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointments = this.addAppointments.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }
  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
  changeOrder(order, dir) {
    this.setState({
      orderDir: dir,
      orderBy:order
    }
      
    )
  }
  searchApts(query) {
    this.setState(
      {
        queryText: query
      }
    )
  }
  addAppointments(apt) {
    let tempApts = this.state.myAppoinments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppoinments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }
  updateInfo(name, value, id) {
    let tempApts = this.state.myAppoinments;
    let aptIndex = findIndex(this.state.myAppoinments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppoinments: tempApts
    });
    
  }
  deleteAppointment(apt) {
    let tempApts = this.state.myAppoinments;
    tempApts = without(tempApts, apt); 
    this.setState({
      myAppoinments:tempApts
    })
  }
  componentDidMount(){
    fetch('./data.json').then(response=>response.json()).then(result=>{
      const apts = result.map(item => {
        item.aptId = this.state.lastIndex;
        this.setState({ lastIndex:item.aptId +1})
        return item;
      })
      this.setState({
        myAppoinments:apts
      })
    })
  }
  render() {
    let order;
    let filteredApts = this.state.myAppoinments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }
    filteredApts = filteredApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      );
    });
    
  
    return (
      <div >
        <main className="page bg-white">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
    
                  <AddAppoinments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} addAppointments={this.addAppointments}/>
                  <SearchAppoinments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} searchApts={this.searchApts}/>
                  <ListAppoinments appoinments={filteredApts} deleteAppointment={this.deleteAppointment} updateInfo={this.updateInfo}/>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
