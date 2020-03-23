import React, { useState } from 'react'
import {Icon, Button, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY, DELETE_COMMENT_MUTATION } from '../utils/queries';
import { useMutation} from '@apollo/react-hooks';

function DeleteButton({postId, commentId, callback}) {
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if(!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                data.getPosts = data.getPosts.filter((p) => p.id !== postId);
                proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
            }
            if(callback) callback()

        },
        variables: {postId, commentId}
    })
    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
        </>
    )
}

export default DeleteButton;

