import { FC } from 'react'
import { usePosts } from '@/hooks'
import PostItem from './PostItem'

interface PostFeedProps {
    userId?: string
}

const PostFeed: FC<PostFeedProps> = ({ userId }) => {
    const {data: posts = []} = usePosts(userId)

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} data={post} key={post.id} />
      ))}
    </>
  )
}

export default PostFeed