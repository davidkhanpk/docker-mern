import React, { useState, useEffect } from 'react'
import {Icon, Label, Button, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/queries';
import { useMutation} from '@apollo/react-hooks';

function DeleteButton({postId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = data.getPosts.filter((p) => p.id !== postId);
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
            if(callback) callback()

        },
        variables: {postId}
    })
    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    )
}

export default DeleteButton;

