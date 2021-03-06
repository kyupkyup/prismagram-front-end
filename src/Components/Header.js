import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import {
  InstaIcon,
  Compass,
  HeartEmpty,
  HeartFull,
  Person,
  Message
} from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import Loader from "./Loader"

const Header = styled.header`
  width: 100%;
  background-color: white;
  border: 0;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  padding: 25px 0;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    text-align: left;
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  width: 70%;
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  height: auto;
  font-size: 14px;
  text-align: center;
  &::placeholder {
    opacity: 0.8;
    font-weight: 400;
  }
  border-radius: 3px;
`;
const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;



export default withRouter(({ history }) => {
  const search = useInput("");
  const {data, loading} = useQuery(ME);
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>  
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <InstaIcon />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>

        <HeaderColumn>
          <HeaderLink to="/explores">
            <Compass />
          </HeaderLink>

        {loading && data && data.me ? (         
          <HeaderLink to={data.me.userName}>
            <Person />
          </HeaderLink> 
          ) : (
          <HeaderLink to="/#">
            <Person />
          </HeaderLink>
          )
        }

          <HeaderLink to="/">
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
