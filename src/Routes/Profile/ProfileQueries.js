import {gql} from "apollo-boost";

export const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      bio
      isSelf
      isFollowing
      followingCount
      followersCount
      posts {
        id
        files {
          id
          url
        }
        likeCount
        commentCount
      }
      postsCount
    }
  }
`;

export const LOG_OUT = gql`
    mutation logUserOut{
      logUserOut @client
    }

`;
