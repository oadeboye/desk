import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  usernameChange(e){
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  login(e){
    e.preventDefault();
    console.log("LOGIN WORKS");
  }

  render(){
    return(
      <div className="container login">
  <div className="row">
    <form className="col s12" onSubmit={(e) => this.login(e)}>
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_box</i>
          <input id="username" type="text"
            placeholder="Username" className="validate"
            value={this.state.username} onChange={(e) => this.usernameChange(e)}/>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">lock</i>
          <input id="password" type="password"
            placeholder="Password" className="validate"
            value={this.state.password} onChange={(e) => this.passwordChange(e)}/>
        </div>
        <button type="submit" className="btn waves-effect waves-light blue darken-1 col s4 offset-s4 login-btn">Login</button>
        <Link to="/register" className="btn waves-effect waves-light accent-3 col s4 offset-s4">Register</Link>
      </div>
    </form>
  </div>
</div>

    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Login);
