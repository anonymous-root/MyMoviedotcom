import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import RegisterTask from './registerTask';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={RegisterTask}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;