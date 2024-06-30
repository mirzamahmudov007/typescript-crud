import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'

type PropsCkeditorType = {
  name: string
  onChange: Function
}

function Ckeditor({ name }: PropsCkeditorType) {
  return (
    <CKEditor
      name={name}
      editor={ClassicEditor}
      data="<p>Hello from the first editor working with the context!</p>"
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor1 is ready to use!', editor)
      }}
      config={{
        ckfinder: {
          uploadUrl: '/path/to/upload/image' // Replace this with your image upload URL
        }
      }}
    />
  )
}

export default Ckeditor
