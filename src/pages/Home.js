import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'


export default function Home() {
    const { user }  = useContext(AuthContext)

    const { loading, data: { getPosts: posts } = {} } = useQuery(
        FETCH_POSTS_QUERY
      );
    
    let numberColumns;

    function numberOfColumns(width) {
      if (width > 1000 && width < 2000)  numberColumns = 3;
      else if (width > 2000 && width < 5000)  numberColumns = 4;
      else if (width < 1000)  numberColumns = 2;
      else numberOfColumns = 1;
    }

    var number = Math.floor(window.innerWidth/500)

    if (number === 0) number = 1
    if (number > 4) number = 4

    console.log(number)

    return (
        <Grid columns={number}>
            <Grid.Row className='page-title'>
                <h1>Recent Posts</h1>  
            </Grid.Row>
            <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm/>
                </Grid.Column>
              )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                  <Transition.Group>
                    {posts &&
                      posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} />
                        </Grid.Column>
                      ))}
                  </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

