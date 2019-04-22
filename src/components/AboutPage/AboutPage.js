import React, { Component } from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AboutPage extends Component {

  render() {
    return (
      <div>

        <div>
          <h1>
            Welcome to We-Sparkle Inc.
        </h1>
        </div>

        <br />

        <div>
          <p>
            This is an Admin web-site for hair salon owners or managers to edit, add, and delete common FAQs.
          </p>
        </div>

        



      </div>
    );
  }
}

export default AboutPage;
