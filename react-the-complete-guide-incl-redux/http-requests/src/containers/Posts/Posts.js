import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axiosInstance from '../../axios';

import Post from '../Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount () {
        console.log(this.props);
        axiosInstance.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, author: 'Max'
                    };
                });
                this.setState({
                    posts: updatedPosts
                });
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({
                //     error: true
                // });
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});
        // this.props.history.push('/posts/' + id);
        this.props.history.push({
            pathname: '/posts/' + id
        });
    }

    render () {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;