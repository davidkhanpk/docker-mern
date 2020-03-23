import React, {useContext, useState} from 'react'
import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Label, Icon, Form } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const [comment, setComment] = useState('')
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

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(){
            setComment('')
        },
        variables: {postId, body: comment}
    })
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
                        {user && <Card fluid>
                            <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input type="text" placeholder="Comment..." name="comment" value={comment} onChange={event => setComment(event.target.value)} />
                                        <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={createComment}>Comment</button>
                                    </div>
                                </Form>
                            </Card.Content>
                        
                        </Card>}
                        {comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    ) }
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

export default SinglePost;
