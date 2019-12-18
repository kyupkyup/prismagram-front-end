import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Router } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explores from "../Routes/Explores";
import Profile from "../Routes/Profile";
import Search from "../Routes/Profile";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed}/>
    <Route path="/explore" component={Explores}/>
    <Route path="/search" component={Search}/>
    <Route path="/:username" component={Profile}/>
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);

const AppRouter = ({ isLoggedIn }) => (
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;