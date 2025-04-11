import { FC } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { CheckIcon, ExclamationCircleIcon } from './BuIcon'

type BuInputProps = {
    field: AnyFieldApi
    label: string
    icon?: React.ReactNode
    type?: string
  }

const BuInput: FC<BuInputProps> = ({ field, label, icon, type = 'text' }) => {
  const isError = field.state.meta.errors.length > 0
  const isValid = field.state.meta.isTouched && !isError

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="flex items-center gap-1 text-base font-semibold">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`rounded-2xl border-2 px-4 py-2 text-sm outline-none transition-all w-full
        ${isError ? 'border-red-500 text-red-600' : 
          isValid ? 'border-green-600' : 'border-[#D3D3D3]'}`}
        />
        {isError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ExclamationCircleIcon className="w-4 h-4 text-red-500" />
          </div>
        )}
        {isValid && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <CheckIcon className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>
      
      <span className="text-xs text-red-600">{isError ? field.state.meta.errors[0] : null}</span>
    </div>
  )
}

export default BuInput