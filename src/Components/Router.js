import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explores from "../Routes/Explores";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed}/>
    <Route path="/explores" component={Explores}/>
    <Route path="/search" component={Search}/>
    <Route path="/:userName" component={Profile}/>
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
    
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;