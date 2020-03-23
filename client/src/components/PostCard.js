import React, {useContext} from 'react';
import {Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext} from '../context/authContext';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard(props) {
    const { body, createdAt, id, username, likeCount, commentCount, likes} = props.post;
    const { user } = useContext(AuthContext);
    function likePost() {
        console.log("vbcd ")
    }
    function commentPost() {
        console.log("vc")
    }
    return (
        <Card fluid>
            <Card.Content>
            <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <LikeButton user={user} post={{id, likes, likeCount}} />
            <Button as='div' labelPosition='right' as={Link} to={`/post/${id}`} >
                <Button color='blue' basic className="like-comment-button">
                    <Icon name='comment' />
                    Like
                </Button>
                <Label basic color='blue' pointing='left'>
                    {commentCount}
                </Label>
            </Button>
            {user && user.username === username && (
                <DeleteButton postId={id} />
                
            )}
            </Card.Content>
        </Card>
    )
}

export default PostCard;