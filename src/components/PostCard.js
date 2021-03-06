import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Popup } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { LikeButton } from './LikeButton'
import { DeleteButton } from '../components/DeleteButton'

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {

    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description className='wrap'>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                    content='Comment on post'
                    inverted
                    trigger={
               <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                   <Button color='blue' basic>
                       <Icon name='comments' />
                   </Button>
                   <Label basic color='blue' pointing='left'>
                       {commentCount}
                    </Label>
               </Button>}
               />
               {user && user.username === username && <DeleteButton postId={id}/>}
            </Card.Content>
        </Card>
 )
}


