import { FC } from 'react'

interface ButtonProps {
    label     : string
    secondary?: boolean
    fullWidth?: boolean
    large?    : boolean
    onClick?  : () => void
    disabled? : boolean
    outline?  : boolean
}

const Button: FC<ButtonProps> = ({ label, secondary, fullWidth, large, onClick, disabled, outline }) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full text-sm font-semibold hover:opacity-80 transition border-2
        ${fullWidth ? 'w-full' : 'w-fit'} ${secondary? 'bg-pink-200' : 'bg-pink-500'} ${secondary? 'text-pink-700' : 'text-pink-200'} ${secondary? 'border-gray-700' : 'border-pink-500'}
        ${large? 'text-xl' : 'text-md'} ${large? 'px-3': 'px-2'} ${large? 'py-2': 'py-1'} ${outline? 'bg-transparent': ''} ${outline? 'border-pink-300': ''} ${outline? 'text-pink-200': ''}
    `}>
     {label}
    </button>
  )
}

export default Button