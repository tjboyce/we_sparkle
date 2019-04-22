import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch ({type: 'FETCH_INFO'})
  }

  render (){
    return (

  
  <div>
    
    <h1 id="welcome">
      Welcome, {this.props.user.username}!
    </h1>
  
    <div>
      <section>
        {/*for demo wrap*/}
        <h1>Services</h1>
        <div className="tbl-header">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Cost</th>
                <th>Time</th>
                <th>Cruelty Free</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <tbody>
              <tr>
                <td>Haircut</td>
                <td>$45</td>
                <td>45 minutes</td>
                <td>True</td>
                <td><button className="editButton">Edit</button><button className="deleteButton">Delete</button></td>
              </tr>
              <tr>
                <td>AAX</td>
                <td>ADELAIDE</td>
                <td>$3.22</td>
                <td>+0.01</td>
                <td>+1.36%</td>
              </tr>
              <tr>
                <td>XXD</td>
                <td>ADITYA BIRLA</td>
                <td>$1.02</td>
                <td>-1.01</td>
                <td>+2.36%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* follow me template */}
    
    </div>
  </div>
   )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
