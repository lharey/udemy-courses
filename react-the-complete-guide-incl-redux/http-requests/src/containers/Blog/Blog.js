import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
// import FullPost from '../FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        {/* NavLink by default will use the active class
                        You can pass a different css class name using activeClassName */}
                        <ul>
                            <li><NavLink to="/posts/" exact>Posts</NavLink></li>
                            <li>
                                <NavLink to={{
                                    pathname: "/new-post",
                                    hash: '#submit',
                                    search: "?quick-submit=true"
                                }}>
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1> } />
                <Route path="/" render={() => <h1>Home 2</h1> } /> */}
                {/* Switch will render the first matching route
                without this it will render all matching routes */}
                {/* <Route path="/" exact component={Posts} /> */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null }
                    <Route path="/posts" component={Posts} />
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts} /> */}
                    {/* <Route path="/:id" component={FullPost} /> */}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;