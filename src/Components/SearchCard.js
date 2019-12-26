import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton";
import {Link} from "react-router-dom";

const Card = styled.div`
    ${props => props.theme.whiteBox};
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;

`;

const EAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const ELink = styled(Link)`
    margin-bottom: 15px;
    color:inherit;
`;

const UserCard = ({key, userName, isFollowing, url, isSelf, id}) => <Card>
    <EAvatar url={url} size={"md"}/>
    <ELink to={`/${userName}`}><FatText text={userName}/></ELink>
    {!isSelf &&<FollowButton id={id} isFollowing={isFollowing} />}
</Card>;


UserCard.propTypes = {
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired
}

export default UserCard;
    