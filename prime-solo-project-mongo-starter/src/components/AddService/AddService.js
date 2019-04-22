import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddNewService extends Component {
    render(){
        console.log('addnewservice component loaded');
        
        return(
            <div>
            <input placeholder="service type"></input>
            <input placeholder = "cost"></input>
            <input placeholder="length"></input>
            </div>
        )
    }
}

export default AddNewService;