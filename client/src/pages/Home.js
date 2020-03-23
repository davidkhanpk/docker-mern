import React, {useContext} from 'react';
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext} from '../context/authContext';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/queries';

function Home() {
    const {loading, data } = useQuery(FETCH_POSTS_QUERY);
    const {user} = useContext(AuthContext);
    let posts = [];
    if(data) {
        posts = data.getPosts
        console.log(posts)
    }
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )
                }
                {
                    loading ? (<h1>Loading Post...</h1>) : (
                        <Transition.Group>
                            {
                                posts && posts.map((post) => (
                                    <Grid.Column key={post.id}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default Home;