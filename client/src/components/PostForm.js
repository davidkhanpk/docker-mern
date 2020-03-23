import React from 'react'
import {Button, Form} from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/react-hooks';
import {FETCH_POST_QUERY, CREATE_POST_MUTATION} from '../utils/queries';

function PostForm() {
    const { values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            });
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({query: FETCH_POST_QUERY, data})
            values.body = ''
        },
        onError(err) {
            console.log(err)
        },
    })
    function createPostCallback() {
        createPost();
    }
    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input placeholder="Type Something" name="body" onChange={onChange} value={values.body} error={error ? true : false} />
                <Button type="submit" color="teal" >Create</Button>
            </Form.Field>
        </Form>
        { error && (
                <div className="ui error message" style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )
        }
        </>
    )
}

export default PostForm;
