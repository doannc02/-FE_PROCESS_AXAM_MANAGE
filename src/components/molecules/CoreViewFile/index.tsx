import CoreDocxViewer from '@/components/atoms/CoreDocxViewer'
import DocViewer from '@/components/atoms/CoreDocxViewer'
import dynamic from 'next/dynamic'

const CorePdfViewer = dynamic(
  () =>
    import('@/components/atoms/CorePdfViewer').then((mod) => mod.CorePdfViewer),
  {
    ssr: false,
  }
)

const PdfWrapper = dynamic(
  () =>
    import('@/components/atoms/CorePdfViewer').then((mod) => mod.PdfWrapper),
  {
    ssr: false,
  }
)

const getType = (src: string) => {
  const numOfDot = src.lastIndexOf('.')
  const extension = src.slice(numOfDot + 1, src.length)
  if (['pdf'].includes(extension)) return 'pdf'
  if (['docx'].includes(extension)) return 'docx'
  if (['mp4', 'ogg'].includes(extension)) return 'media'
  return 'image'
}

export default function CoreViewFile({ src }: { src: string }) {
  console.log(src, 'path url')
  return (
    <div className='relative w-full h-[100vh] flex justify-center'>
      {src && (
        <PdfWrapper>
          <CorePdfViewer pdfFilePath={src} />
        </PdfWrapper>
      )}
    </div>
  )
}
