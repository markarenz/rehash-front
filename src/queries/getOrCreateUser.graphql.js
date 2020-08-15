import gql from "graphql-tag";

const GET_OR_CREATE_USER = gql`
    mutation($auth0Id: String!, $name: String!, $avatar: String, $email: String!){
        getOrCreateUser(
            auth0Id: $auth0Id
            name: $name
            avatar: $avatar
            email: $email
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
export default GET_OR_CREATE_USER;
