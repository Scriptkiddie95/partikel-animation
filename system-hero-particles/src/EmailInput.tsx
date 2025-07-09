import useMeasure from 'react-use-measure'
import type { ChangeEvent, FC, FormEvent, InputHTMLAttributes } from 'react'
import { useCallback, useState } from 'react'
import DissipateTextEffect from './DissipateTextEffect'
import { Status, type StatusType } from './Status'


type EmailInputProps = {
  onSubmit: (email: string) => void
} & InputHTMLAttributes<HTMLInputElement>

const EmailInput: FC<EmailInputProps> = ({ onSubmit, ...props }) => {
  const [formRef, dimensions] = useMeasure()
  const [value, setValue] = useState<string>('')

const [status, setStatus] = useState<StatusType>(Status.Idle)

  const onEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setStatus(Status.Idle)
      setValue(event.target.value)
    },
    []
  )

  const submitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (value.length === 0) {
        setStatus(Status.Error)
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setStatus(Status.Error)
        return
      }

      setStatus(Status.Loading)

      try {
        onSubmit(value)
        setStatus(Status.Animate)
      } catch {
        setStatus(Status.Error)
      }
    },
    [value, onSubmit]
  )

  return (
    <form
      ref={formRef}
      onSubmit={submitForm}
      data-loading={status === Status.Loading}
      className="pb-3 relative w-full mx-auto border-[#ffffff48] border-b-2 max-w-[80%]"
    >
      <div className="relative group">
        <input
          type="email"
          value={value}
          onChange={onEmailChange}
          placeholder="sup@miguel.build"
disabled={([Status.Loading, Status.Animate] as StatusType[]).includes(status)}
          className={`w-full focus-visible:shadow-none transition-[color] ease duration-300 selection:bg-white selection:text-orange pr-20 text-2xl outline-0 font-medium ${status == Status.Animate ? 'text-transparent' : 'text-white'}`}
          {...props}
        />
        <div className="absolute right-0 translate-y-[-50%] top-[50%] grid-stack">
          <button
            type="submit"
            className={`uppercase text-[#ffffff95] text-lg transition duration-500 ease-in-out opacity-0 blur-xs scale-85 ${status == Status.Idle ? 'group-focus-within:opacity-50 group-focus-within:blur-none group-focus-within:scale-100' : ''}`}
          >
            [Enter]
          </button>
        </div>
        {status === Status.Animate && (
          <DissipateTextEffect
            size={24}
            value={value}
            color="#FFFFFF"
            height={2 * dimensions.height}
            width={2 * dimensions.width - 136}
            onDone={() => {
              setStatus(Status.Success)
              setValue('')

              setTimeout(() => {
                setStatus(Status.Idle)
              }, 1000)
            }}
          />
        )}
      </div>
    </form>
  )
}

export default EmailInput
