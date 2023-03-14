import { FC, ReactElement, useCallback } from 'react'
import {SlClose} from 'react-icons/sl'
import Button from './Button'

interface ModalProps {
    isOpen?    : boolean
    onClose    : () => void
    onSubmit   : () => void
    title?     : string
    body?      : ReactElement
    footer?    : ReactElement
    actionLabel: string
    disabled?  : boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled }) => {

    const handleClose = useCallback(() => {
        if (disabled) return
        onClose()
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return
        onSubmit()
    }, [disabled, onSubmit])

    if(!isOpen) return null
    
  return (
    <>
     <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            {/* content */}
            <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-center justify-between p-10 rounded-t">
                    <h3 className="text-3xl font-semibold text-pink-300">{title}</h3>
                    <button onClick={handleClose} className='p-1 ml-auto border-0 hover:opacity-70 transition'>
                        <SlClose size={24} color='pink' />
                    </button>
                </div>
                {/* body */}
                <div className="relative p-10 flex-auto">{body}</div>
                {/* footer */}
                <div className="flex flex-col gap-2 p-10">
                    <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
                    {footer}
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Modal