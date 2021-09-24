import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import DefaultProfile from '../images/avatar.jpg';
import DefaultPost from '../images/mountains.jpg';
import {
    useDeletePost,
    useLikePost,
    usePost,
    useUnLikePost,
} from '../utils/posts';

function SinglePost() {
    const { user: authUser } = useAuth();
    const { postId } = useParams();
    const { post, isLoading, isIdle } = usePost(postId);
    const userId = post && post.postedBy ? post.postedBy._id : 0;
    const posterId = post && post.postedBy ? `/user/${post.postedBy._id}` : '';
    const posterName = post && post.postedBy ? post.postedBy.name : ' Unknown';

    const isAuthenticatedUser = authUser?._id === userId;

    const [callDeletePost, { isLoading: isLoadingDelete }] =
        useDeletePost(postId);
    const history = useHistory();

    const [callLikeApi, { isLoading: isLoadingLike }] = useLikePost(postId);
    const [callUnLikeApi, { isLoading: isLoadingUnLike }] =
        useUnLikePost(postId);
    const [{ currentUserLike, likes }, setLikeControl] = useState({
        currentUserLike: false,
        likes: 0,
    });

    useEffect(() => {
        if (!post || !post.likes) return;
        setLikeControl({
            currentUserLike: post.likes.indexOf(authUser?._id) !== -1,
            likes: post.likes.length,
        });
    }, [authUser?._id, post]);

    const likeToggle = () => {
        if (!authUser) return history.push('/signin');
        const callApi = currentUserLike ? callUnLikeApi : callLikeApi;
        callApi(authUser?._id).then((updatedPost) => {
            setLikeControl({
                currentUserLike: !currentUserLike,
                likes: updatedPost.likes.length,
            });
        });
    };

    const handleDeleteConfirmation = () => {
        if (window.confirm('Are you sure you want to delete this post?'))
            handleDeletePost();
    };

    const handleDeletePost = () => {
        callDeletePost().then(() => {
            history.push('/');
        });
    };

    const renderActions = () => (
        <>
            <Link to={`/`} className="btn btn-raised btn-primary me-2">
                Back to posts
            </Link>
            {isAuthenticatedUser && (
                <>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="btn btn-raised btn-warning me-2"
                    >
                        Update Post
                    </Link>
                    <button
                        className="btn btn-raised btn-danger"
                        onClick={handleDeleteConfirmation}
                        disabled={isLoadingDelete}
                    >
                        {isLoadingDelete ? (
                            <Spinner show={true} />
                        ) : (
                            'Delete Post'
                        )}
                    </button>
                </>
            )}
        </>
    );

    if (isLoading || isIdle)
        return (
            <Spinner
                show={true}
                style={{ position: 'fixed', inset: 0, margin: 'auto' }}
            />
        );

    return (
        <div className="container col-md-6">
            <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
            <div className="d-flex">
                <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy?._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultProfile}`)}
                    className="img-thumbnail mb-3"
                    style={{
                        height: '40px',
                        width: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
                <div className="ms-3">
                    <p className="card-text">{post.body?.substring(0, 100)}</p>
                </div>
            </div>
            <img
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={post.title}
                onError={(i) => (i.target.src = `${DefaultPost}`)}
                className="img-thumbnail mb-3"
                style={{
                    height: '300px',
                    width: '100%',
                    objectFit: 'cover',
                }}
            />
            {isLoadingLike || isLoadingUnLike ? (
                <Spinner />
            ) : currentUserLike ? (
                <h3 onClick={likeToggle}>
                    <i
                        className="fa fa-thumbs-up text-success bg-dark"
                        style={{ padding: '10px', borderRadius: '50%' }}
                    />
                    {likes} Likes
                </h3>
            ) : (
                <h3 onClick={likeToggle}>
                    <i
                        className="fa fa-thumbs-up text-warning bg-dark"
                        style={{ padding: '10px', borderRadius: '50%' }}
                    />
                    {likes} Likes
                </h3>
            )}
            <p className="font-italic mark">
                Posted by <Link to={`${posterId}`}>{posterName} </Link>
                on {new Date(post.created).toDateString()}
            </p>
            {renderActions()}
        </div>
    );
}

export default SinglePost;
