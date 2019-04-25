import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import AddNewItem from '../AddService/AddService'
import './UserPage.css'
import axios from 'axios';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  state = {
    id: '',
    service: '',
    cost: '',
    time: '',
    keyWord: '',
    synonyms: '',
    answer: '',
    showInputs: false,
    showFAQ: false,
  }

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

  editService = ([id, service, cost, time]) => {
    return () => {
      this.setState({
        id: id,
        showInputs: true,
        service: service,
        cost: cost,
        time: time,
      })
    }
  }

  FAQService = (id) => {

    return () => {
      this.setState({
        id: id,
        showFAQ: true,
      })
    }
  }
  // sets local state to input values
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  saveServiceChanges = () => {
    console.log('in saveServiceChanges and the id is', this.state.id);
    this.props.dispatch({ type: 'EDIT_SERVICE', payload: this.state })
  }

  cancelServiceChanges = () => {
    this.setState({
      showInputs: false,
    })
  }
  
  submitFAQ = () => {
    console.log('in submitFAQ and the id is:', this.state.id);
    this.props.dispatch({ type: 'ADD_FAQ', payload: this.state })

  }


  render() {
    console.log('this is the state', this.state);
    let editServiceDisplay;
    if (this.state.showInputs) {
      editServiceDisplay = <div id='popoverDiv'>
        <input onChange={this.handleChangeFor('service')} value={this.state.service}></input>
        <input onChange={this.handleChangeFor('cost')} value={this.state.cost}></input>
        <input onChange={this.handleChangeFor('time')} value={this.state.time}></input>


        <button id="addServiceButton" onClick={this.saveServiceChanges}>Save</button>
        <button id="exitButton" onClick={this.cancelServiceChanges}>Cancel</button>
      </div>
    }
    else editServiceDisplay = null;

    let FAQServiceDisplay;
    if (this.state.showFAQ) {
      FAQServiceDisplay = <div>
        <input onChange={this.handleChangeFor('keyWord')} value={this.state.keyWord} placeholder='Key word' />
        <input onChange={this.handleChangeFor('synonyms')} value={this.state.synonyms} placeholder='Synonyms' />
        <input onChange={this.handleChangeFor('answer')} value={this.state.answer} placeholder='Answer' />
        <button onClick={this.submitFAQ}>Add FAQ/ Submit</button>
      </div>
    }

    else FAQServiceDisplay = null;

    return (

      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.username}! 
    </h1>
        <AddNewItem />

        <div>
          <section>
            <h1 id="services">Services</h1>
            <div className="tbl-header">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <thead id="servicesTable">
                  <tr>
                    <th>Service</th>
                    <th>Cost</th>
                    <th>Time</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Add FAQ</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                  {this.props.adminReducer.map((item) => (
                    
                    
                    <tr key={item._id}>
                      <td>{item.service.service}</td>
                      <td>${item.cost.answer}</td>
                      <td>{item.time.answer}</td>

                      <td>
                        <button onClick={this.editService([item._id, item.service.service, item.cost.answer, item.time.answer])} className="editButton"><i id="tableButton" class="far fa-edit"></i></button>
                    

                      </td>
                      <td>
                        <button onClick={this.deleteService(item._id)} className="deleteButton"><i id= "tableButton"class="far fa-trash-alt"></i></button>
                      </td>
                      <td>
                        <button onClick={this.FAQService(item._id)} className='FAQButton'><i id = "tableButton"class="far fa-comment-dots"></i></button>
                      </td>
                        
                    </tr>
                   
                  ))}

                    
                </tbody>
              </table>
            </div>
          </section>

          {editServiceDisplay}
          {FAQServiceDisplay}
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
  adminReducer: state.adminReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);