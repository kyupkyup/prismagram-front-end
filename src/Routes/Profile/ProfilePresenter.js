import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import Avatar from "../../Components/Avatar"
import FatText from "../../Components/FatText"
import FollowButton from "../../Components/FollowButton";
import {Helmet} from "react-helmet";
import PostCard from "../../Components/PostCard"
import Button from "../../Components/Button"
const Wrapper = styled.div`
    min-height:100vh;
    align-items:center;
`;

const Header = styled.header`
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:80%;
    margin:0 auto;
    margin-bottom:100px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
    display:flex;
    align-itmes:center;
`;

const Username = styled.div`
    font-size:26px;
    display:block;
`;

const Counts = styled.ul`
    display:flex;
    margin:15px 0px;
`;

const Count = styled.li`
    font-size:16px;
    &:not(:last-child){
        margin-right:10px;
    }
`;

const FullName = styled(FatText)`
    font-size:15px;
`;

const Bio = styled.p`
    margin:10px 0;
`;

const Posts = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 300px);   
  grid-gap:50px;
  grid-template-rows:300px;
  grid-auto-rows:300px;
  margin-bottom:50px;
`;




export default ({loading, data, logOut}) =>{
    if (loading) {
        console.log(data);

        return (
          <Wrapper>
            <Loader />
          </Wrapper>
        );
      } else if(!loading && data && data.seeUser){
          const {
              seeUser:{
                id,
                avatar,
                userName,
                fullName,
                isSelf,
                isFollowing,
                bio,
                followingCount,
                followersCount,
                posts,
                postsCount
              }
          } = data;
        return (
          <Wrapper>
            <Helmet>
              <title>{userName} | prismagram</title>
            </Helmet>
            <Header>
              <HeaderColumn>
                <Avatar size={"lg"} url={avatar} />

              </HeaderColumn>
            
                <HeaderColumn>
                   <UsernameRow>
                    <Username>{userName}</Username>
                        {
                            isSelf ? <Button onClick={logOut} text={"로그아웃"}/> : <FollowButton id={id} isFollowing={isFollowing}/>
                        }
                    </UsernameRow>
                    <Counts>
                        <Count><FatText text={String(postsCount)}/> 게시글</Count>
                        <Count><FatText text={String(followingCount)}/> 팔로잉</Count>
                        <Count><FatText text={String(followersCount)}/> 팔로워</Count>
                    </Counts>
                    <FatText text={fullName}/>
                    <Bio>{bio}</Bio>
                </HeaderColumn>
            </Header>
            <Posts>
                {posts && posts.map(post => (
                      <PostCard
                        key={post.id}
                        id={post.id}
                        files={post.files}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount }
                    />
                    ))}
            </Posts>
          </Wrapper>
        );
      }
      else{
          return null;
      }
    
}

