import React, { Component } from 'react';
import {connect} from 'react-redux';
import {doSignInWithEmailAndPassword} from 'services/Firebase';
import {login} from 'redux/actions/loginActions';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignInForm extends Component {
  state = {
      email: '',
      password: '',
      error: null
  }
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    console.log('so', this.props)
    this.props.login(email, password);
    doSignInWithEmailAndPassword(email, password)
      .then(() => {
       // this.setState(() => ({ ...INITIAL_STATE }));
        window.location = process.env.PUBLIC_URL || "/";
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render = () => {
    console.log('state is',this.state);
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}


const ConnectedSignInForm = connect(mapStateToProps,{login})(SignInForm);

export default ConnectedSignInForm;