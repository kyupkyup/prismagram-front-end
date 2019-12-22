import React from "react";
import styled from "styled-components";
import FatText from "../../Routes/FatText";
import Avatar from "../Avatar";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width:100%;
  max-width:600px;  
`;

const Header = styled.header`
  border:1px solid black;
  padding: 15px;
  display:flex;
  align-items:center;
`;

const UserColumn = styled.div`
  margin-left:5px;
`;

const Location = styled.span``;

export default ({ user: { userName, avatar }, location }) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <FatText text={userName}></FatText>
        <Location>{location}</Location>
      </UserColumn>
    </Header>
  </Post>
);
