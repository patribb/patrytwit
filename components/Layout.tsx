import { FC, ReactNode } from 'react'
import {FollowBar, Sidebar} from './'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen bg-slate-900'>
     <div className="container h-full mx-auto xl:px-30 max-w-6xl">
       <div className="grid grid-cols-4 h-full">
         <Sidebar />
        <div className="col-span-3 lg:col-span-2 border-x-[1px] border-slate-800">
          {children}
        </div>
        <FollowBar />
       </div>
     </div>
    </div>
  )
}

export default Layout