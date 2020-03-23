import React, { useState, useEffect } from 'react'
import {Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LIKE_POST_MUTATION } from '../utils/queries';
import { useMutation} from '@apollo/react-hooks';

function LikeButton({user, post: {id, likeCount, likes}}) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else  setLiked(false);
    }, [user, likes]);
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })
    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )) : (
            <Button as={Link} to="/login" color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    return (
        <Button as='div' labelPosition='right' onClick={likePost} >
            {likeButton}
            <Label basic color='teal' pointing='left'>
                2,048
            </Label>
        </Button>
    )
}

export default LikeButton;
