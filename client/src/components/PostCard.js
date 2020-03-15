import React from 'react';
import {Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard(props) {
    const { body, createdAt, id, username, likeCount, commentCount, likes} = props.post;
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
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='teal'>
                    <Icon name='heart' />
                    Like
                </Button>
                <Label basic color='teal' pointing='left'>
                    2,048
                </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={commentPost}>
                <Button color='blue' basic>
                    <Icon name='comment' />
                    Like
                </Button>
                <Label basic color='blue' pointing='left'>
                    {commentCount}
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard;