import { RED } from '@/helper/colors'
import { errorMsg } from '@/helper/message'
import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type EditTextProps = {
  editorText: string
  setEditorText: (newEditorText: string) => void
  disabled: boolean
  error: string | undefined
  placeholder?: string
  onBlur?: () => void
  height?: number
  maxLength?: number
  title: string
}

export const EditText = (props: EditTextProps) => {
  const {
    title,
    error,
    editorText,
    setEditorText,
    disabled,
    placeholder,
    onBlur,
    height,
    maxLength,
  } = props

  // Ref để giữ giá trị hiện tại của editorText
  const editorTextRef = useRef(editorText)

  // Sử dụng debounce cho hàm handleEditorChange
  const debouncedSetEditorText = useCallback(
    debounce((text: string) => {
      setEditorText(text)
    }, 200),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setEditorText]
  )

  const handleEditorChange = (editorTextParams: string) => {
    const textContent = editorTextParams.replace(/<(.|\n)*?>/g, '').trim()
    editorTextRef.current = editorTextParams

    if (textContent.length === 0) {
      debouncedSetEditorText('')
    } else {
      debouncedSetEditorText(editorTextParams)
    }
  }

  return (
    <div className='flex flex-col w-full gap-2 border-red-600'>
      <Typography fontWeight={700}>{title}</Typography>
      <ReactQuill
        className='shadow-sm'
        theme='snow'
        style={{
          height: height ?? 350,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: disabled ? '' : '#fff',
          pointerEvents: disabled ? 'none' : 'unset',
        }}
        onBlur={onBlur}
        placeholder={placeholder ?? 'Type your text here …'}
        readOnly={disabled}
        value={editorTextRef.current} // Giữ giá trị hiện tại của editorText từ ref
        modules={{
          toolbar: [
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'code-block'],
            ['clean'],
          ],
        }}
        formats={[
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'color',
          'background',
          'list',
          'bullet',
          'indent',
          'code-block',
          'align',
        ]}
        onChange={handleEditorChange}
      />
      {error && (
        <p className='p-0 m-0 text-sm text' style={{ color: RED }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default EditText
