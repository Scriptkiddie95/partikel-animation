import useMeasure from 'react-use-measure'
import { useCallback, useState } from 'react'
import type { ChangeEvent, FC, FormEvent, InputHTMLAttributes } from 'react'
import { Status, type StatusType } from './Status'

type EmailInputProps = {
  onSubmit: (email: string) => void
} & InputHTMLAttributes<HTMLInputElement>

const EmailInput: FC<EmailInputProps> = ({ onSubmit, ...props }) => {
  const [formRef] = useMeasure()
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<StatusType>(Status.Idle)

  const disabledStates: StatusType[] = [Status.Loading]

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setStatus(Status.Idle)
    setValue(event.target.value)
  }, [])

  const submitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus(Status.Error)
      return
    }

    setStatus(Status.Loading)

    try {
      onSubmit(value)
      setStatus(Status.Success)
      setValue('')
      setTimeout(() => setStatus(Status.Idle), 1000)
    } catch {
      setStatus(Status.Error)
    }
  }, [value, onSubmit])

  return (
    <form ref={formRef} onSubmit={submitForm} style={{ position: 'relative', maxWidth: 600 }}>
      <input
        type="email"
        value={value}
        onChange={onEmailChange}
        placeholder="sup@miguel.build"
        disabled={disabledStates.includes(status)}
        style={{
          width: '100%',
          fontSize: 48,
          fontFamily: 'Orbitron, Inter, sans-serif',
          padding: '12px 16px',
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          outline: 'none',
          boxSizing: 'border-box',
        }}
        {...props}
      />

      <button
        type="submit"
        disabled={disabledStates.includes(status)}
        style={{
          position: 'absolute',
          top: '50%',
          right: 12,
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: '#999',
          fontSize: 18,
          cursor: disabledStates.includes(status) ? 'default' : 'pointer',
          opacity: disabledStates.includes(status) ? 0.3 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        [Enter]
      </button>

      {/* Legacy dissolve effect removed */}
    </form>
  )
}

export default EmailInput
