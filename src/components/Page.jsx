import React from "react";
import StudentHome from "./StudentHome";
import Login from "./Login";
import Register from "./Register";
import CompanyDashboard from "./CompanyHome";
import Tpo from "./Tpo";
import CompanyNewRequest from "./CompanyNewRequest";
import StudentJobPage from "./StudentJobPage";
import TpoIncomingRequest from "./TpoIncomingRequest";
import Companydetails from "./CompanyAllRequest";
import TpoDashboard from "./TpoHome";
import CompanyHome from "./CompanyHome";
import CompanyAllRequest from "./CompanyAllRequest";
import TpoAcceptedRequest from "./TpoAcceptedRequest";
import AddStudent from "./AddStudent";
import StudentProfile from "./StudentProfile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Page() {
  return (
    <Router>
      <Route exact path="/" component={StudentHome} />
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
      <Switch>
        <Route exact path="/companyHome" component={CompanyHome} />
      </Switch>
      <Switch>
        <Route exact path="/companyDashboard" component={CompanyDashboard} />
      </Switch>
      <Switch>
        <Route exact path="/companyAllRequest" component={CompanyAllRequest} />
      </Switch>

      <Switch>
        <Route exact path="/tpo" component={Tpo} />
      </Switch>
      <Switch>
        <Route exact path="/companyNewRequest" component={CompanyNewRequest} />
      </Switch>
      <Switch>
        <Route exact path="/jobs" component={StudentJobPage} />
      </Switch>
      <Switch>
        <Route
          exact
          path="/tpoIncomingRequest"
          component={TpoIncomingRequest}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path="/tpoAcceptedRequest"
          component={TpoAcceptedRequest}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path="/companyPreviousRequest"
          component={Companydetails}
        />
      </Switch>
      <Switch>
        <Route exact path="/tpoHome" component={TpoDashboard} />
      </Switch>
      <Switch>
        <Route exact path="/addStudent" component={AddStudent} />
      </Switch>
      <Switch>
        <Route exact path="/StudentProfile" component={StudentProfile} />
      </Switch>
    </Router>
  );
}

export default Page;
