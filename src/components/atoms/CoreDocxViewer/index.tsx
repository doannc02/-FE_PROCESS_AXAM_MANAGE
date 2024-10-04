import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

const CoreDocxViewer = ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl) {
    return <></>
  }
  const encodedUrl = encodeURIComponent(fileUrl)
  const docs = [
    { uri: encodedUrl }, // URL của file .docx
  ]

  return (
    // <DocViewer
    //   pluginRenderers={DocViewerRenderers}
    //   documents={docs}
    //   config={{
    //     header: {
    //       disableHeader: false,
    //       disableFileName: false,
    //       retainURLParams: false,
    //     },
    //   }}
    //   style={{ height: 1000 }}
    // />
    <iframe
      src={`${fileUrl}`}
      style={{ width: '100%', height: '600px' }}
      frameBorder='0'
    ></iframe>
  )
}

export default CoreDocxViewer
