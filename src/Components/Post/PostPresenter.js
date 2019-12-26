import React from "react";
import styled from "styled-components";
import TextareaAutoSize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import {Link} from "react-router-dom"
import { HeartEmpty, HeartFull, Comment as CommentIcon} from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  user-select: none;
  a{  
    color:inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 7px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Meta = styled.div`
  padding: 15px;
  position: relative;
  display: block;
`;

const Button = styled.span`
  cursor: pointer;
`;
const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 15px;
    }
  }

  margin-bottom: 10px;
`;
const TimeStamp = styled.span`
  font-weight: 300;
  text-transform: uppercase;
  display: block;
  margin: 10px 0px;
  color: ${props => props.theme.lightGrey};
  opacity: 0.5;
  font-size: 12px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.greyColor} 1px solid;
`;

const Like = styled.span``;

const Textarea = styled(TextareaAutoSize)`
  border: none;
  width: 100%;
  &:focus {
    outline: none;
  }
  resize: none;
  font-size: 14px;
`;

const Comments = styled.ul`
margin-top: 10px;

`;


const Comment = styled.li`
  margin-bottom: 7px;
  span{
  margin-right:5px;
  }
`;
const Caption = styled.div`
  margin: 15px 0px;
`;

export default ({
  author: { userName, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} className="" />
      <UserColumn>
        <Link to={`/${userName}`}>
          <FatText text={userName}></FatText>
        </Link>
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    <Files>
      {files &&
        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Caption>
        <FatText text={userName} /> {caption}
      </Caption>
      {comments && (
        <Comments>
          {comments.map(comment => (
            <Comment key = {comment.id}>
              <FatText text={comment.user.userName} />
              {comment.text}
            </Comment>
          ))}

          {selfComments.map(comment => (
            <Comment key = {comment.id}>
              <FatText text={comment.user.userName} />
              {comment.text}
            </Comment>
          ))} 
        </Comments>)}
      <TimeStamp>{createdAt}</TimeStamp>
      <Textarea
        placeholder={"Add a comment"}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
      />
    </Meta>
  </Post>
);
