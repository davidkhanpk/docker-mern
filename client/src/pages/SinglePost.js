import React, {useContext} from 'react'
import { FETCH_POST_QUERY} from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;
    let getPost;
    const { user } = useContext(AuthContext);   
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    if(data) {
        getPost  = data.getPost
    }
    function delePostCallback() {
        props.history.push('/')
    }
    let postMarkup;
    if(!getPost) {
        postMarkup = <p>Loading Post</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image src="https://react.sematic-ui.com/images/avatar/large/molly.png" size="large" floated="right" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                </Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content>
                                <LikeButton user={user} post={{id, likeCount, likes}} />
                                <Button as="div" labelPosition="right" onClick={() => console.log("Com")}>
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={delePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

export default SinglePost;
