import { ChangeEvent, FC } from 'react'

interface InputProps {
    placeholder?: string
    value?      : string
    type?       : string
    disabled?   : boolean
    onChange?   : (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ placeholder, value, type, disabled, onChange }) => {
  return (
    <input 
      className='w-full p-4 disabled:opacity-70 disabled:cursor-not-allowed bg-slate-900 border-2 border-slate-700 rounded-md outline-none text-pink-300 focus:border-pink-500 focus:border-2 transition disabled:bg-slate-600'
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    />
  )
}

export default Input