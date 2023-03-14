import {useCallback, useEffect, useState} from 'react'
import { useCurrentUser, useEditModal, useUser } from '@/hooks'
import {ImageUpload, Input, Modal} from '@/components'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const EditModal = () => {
    const{data: currentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async() => {
      try {
        setIsLoading(true)
        await axios.patch('/api/edit', {
          profileImage,
          coverImage,
          name,
          bio,
          username
        })
        mutateFetchedUser()
        toast.success('Profile updated😃')
        editModal.onClose()
      } catch (error) {
        toast.error('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }, [bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])

    useEffect(() => {
      setProfileImage(currentUser?.profileImage)
      setCoverImage(currentUser?.coverImage)
      setName(currentUser?.name)
      setBio(currentUser?.bio)
      setUsername(currentUser?.username)
    }, [currentUser])

    const bodyContent = (
      <div className="flex flex-col gap-4">
        <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label='Upload Profile image' />
        <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label='Upload Cover image' />
        <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
        <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
        <Input placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} />
      </div>
    )

  
  return (
    <Modal disabled={isLoading} body={bodyContent} isOpen={editModal.isOpen} title='Edit your Profile' actionLabel='Save' onClose={editModal.onClose} onSubmit={onSubmit} />
  )
}

export default EditModal