import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddNewItem from'../AddService/AddService'
import './UserPage.css'
import axios from 'axios';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_INFO' })
  }

  //This will delete a row from the admin table when the delete button is clicked.
  //Additionally, a warning will pop up allowing the user to cancel their delete request or press OK to confirm
  //The function is curried so that it doesn't run the first time the page loads.
  deleteService = (id) => {
    return () => {
      const r = window.confirm("Are you sure you want to delete this service item?");
      if (r) {
        console.log('deleteService is running', id);
        axios({
          method: 'DELETE',
          url: `/admin/${id}`
        })
          .then(() => {
            //get list of services from the database
            this.props.dispatch({ type: 'FETCH_INFO' })
          })
          .catch((error) => {
            console.log('This is the error:', error);
          })
      }
    }
  }

  render() {

    return (
      
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
    </h1>
    <button>Add Item</button>
  
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
                  {this.props.adminReducer.map((item) => (
                    <tr key={item._id}>
                      <td>{item.service}</td>
                      <td>${item.cost}</td>
                      <td>{item.time}</td>
                      <td>{item.crueltyfree}</td>


                      <td><button className="editButton">Edit</button><button onClick={this.deleteService(item._id)} className="deleteButton">Delete</button></td>

                    </tr>
                  ))}
                  {/* <tr>
                <td>Haircut</td>
                <td>$45</td>
                <td>45 minutes</td>
                <td>True</td>
              </tr> */}

                </tbody>
              </table>
            </div>
          </section>
          {/* follow me template */}

        </div>
     <AddNewItem />
    
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
export default connect(mapStateToProps)(UserPage);
