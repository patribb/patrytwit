import { useRouter } from 'next/router'
import Image from 'next/image'

const SidebarLogo = () => {
    const router = useRouter()

  return (
    <div 
      onClick={() => router.push('/')}
      className='rounded-full h-14 w-14 lg:w-20 lg:h-20 p-4 items-center flex justify-center hover:bg-pink-300 hover:bg-opacity-10 cursor-pointer transition'>
     <Image src='/logo.png' width={140} height={140} alt='Patrytwit' /> 
    </div>
  )
}

export default SidebarLogo