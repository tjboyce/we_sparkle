import React, { Component } from 'react';
import { connect } from 'react-redux';



class AddNewService extends Component {
    state = {
        service: '',
        cost: '',
        time: '',
    }

    handleClick = ()=>{
        this.props.dispatch ({type: 'ADD_SERVICE' , payload: this.state})
    }

    handleService = event => {
        console.log('service', event);
        
        this.setState({ service: event.target.value.toLowerCase() });

    };

    handleCost = event => {
        this.setState({ cost: event.target.value });
    };
    handleTime = event => {
        this.setState({ time: event.target.value });
    } 

    render(){
        console.log('add new service component loaded', this.state);
        
        return(
            <div>
            <input placeholder="service type" onChange = {this.handleService} ></input>
            <input placeholder = "cost" onChange = {this.handleCost}></input>
            <input placeholder="length" onChange = {this.handleTime}></input>
            <button onClick = {this.handleClick}>Add Service</button>
            </div>
        )
    }
}
const mapReduxStateToProps = reduxState => {
    return reduxState;
};

export default connect (mapReduxStateToProps)(AddNewService );