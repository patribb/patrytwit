import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import {BiArrowBack} from 'react-icons/bi'

interface HeaderProps {
    label         : string
    showBackArrow?: boolean
}

const Header: FC<HeaderProps> = ({ label, showBackArrow }) => {
    const router = useRouter()

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

  return (
    <div className='border-b-[1px] border-slate-700 p-5'>
     <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack size={20} color='pink' onClick={handleBack} className='cursor-pointer hover:opacity-70 transition' />
        )}
        <h1 className="text-pink-400 text-xl font-black">{label}</h1>
     </div>
    </div>
  )
}

export default Header