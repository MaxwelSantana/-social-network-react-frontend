import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import { useCreatePost } from '../utils/posts';

function NewPost() {
    const [{ title, body, photo, fileSize }, setFormFields] = useState({
        title: '',
        body: '',
        photo: '',
        fileSize: 0,
    });
    const postFormDataRef = useRef(new FormData());
    const [formError, setFormError] = useState('');
    const [createPost, { isLoading, isError, error }] = useCreatePost();
    const { user: currentUser } = useAuth();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValid()) {
            createPost(postFormDataRef.current).then(() => {
                history.push(`/user/${currentUser?._id}`);
            });
        }
    };

    const handleChange = (name) => (event) => {
        setFormError('');
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        setFormFields((prev) => ({ ...prev, [name]: value, fileSize }));
        postFormDataRef.current.set(name, value);
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setFormError('File size should be less than 100kb');
            return false;
        }
        if (title.length === 0) {
            setFormError('All fields are required');
            return false;
        }
        if (body.length === 0) {
            setFormError('All fields are required');
            return false;
        }
        return true;
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">New Post</h2>
            <ErrorMessage show={!!formError}>{formError}</ErrorMessage>
            <ErrorMessage show={isError}>{error}</ErrorMessage>
            <Spinner show={isLoading} />
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
                        type="text"
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

export default NewPost;
