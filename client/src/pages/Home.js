import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'

const FETCH_POST_QUERY = gql`
    {
    getPosts {
        id 
        body 
        createdAt 
        username 
        comments {
            id
            username
            createdAt 
            body
        }
        likes {
            username
        }
        likeCount
        commentCount
    }
}
`
function Home() {
    const {loading, data } = useQuery(FETCH_POST_QUERY);
    console.log(loading)
    if(data) {
        console.log(data)
    }
    return (
        <div>
            
        </div>
    )
}

export default Home;