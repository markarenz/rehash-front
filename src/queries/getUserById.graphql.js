import gql from "graphql-tag";

const GET_USER_BY_ID = gql`
    query($id: String!){
        getUserById(
            id: $id
        ){
            _id
            auth0Id
            name
            email
            bio
            tags
            slogan
            avatar
            level
            score
            numPosts
            numLikes
            numFollowers
            bonus
            createdAt
        }
    }
`;
export default GET_USER_BY_ID;
