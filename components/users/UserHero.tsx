import { FC } from 'react'
import Image from 'next/image'
import { useUser } from '@/hooks'
import {Avatar} from '@/components'

interface UserHeroProps {
    userId: string
}

const UserHero: FC<UserHeroProps> = ({ userId }) => {
    const {data: fetcheduser} = useUser(userId)

  return (
    <div className=''>
     <div className="bg-slate-800 h-44 relative">
        {fetcheduser?.coverImage && (
            <Image
                src={fetcheduser?.coverImage}
                alt={fetcheduser?.name}
                fill
                style={{objectFit: 'cover'}}
            />
        )}
        <div className="absolute -bottom-16 left-4">
            <Avatar userId={userId} isLarge hasBorder />
        </div>
     </div>
    </div>
  )
}

export default UserHero