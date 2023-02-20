import { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface InputFileProps {
  onChange?: (file: File) => void
}

export default function InputFile({ onChange }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && fileFromLocal?.size <= config.maxSizeUpload && fileFromLocal.type.includes('image')) {
      onChange && onChange(fileFromLocal)
    } else {
      toast.error('File không đúng quy định')
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={event => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  )
}
