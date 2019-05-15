import React, { Component } from 'react';

class Default extends Component {
  render() {
    console.log('default props',this.props);
    
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-1o text-center mx-auto text-title pt-5 text-uppercase">
              <h1 className="display-3">404</h1>
              <h2>Page Not Found</h2>
              <h3>the request url <span className="text-danger">{this.props.location.pathname}</span></h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Default;