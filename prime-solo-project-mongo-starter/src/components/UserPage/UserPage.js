import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css'
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div>
    
    <h1 id="welcome">
      Welcome, {props.user.username}!
    </h1>
  
    <div>
      <section>
        {/*for demo wrap*/}
        <h1>Fixed Table header</h1>
        <div className="tbl-header">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Company</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change %</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <tbody>
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
              <tr>
                <td>AAD</td>
                <td>AUSENCO</td>
                <td>$2.38</td>
                <td>-0.01</td>
                <td>-1.36%</td>
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
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
