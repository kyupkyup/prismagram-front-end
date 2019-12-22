import React, { useState } from "react";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  location,
  caption
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const comment = useInput("");
    return <PostPresenter
        user={user}
        files={files}
        likeCount={likeCountS}
        location = {location}
        caption = {caption}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        newComment = {comment}
        setIsLiked ={setIsLiked}
        setLikeCount = {setLikeCount}

    />
};



PostContainer.propTypes = {
    id:PropTypes.string.isRequired,
    user:
        PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName:PropTypes.string.isRequired
    }).isRequired,
    files:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        file:PropTypes.string.isRequired,
    })).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        user:PropTypes.shape({
                id:PropTypes.string.isRequired,
                userName:PropTypes.string.isRequired
            }).isRequired
    })).isRequired,
    createdAt:PropTypes.string,
    location:PropTypes.string,
    caption:PropTypes.string.isRequired
};

export default PostContainer;
