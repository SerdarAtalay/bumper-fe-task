import { FC } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'

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
      <label className="flex items-center gap-1 text-sm font-semibold">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`rounded-md border px-4 py-2 text-sm outline-none transition-all 
          ${isError ? 'border-red-500 text-red-600' : 
            isValid ? 'border-green-600' : 'border-[#D3D3D3]'}`}
      />
      <span className="text-xs text-red-600">{isError ? field.state.meta.errors[0] : null}</span>
    </div>
  )
}

export default BuInput