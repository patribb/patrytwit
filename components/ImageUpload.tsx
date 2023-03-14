import Image from 'next/image'
import { FC, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
    onChange : (base64: string) => void
    label    : string
    value?   : string
    disabled?: boolean
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
    const [base64, setBase64] = useState(value)

    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    },[onChange])

    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e: any) => {
            setBase64(e.target.result)
            handleChange(e.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleChange])

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

  return (
    <div {...getRootProps({className: 'w-full rounded-lg p-4 cursor-pointer text-pink-300 text-center border-2 border-dotted border-pink-400'})}>
        <input {...getInputProps()} />
        {base64 ? (
            <div className='flex items-center justify-center'>
                <Image src={base64} height='100' width='100' alt='Uploaded image' />
            </div>
        ):(
            <p className="text-pink-300 text-sm">{label}</p>
        )}
    </div>
  )
}

export default ImageUpload