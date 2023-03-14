import { useCallback, useState } from 'react'
import {signIn} from 'next-auth/react'
import {Input, Modal }from '@/components'
import { useLoginModal, useRegisterModal } from '@/hooks'

const LoginModal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const onToggle = useCallback(() => {
        if(isLoading) return
        loginModal.onClose()
        registerModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true)
            await signIn('credentials', {
                email,
                password,
            })
            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} type='text' disabled={isLoading} />
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} type='password' disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className="text-pink-300 text-center mt-4">
            <p className="">Don`t have an account? <span onClick={onToggle} className="text-pink-200 cursor-pointer hover:underline"> Register</span></p>
        </div>
    )

  return (
    <Modal disabled={isLoading} footer={footerContent} body={bodyContent} isOpen={loginModal.isOpen} title='Login' actionLabel='Sign In' onClose={loginModal.onClose} onSubmit={onSubmit} />
  )
}

export default LoginModal