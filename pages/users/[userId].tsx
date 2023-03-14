import {useRouter} from 'next/router'
import { Header, PostFeed, UserBio, UserHero } from '@/components'
import { useUser } from '@/hooks'
import { BounceLoader } from 'react-spinners'

const UserView = () => {
    const router = useRouter()
    const {userId} = router.query
    const {data: fetchedUser, isLoading} = useUser(userId as string)

    if (isLoading || !fetchedUser)  return <div className='flex justify-center h-full items-center'><BounceLoader color='pink' /></div>

  return (
    <>
     <Header label={fetchedUser?.name} showBackArrow />
     <UserHero userId={userId as string} />
     <UserBio userId={userId as string} />
     <PostFeed userId={userId as string} />
    </>
  )
}

export default UserView