import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ContractorDetail from "./routes/ContractorDetail";
import Home from "./routes/Home";
import UpdateContractor from "./routes/UpdateContractor";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contractors/:id/update" component={UpdateContractor} />
          <Route exact path="/contractors/:id" component={ContractorDetail} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
