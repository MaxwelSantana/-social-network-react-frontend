import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Spinner } from '../components/Spinner';
import { useNotification } from '../context/notification-context';
import { usePost, useUpdatePost } from '../utils/posts';

function EditPost() {
    const { postId } = useParams();
    const { post, isLoading, isIdle } = usePost(postId);
    const [callUpdatePost, { isLoading: isLoadingUpdate }] =
        useUpdatePost(postId);
    const [{ title, body, fileSize }, setFormFields] = useState({
        title: '',
        body: '',
        fileSize: 0,
    });
    const [error, setError] = useState(null);
    const postDataRef = useRef(new FormData());

    const notification = useNotification();

    useEffect(() => {
        setFormFields((prev) => ({ ...prev, ...post }));
    }, [post]);

    const handleChange = (name) => (event) => {
        setError('');
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        setFormFields((prev) => ({ ...prev, [name]: value, fileSize }));
        postDataRef.current.set(name, value);
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setError('File size should be less than 100kb');
            return false;
        }
        if (title.length === 0) {
            setError('Title is required');
            return false;
        }
        if (body.length === 0) {
            setError('Body is required');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValid()) return;

        callUpdatePost(postDataRef.current)
            .then(() => {
                notification.success('Post updated successfully');
            })
            .catch(() => {
                notification.error(
                    'Something wrong happened. Please try again',
                );
                setFormFields((prev) => ({ ...prev, ...post }));
            });
    };

    if (isLoading || isIdle || isLoadingUpdate)
        return (
            <Spinner style={{ position: 'fixed', inset: 0, margin: 'auto' }} />
        );
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">EditPost</h2>
            <form
                onSubmit={handleSubmit}
                className={`row g-1 needs-validation was-validated`}
                noValidate
            >
                <div className="form-group">
                    <label className="text-muted">Profile Photo</label>
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="text-muted">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        onChange={handleChange('title')}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="text-muted">
                        Body
                    </label>
                    <input
                        id="body"
                        type="email"
                        className="form-control"
                        onChange={handleChange('body')}
                        value={body}
                    />
                </div>
                <div className="col-12">
                    <button className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
