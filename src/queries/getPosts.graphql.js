import gql from "graphql-tag";

//$search: String, $userId: String,
// search: $search
// userId: $userId
const GET_POSTS = gql`
    query($offset: Int!, $itemsPerPage: Int!, $search: String, $filterFavs: Boolean){
        getPosts(
            offset: $offset
            itemsPerPage: $itemsPerPage
            search: $search
            filterFavs: $filterFavs
        ){
            _id
            content
            likes
            createdAt
            postAuthor {
              name
              avatar
              _id
            }
            isFaved
        }
    }
`;
export default GET_POSTS;
