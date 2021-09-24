import React from 'react';
import { usePosts } from '../utils/posts';
import DefaultPost from '../images/mountains.jpg';
import DefaultProfile from '../images/avatar.jpg';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

function Posts() {
    const { posts, isLoading } = usePosts();

    const renderPosts = () => {
        return posts.map((post) => {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
            const posterName = post.postedBy ? post.postedBy.name : ' Unknown';
            return (
                <li className="list-group-item d-flex " key={post._id}>
                    <div>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy?._id}`}
                            alt={post.title}
                            onError={(i) =>
                                (i.target.src = `${DefaultProfile}`)
                            }
                            className="img-thumbnail mb-3"
                            style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div className="ms-3">
                        <div>
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">
                                {post.body.substring(0, 100)}
                            </p>
                        </div>
                        <div>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                alt={post.title}
                                onError={(i) =>
                                    (i.target.src = `${DefaultPost}`)
                                }
                                className="img-thumbnail mb-3"
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-italic mark">
                                Posted by{' '}
                                <Link to={`${posterId}`}>{posterName} </Link>
                                on {new Date(post.created).toDateString()}
                            </p>
                            <Link
                                to={`/post/${post._id}`}
                                className="btn btn-raised btn-primary btn-sm"
                            >
                                Read more
                            </Link>
                        </div>
                    </div>
                </li>
            );
        });
    };

    if (isLoading)
        return (
            <Spinner
                show={true}
                style={{ position: 'fixed', inset: 0, margin: 'auto' }}
            />
        );

    return (
        <div className="container col-md-4">
            <h2 className="mt-5 mb-5">Posts</h2>
            <ul className="list-group">{renderPosts()}</ul>
        </div>
    );
}

export default Posts;
