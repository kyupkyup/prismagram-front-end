import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";


const Overlay = styled.div`
background-color:rgba(0, 0, 0, 0.6);
width:100%;
height:100%;    
display:flex;
justify-content:center;
svg {
    fill: white;
}
opacity: 0;
transition: opacity .5s linear;
`;

const Card = styled.div`
    ${props => props.theme.whiteBox};
    display:flex;
    flex-direction:column;
    align-items:center;
    cursor:pointer;
    &:hover{
        ${Overlay}{
            opacity:1;
        }
    }
`;


const Number = styled.div`
display:flex;
color:white;
align-items:center;
&:first-child{
    margin-right:20px;
}
`;

const NumberText = styled.div`
    margin-left:10px;
    font-size:18px;
    font-weight:600
`;

const Files = styled.div`
width:300px;
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
  height: 300px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;



const PostCard = ({
    id, files, likeCount, commentCount
}) => {    
    const [currentItem, setCurrentItem] = useState(0);

    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
          setTimeout(() => setCurrentItem(0), 3000);
        } else {
          setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
        console.log(currentItem);

      };
    
      useEffect(() => {
        slide();
      }, [currentItem]);
        

    return (
        <Card key={id}>
            <Files>
                {files && files.map((file, index) => (
                    <File key={file.id} src={file.url} showing={index === currentItem}>
                        <Overlay>
                            <Number>
                                <HeartFull/>
                                <NumberText>{likeCount}</NumberText>
                            </Number>
                            <Number>
                                <CommentFull />
                                <NumberText>{commentCount}</NumberText>
                            </Number>
                        </Overlay>
                    </File>
                ))}
            </Files>

        </Card>);
        
    };


PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
}


export default PostCard;
    