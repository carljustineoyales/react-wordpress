import React, {Component} from 'react';

// Components
import Navbar from './Navbar'

// Package
import axios from 'axios'
import {Link} from '@reach/router';
import renderHTML from 'react-render-html';
import Moment from 'react-moment'

// Stylsheet
import '../Style.css'


class Home extends Component {

  constructor(props) {
    //use super before state
    super(props);
    // states
    this.state = {
      loading: false,
      posts: [],
      error: ''
    }
  }

  componentDidMount() {
    //CHANGE THIS WHEN PUTTING IT ON LIVE
    const WordpressSiteUrl = 'http://crowdfundingapp.localhost';
    this.setState({
      loading: true
    }, () => {
      // get request posts using WP Rest API
      axios
        .get(`${WordpressSiteUrl}/wp-json/wp/v2/posts`)
        .then(res => {
          this.setState({loading: false, posts: res.data})
        })
        .catch(err => this.setState({loading: false, error: err.response.data}))

    });
  }

  render() {
    const {posts} = this.state;
    return (
      <div>

        <Navbar/> 
        {/* if posts have length then evaluate */}
        {posts.length ? (
            <div className='mt-5 post-container'>
            {/* looping to get individual post */}

              {posts.map(post => (
                
                <div key={post.id} className='card border-dark mb-3' style={{ width: '50rem' }}>
                {/* generate card per post */}

                  {/* Title Card */}
                  <div className='card-header'>
                    <Link to={`/post/${post.id}`}>
                      {post.title.rendered}
                    </Link>
                  </div>

                  {/* Body Card */}
                  <div className='card-body'>
                    <div className='card-text post-content'>
                    {/* rendering HTML post */}
                      {renderHTML(post.excerpt.rendered)}
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className='card-footer'>
                    <Moment fromNow>{post.date}</Moment>
                  </div>
                </div>
              ))}
            </div>
          ) : ''}

      </div>
    );
  }
}

export default Home;