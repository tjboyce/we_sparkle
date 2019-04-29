import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FAQTable.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class FAQPage extends Component {

    render() {
        console.log('this is the state', this.state);
    
   

        return (

            <div>
                <h1 id="welcome">
                    Welcome, {this.props.user.username}!
                </h1>
                <h2 id="FAQ">Frequently Asked Questions</h2>

                
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
    user: state.user,
    adminReducer: state.adminReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FAQPage);