import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

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
    const posts = [];
    console.log(loading)
    if(data) {
        console.log(data)
    }
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (<h1>Loading Post...</h1>) : (
                        posts && postMessage.map((post) => (
                            <Grid.Column key={post.id}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default Home;