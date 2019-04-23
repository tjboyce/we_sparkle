import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddService.css'

class AddNewService extends Component {
    /* eslint react/no-multi-comp: 0, react/prop-types: 0 */

    handleClick = () => {
        if(this.state.service && this.state.cost && this.state.time){
        this.props.dispatch({ type: 'ADD_SERVICE', payload: this.state })
        
        }
        else if(!this.state.service){
            window.alert('Please enter a service type');
        }
        else if(!this.state.cost){
            window.alert('Please enter the cost of the service');
        }
        else if (!this.state.time) {
            window.alert('Please enter the length of the service');
        }
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


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            service: '',
            cost: '',
            time: ''
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        console.log('add service component loaded');

        return (
            <div>
                <button id="Popover1" type="button" onClick={this.toggle}>
                    Add New Service
                </button>
                <div className="container">
                <div id="popoverDiv" style={this.state.popoverOpen ? { display: 'inline' } : { display: 'none' }} >
                    <h3>Please enter the service type, cost of service and length of time that the service takes.</h3>
                    <input placeholder="service type" onChange={this.handleService} ></input>
                    <input placeholder="cost" type="number" onChange={this.handleCost}></input>
                    <input placeholder="length" onChange={this.handleTime}></input>
                    <button onClick={this.handleClick}>Add Service</button>
                </div>
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapReduxStateToProps)(AddNewService);