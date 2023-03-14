import { FC, useCallback } from 'react'
import {useRouter} from 'next/router'
import { IconType } from 'react-icons'
import { useLoginModal, useCurrentUser } from '@/hooks'
import { BsDot } from 'react-icons/bs'

interface SidebarItemProps {
    label   : string
    icon    : IconType
    href?   : string
    onClick?: () => void
    auth?   : boolean
    alert?  : boolean
}

const SidebarItem: FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick, auth, alert }) => {
  const loginModal = useLoginModal()
  const {data: currentUser} = useCurrentUser()
  const router = useRouter()

  const handleClick = useCallback(() => {
    if (onClick) return onClick()
    if(auth && !currentUser) {
      loginModal.onOpen()
    } else if (href) router.push(href)
  }, [router, onClick, href, loginModal, currentUser, auth])

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
     <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
      <Icon size={28} color='pink' />
      {alert ? <BsDot className='text-pink-500 absolute -top-4 left-0' size={70} /> : null}
     </div>
     <div className="relative hidden lg:flex items-center gap-4 py-2 px-6 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
      <Icon size={25} color='pink' />
      <p className="hidden lg:block text-pink-300 text-xl">{label}</p>
      {alert ? <BsDot className='text-pink-500 absolute -top-5 left-2' size={70} /> : null}
     </div>
    </div>
  )
}

export default SidebarItem