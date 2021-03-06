import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "언팔로우" : "팔로우"} onClick={onClick}/>
);
