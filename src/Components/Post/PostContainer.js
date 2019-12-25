import React, { useState, useEffect } from "react";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
const PostContainer = ({
  id,
  author,
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
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();

    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onKeyPress = event => {
    const { which } = event;

    if (which === 13) {
      event.preventDefault();
      comment.setValue("");
      addCommentMutation();
      setSelfComments([
        ...selfComments,
        { id: 1, text: comment.value, user: { userName: "laa" } }
      ]);
    }
    return;
  };
  console.log(comments);

  return (
    <PostPresenter
      author={author[0]}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      userName: PropTypes.string.isRequired
    })
  ).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string,
  location: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
};

export default PostContainer;
