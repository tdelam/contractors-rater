import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ContractorsContextProvider } from "./context/ContractorsContext";
import ContractorDetail from "./routes/Detail";
import Home from "./routes/Home";
import UpdateContractor from "./routes/Update";

const App = () => {
  return (
    <ContractorsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contractors/:id/update" component={UpdateContractor} />
            <Route exact path="/contractors/:id" component={ContractorDetail} />
          </Switch>
        </Router>
      </div>
    </ContractorsContextProvider>
  );
};

export default App;
