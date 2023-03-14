import { FC, useCallback } from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import { useUser } from '@/hooks'

interface AvatarProps {
    userId    : string
    isLarge?  : boolean
    hasBorder?: boolean 
}

const Avatar: FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter()
  const {data: fetchedUser} = useUser(userId)

  const onClick = useCallback((e: any) => {
   e.stopPropagation()
   const url = `/users/${userId}`
   router.push(url)
  }, [router, userId])

  return (
    <div className={`rounded-full hover:opacity-90 transition cursor-pointer relative ${hasBorder ? 'border-4 border-pink-700' : ''} ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-12'}`}>
     <Image alt='Avatar' fill style={{objectFit: 'cover', borderRadius: '100%'}} onClick={onClick} src={fetchedUser?.profileImage || '/images/placeholder.png'} />
    </div>
  )
}

export default Avatar