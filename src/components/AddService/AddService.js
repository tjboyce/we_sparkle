import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddService.css'

class AddNewService extends Component {
    /* eslint react/no-multi-comp: 0, react/prop-types: 0 */

    handleClick = () => {
        if (this.state.service && this.state.cost && this.state.time) {
            this.props.dispatch({ type: 'ADD_SERVICE', payload: this.state })
            this.toggle()
        }
        else if (!this.state.service) {
            window.alert('Please enter a service type');
        }
        else if (!this.state.cost) {
            window.alert('Please enter the cost of the service');
        }
        else if (!this.state.time) {
            window.alert('Please enter the length of the service');
        } 
        // else if (!this.state.synonyms) {
        //     window.alert('Please enter the serveice Synonyms');
        // }
    }

    handleChangeFor = (property) => (event) => {
        console.log(event.target.value);

        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSynonym = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value,
        })
    }

   
handleClick2 = () =>{
    console.log('checkbox checked')
    this.setState({
        ...this.state,
       crueltyFree: !this.state.crueltyFree
    })
    console.log(this.state.crueltyFree);
    
}

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            crueltyFree: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            service:'',
            cost:'',
            time:'',
        });
    }




    render() {
        console.log('add service component loaded');

        return (
            <div>
                <button id="Popover1" type="button" onClick={this.toggle}>
                    <i id="add" className="fas fa-plus"></i>
                </button>
                <div className="container">
                    <div id="popoverDiv" style={this.state.popoverOpen ? { display: 'inline' } : { display: 'none' }} >
                        <button id="exitButton" onClick={this.toggle}>Exit</button>
                        <h3>Please enter the service type, cost of service and length of time that the service takes.</h3>

                        <input placeholder="service type" onChange={this.handleChangeFor('service')} value={this.state.service} />

                        <input placeholder="service synonym" onChange={this.handleChangeFor('serviceSynonym')} 
                            />
                            
                        <br />

                        <input placeholder="cost" type="number" onChange={this.handleChangeFor('cost')} value={this.state.cost}/>
                        <br />
                        <input placeholder="length" onChange={this.handleChangeFor('time')} value={this.state.time}/>
                        <br />

                        <label>Cruelty Free?<input type="checkbox" onClick={this.handleClick2} /></label>

                        <button id="addServiceButton" onClick={this.handleClick}>Add Service</button>
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