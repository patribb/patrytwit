import { useCallback } from 'react'
import { useRouter } from 'next/router'
import {FaFeather} from 'react-icons/fa'
import { useLoginModal } from '@/hooks'

const SidebarTweetButton = () => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const onClick = useCallback(() => {
      loginModal.onOpen()
    }, [loginModal])

  return (
    <div onClick={onClick}>
     <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 items-center justify-center bg-pink-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color='pink' />
     </div>
     <div className="mt-6 hidden lg:block rounded-full px-1 py-2 bg-pink-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className="hidden lg:block font-semibold text-center mr-4 text-white text-[18px]">Tweet</p>
     </div>
    </div>
  )
}

export default SidebarTweetButton