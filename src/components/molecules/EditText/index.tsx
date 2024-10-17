import { RED } from '@/helper/colors'
import { errorMsg } from '@/helper/message'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

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
}

export const EditText = (props: EditTextProps) => {
  const {
    error,
    editorText,
    setEditorText,
    disabled,
    placeholder,
    onBlur,
    height,
    maxLength,
  } = props
  console.log(disabled, 'dis')
  const handleEditorChange = (editorTextParams: string) => {
    const textContent = editorTextParams.replace(/<(.|\n)*?>/g, '').trim()
    if (textContent.length === 0) {
      setEditorText('')
    } else {
      setEditorText(editorTextParams)
    }
  }

  return (
    <div className='flex flex-col w-full gap-2 border-red-600'>
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
        value={editorText}
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
            // ['link', 'video', 'image', 'code-block'],
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
          // 'link',
          // 'video',
          // 'image',
          'code-block',
          'align',
        ]}
        onChange={handleEditorChange}
        // onKeyDown={(e) => {
        //   if (
        //     maxLength &&
        //     textContent.length > maxLength &&
        //     e.key !== 'Backspace'
        //   ) {
        //     e.preventDefault()
        //   }
        // }}
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
