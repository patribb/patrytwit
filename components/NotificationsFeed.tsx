import {useEffect} from 'react'
import { useCurrentUser, useNotifications } from "@/hooks"
import { FaOctopusDeploy } from 'react-icons/fa'

const NotificationsFeed = () => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {data: fetchedNotifications = []} = useNotifications(currentUser?.id)

    useEffect(() => {
      mutateCurrentUser()
    }, [mutateCurrentUser])

    if (fetchedNotifications.length === 0) {
        return (
          <div className="text-slate-500 text-center p-6 text-xl">
            No notifications
          </div>
        )
    }
    
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-slate-800">
          <FaOctopusDeploy color="pink" size={25} />
          <p className="text-pink-300">
            {notification.body}
          </p>
        </div>
        ))}
    </div>
  )
}

export default NotificationsFeed