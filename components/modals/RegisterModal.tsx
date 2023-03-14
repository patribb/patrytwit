import { useCallback, useState } from 'react'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import {Input, Modal }from '@/components'
import { useLoginModal, useRegisterModal } from '@/hooks'
import toast from 'react-hot-toast'

const RegisterModal= () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const onToggle = useCallback(() => {
        if(isLoading) return
        registerModal.onClose()
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true)
            await axios.post('/api/register',{
                email,
                password,
                name,
                username
            })
            toast.success('Account created successfully😃')
            signIn('credentials', {email, password})
            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong, try again')
        } finally {
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} type='text' disabled={isLoading} />
            <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} type='text' disabled={isLoading} />
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} type='text' disabled={isLoading} />
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} type='password' disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className="text-pink-300 text-center mt-4">
            <p className="">Already have an account? <span onClick={onToggle} className="text-pink-200 cursor-pointer hover:underline"> Sign In</span></p>
        </div>
    )

  return (
    <Modal footer={footerContent} disabled={isLoading} body={bodyContent} isOpen={registerModal.isOpen} title='Create an account' actionLabel='Register' onClose={registerModal.onClose} onSubmit={onSubmit} />
  )
}

export default RegisterModal