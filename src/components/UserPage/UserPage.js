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
      console.log('editService is running');
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
    console.log('in saveServiceChanges and the id is', this.state);
    this.props.dispatch({ type: 'EDIT_SERVICE', payload: this.state })
    this.setState({
      showInputs: false,
    })
  }

  cancelServiceChanges = () => {
    this.setState({
      showInputs: false,
    })
  }

  cancelFAQChanges = () => {
    this.setState({
      showFAQ: false,
    })
  }

  submitFAQ = () => {
    console.log('in submitFAQ and the id is:', this.state.id);
    this.props.dispatch({ type: 'ADD_FAQ', payload: this.state })
    this.setState({
      showFAQ: false,
    })

  }


  render() {
    console.log('this is the state', this.state);
    let editServiceDisplay;
    if (this.state.showInputs) {
      editServiceDisplay = <div className="editServicePopover"
      // id='popoverDiv'
      >
        <button id="exitButton" onClick={this.cancelServiceChanges}><i class="far fa-times-circle"></i></button>
        <br/>
        <br />

        <h1 className="serviceName">{this.state.service}</h1>
        <div className="container">
          <h3>COST RESPONSE</h3>
          <input onChange={this.handleChangeFor('cost')} value={this.state.cost}></input>
          <br />
          <h3>TIME RESPONSE</h3>
          <input onChange={this.handleChangeFor('time')} value={this.state.time}></input>
        </div>

        <button id="addServiceButton" onClick={this.saveServiceChanges}>Save</button>
      </div>
    }
    else editServiceDisplay = null;

    
    
    let FAQServiceDisplay;
    if (this.state.showFAQ) {
      
      FAQServiceDisplay = <div className="FAQpopover">
        <button id="exitButton" onClick={this.cancelFAQChanges}><i class="far fa-times-circle"></i></button>
        <br/>
        <br/>
        <div className="container">

          <h3>KEYWORDS</h3>
          <input onChange={this.handleChangeFor('keyWord')} value={this.state.keyWord} placeholder='Keyword' />
          <br />
          <h3>OTHER KEYWORDS/SYNONYMS CLIENTS MAY USE?</h3>
          <input onChange={this.handleChangeFor('synonyms')} value={this.state.synonyms} placeholder='Synonyms' />
          <br />
          <h3>ENTER THE RESPONSE SPARKLE-BOT WILL GIVE WHEN ASKED ABOUT KEYWORD</h3>
          <input onChange={this.handleChangeFor('answer')} value={this.state.answer} placeholder='Answer' />
          <br/>
          <button id="addServiceButton" onClick={this.submitFAQ}>Submit</button>
          </div>
        
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
                      <td>{item.cost.answer}</td>
                      <td>{item.time.answer}</td>

                      <td>
                        <button onClick={this.editService([item._id, item.service.service, item.cost.answer, item.time.answer])} className="editButton"><i id="tableButton" class="far fa-edit"></i></button>


                      </td>
                      <td>
                        <button onClick={this.deleteService(item._id)} className="deleteButton"><i id="tableButton" class="far fa-trash-alt"></i></button>
                      </td>
                      <td>
                        <button onClick={this.FAQService(item._id)} className='FAQButton'><i id="tableButton" class="far fa-comment-dots"></i></button>
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