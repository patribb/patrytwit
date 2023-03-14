import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { formatDistanceToNowStrict } from 'date-fns'
import Avatar from '../Avatar'

interface CommentItemProps {
    data: Record<string, any>
}

const CommentItem: FC<CommentItemProps> = ({ data = {} }) => {
    const router = useRouter()

    const goToUser = useCallback((e: any) => {
        e.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data.createdAt])

  return (
    <div className='border-b-[1px] border-slate-800 p-5 cursor-pointer hover:bg-slate-800 transition'>
     <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
            <div className="flex flex-row items-center gap-2">
                <p onClick={goToUser} className="text-sm font-semibold cursor-pointer hover:underline text-pink-300">{data.user.name}</p>
                <span className="text-pink-500 cursor-pointer hidden md:block text-xs">@{data.user.username}</span>
                <span className="text-pink-600 text-[10px]">{createdAt}</span>
            </div>
            <div className="text-pink-200 mt-2">
                {data.body}
            </div>
        </div>
     </div>
    </div>
  )
}

export default CommentItem