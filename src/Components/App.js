import React from 'react';
import {gql} from "apollo-boost";
import {ThemeProvider} from "styled-components";
import styled from "styled-components";
import {HashRouter as Router} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery} from "react-apollo-hooks";
import Footer from "./Footer"
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Router";
import Header from "./Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

export default () => {

  const {
      data: { isLoggedIn }
    } = useQuery(QUERY);
    
  return(
  <ThemeProvider theme = {Theme}>
    <>
      <GlobalStyles />
        <Router>
          <>
          <Header />
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn}/> 
            <Footer/>
          </Wrapper>
          </> 
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  </ThemeProvider>
  );
};