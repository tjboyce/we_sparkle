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
            [property]: event.target.value,
        })
    }

    handleSynonym = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value,
        })
    }

   
// handleClick2 = () =>{
//     console.log('checkbox checked')
//     this.setState({
//         ...this.state,
//        crueltyFree: !this.state.crueltyFree
//     })
//     console.log(this.state.crueltyFree);
    
// }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
          
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
     

        return (
            <div>
                <button id="Popover1" type="button" onClick={this.toggle}>
                    <i id="add" className="fas fa-plus"></i>
                </button>
                
                <div className="container">
                    
                    <div id="popoverDiv" style={this.state.popoverOpen ? { display: 'inline' } : { display: 'none' }} >
                        <button id="popUpButton" onClick={this.toggle}><i class="far fa-times-circle"></i></button>
                        <br />
                        <h3>WHAT TYPE OF SERVICE WOULD YOU LIKE TO ADD?</h3><input placeholder="service type" onChange={this.handleChangeFor('service')} />
                        
                        <h3>OTHER KEYWORDS/SYNONYMS CLIENTS MAY USE?</h3><input placeholder="service synonym" onChange={this.handleChangeFor('serviceSynonym')} />
                      
                        <h3>ENTER THE RESPONSE SPARKLE-BOT WILL GIVE WHEN ASKED ABOUT COST OF SERVICE</h3> <input id="inputResponse" placeholder="Cost: Sparkle-Bot response" type="text" onChange={this.handleChangeFor('cost')} />
                        <h3>ENTER THE RESPONSE SPARKLE-BOT WILL GIVE WHEN ASKED ABOUT SERVICE LENGTH</h3><input id="inputResponse" placeholder="Time: Sparkle-Bot response" onChange={this.handleChangeFor('time')} />
                        <br />
                        <h3>CRUELTY FREE?</h3><input placeholder = "yes/no"  onChange={this.handleChangeFor ('crueltyFree')} />
                        <br/>
                        <button className="addServiceButton" id="popUpButton" onClick={this.handleClick}>Add Service</button>

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