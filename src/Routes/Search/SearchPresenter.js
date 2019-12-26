import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import { PropTypes } from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/SearchCard";
import PostCard from "../../Components/PostCard";

const Wrapper = styled.div`
  height: 80vh;
  text-align: center;
`;

const Section = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);   
    grid-gap:25px;
    grid-template-rows:180px;
    grid-auto-rows:160px;
    margin-bottom:50px;
`;
const PostSection = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 300px);   
    grid-gap:50px;
    grid-template-rows:300px;
    grid-auto-rows:300px;
    margin-bottom:50px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Search for Something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text={"have found in User"} />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                userName={user.userName}
                url={user.avatar}
                isFollowing={user.isFollowing}
                isSelf={user.isSelf}
                id = {user.id}
              />
            ))   
        )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="NO Posts found" />
          ) : (
            data.searchPost.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                files={post.files}
                likeCount={post.likeCount}
                commentCount={post.commentCount }
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};


SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
