import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';

function ProfileTabs({ following, followers, posts }) {
    const { followersTab, followingsTab, postsTab } = {
        followersTab: 'followersTab',
        followingsTab: 'followingsTab',
        postsTab: 'postsTab',
    };
    const [activeTab, setActiveTab] = useState(followersTab);

    const isTabActive = (tab) => activeTab === tab;

    const renderUsers = (users) => {
        if (!users) return;
        return users.map((user) => (
            <Link
                to={`/user/${user._id}`}
                className="d-flex align-items-center mb-2"
                key={user._id}
            >
                <img
                    style={{
                        borderRadius: '50%',
                        border: '1px solid black',
                        height: '30px',
                        width: '30px',
                    }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                    alt={user.name}
                    onError={(i) => (i.target.src = `${DefaultProfile}`)}
                />
                <p className="lead mb-0 ms-2">{user.name}</p>
                <div></div>
            </Link>
        ));
    };

    const renderPosts = () => {
        if (!posts) return;
        return posts.map((post) => (
            <Link
                to={`/post/${post._id}`}
                className="d-flex align-items-center mb-2"
                key={post._id}
            >
                <p className="lead mb-0 ms-2">{post.title}</p>
            </Link>
        ));
    };

    return (
        <div>
            <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${
                            isTabActive(followersTab) && 'active'
                        }`}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onClick={() => setActiveTab(followersTab)}
                    >
                        Followers
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${
                            isTabActive(followingsTab) && 'active'
                        }`}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => setActiveTab(followingsTab)}
                    >
                        Following
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${
                            isTabActive(postsTab) && 'active'
                        }`}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => setActiveTab(postsTab)}
                    >
                        Posts
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="ex1-content">
                <div
                    className={`tab-pane fade ${
                        isTabActive(followersTab) && 'show active'
                    }`}
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                >
                    {renderUsers(followers)}
                </div>
                <div
                    className={`tab-pane fade ${
                        isTabActive(followingsTab) && 'show active'
                    }`}
                    id="ex1-tabs-2"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-2"
                >
                    {renderUsers(following)}
                </div>
                <div
                    className={`tab-pane fade ${
                        isTabActive(postsTab) && 'show active'
                    }`}
                    id="ex1-tabs-3"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-3"
                >
                    {renderPosts()}
                </div>
            </div>
        </div>
    );
}

export default ProfileTabs;
