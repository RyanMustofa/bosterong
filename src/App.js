import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Warga from './component/warga/warga';
import Add from './component/addWarga/add';
import SuccessAdd from './component/successAdd';
import Login from './component/login/login';

function App() {
  return (
    <div>
        <Switch>
            <Route path="/" exact component={Warga}/>
            <Route path="/add" exact component={Add}/>
            <Route path="/add/success" exact component={SuccessAdd}/>
            <Route path="/login" exact component={Login}/>
        </Switch>
    </div>
  );
}

export default App;
