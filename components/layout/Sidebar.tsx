import {signOut} from 'next-auth/react'
import {useCurrentUser }from '@/hooks'
import {BsFillHouseFill, BsFillBellFill, BsPersonCircle} from 'react-icons/bs'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import SidebarTweetButton from './SidebarTweetButton'

const Sidebar = () => {
  const {data: currentUser} = useCurrentUser()

  const items = [
    {label: 'Home', href: '/', icon: BsFillHouseFill},
    {label: 'Notifications', href: '/notifications', icon: BsFillBellFill, auth: true, alert: currentUser?.hasNotification},
    {label: 'Profile', href: `/users/${currentUser?.id}`, icon: BsPersonCircle, auth: true},
  ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
     <div className="flex flex-col items-end">
      <div className="space-y-2 lg:w-[230px]">
        <SidebarLogo />
        {items.map((item) => (
          <SidebarItem key={item.label} href={item.href} label={item.label} icon={item.icon} auth={item.auth} alert={item.alert} />
        ))}
        {currentUser && <SidebarItem onClick={() => signOut()} label="Logout" icon={RiLogoutCircleRLine} />}
        <SidebarTweetButton />
      </div>
     </div>
    </div>
  )
}

export default Sidebar