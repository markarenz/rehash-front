import gql from "graphql-tag";

const UPDATE_PROFILE = gql`
    mutation($_id: String!, $name: String, $email: String, $bio: String, $tags: [String], $slogan: [String]){
        updateProfile(
            _id: $_id
            name: $name
            email: $email
            bio: $bio
            tags: $tags
            slogan: $slogan
        ){
            auth0Id
        }
    }
`;

export default UPDATE_PROFILE;
