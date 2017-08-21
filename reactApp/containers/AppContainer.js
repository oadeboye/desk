import React from 'react';
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

class AppContainer extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }
  render() {
    console.log('app container');
    return (
      <HashRouter history={hashHistory}>
        <Switch>
            <Route exact={true} path="/register" component={Register}/>
            <Route exact={true} path="/" component={Login}/>
            <Route exact={true} path="/logout" component={Login}/>
            <Route render={() => <h1>404, Sorry fam.</h1>} />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppContainer;
