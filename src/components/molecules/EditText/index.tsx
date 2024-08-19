import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type EditTextProps = {
  editorText: string
  setEditorText: (newEditorText: string) => void
  disabled: boolean
  error: string | undefined
}

export const EditText = (props: EditTextProps) => {
  const { error, editorText, setEditorText, disabled } = props
  const handleEditorChange = (editorTextParams: string) => {
    if (editorTextParams.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setEditorText('')
    } else setEditorText(editorTextParams)
  }

  // const handleBlur = (value: string) => {}

  return (
    <div className='flex flex-col w-full gap-2 border-red-600'>
      <ReactQuill
        className='shadow-sm'
        theme='snow'
        style={{
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: disabled ? '' : '#fff',
          pointerEvents: disabled ? 'none' : 'unset',
        }}
        placeholder='Type your text here …'
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
            ['link', 'video', 'image', 'code-block'],
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
          'link',
          'video',
          'image',
          'code-block',
          'align',
        ]}
        onChange={handleEditorChange}
      />
      {error && <p className='p-0 m-0 text-sm text-red-600'>{error}</p>}
    </div>
  )
}

export default EditText
