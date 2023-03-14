import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser, useLike, useLoginModal } from '@/hooks'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from '../Avatar'
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage} from 'react-icons/ai'

interface PostItemProps {
  userId?: string
  data: Record<string, any>
}

const PostItem: FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId})
  console.log(data)

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation()
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id])

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    toggleLike()
  }, [currentUser, toggleLike, loginModal]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  return (
    <div
      onClick={goToPost}
      className='border-b-[1px]border-slate-800 p-5 cursor-pointer hover:bg-slate-800 transition'
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p 
            onClick={goToUser} 
            className='text-pink-300 font-semibold cursor-pointer text-sm hover:underline'>
              {data.user.name}
            </p>
            <span 
            onClick={goToUser} 
            className='text-pink-400 text-xs cursor-pointer hidden hover:underline md:block'>@{data.user.username}</span>
            <span className="text-pink-500 text-[10px]">{createdAt}</span>
          </div>
          <div className="text-pink-200 mt-2">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-pink-500 gap-2 cursor-pointer transition hover:text-pink-300">
                <AiOutlineMessage size={20} />
                <p className="text-pink-300">{data.comments?.length || 0}</p>
            </div>
            <div onClick={onLike} className="flex flex-row items-center text-pink-500 gap-2 cursor-pointer transition hover:text-pink-600">
                <LikeIcon size={20} className={`${hasLiked ? 'text-pink-500' : ''}`} />
                <p className="text-pink-300">{data.likedIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
