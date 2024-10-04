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
  return (
    <div className='relative w-[1100px] h-[99vh] flex justify-center'>
      {src && (
        <PdfWrapper>
          {getType(src) === 'pdf' && <CorePdfViewer pdfFilePath={src} />}
          
          {/* {getType(src) === 'image' && (
                <div className='w-full h-full flex justify-center items-center mt-6'>
                  <Image
                    width={500}
                    height={500}
                    alt='img'
                    src={src}
                    className='min-h-[90vh] min-w-[50vw]'
                  />
                </div>
              )}

              {getType(src) === 'media' && (
                <div className=' flex h-full w-full items-center justify-center'>
                  <video
                    className='w-fit min-h-[90vh] min-w-[50vw] mt-4'
                    controls
                  >
                    <source src={src} type='video/ogg' />
                  </video>
                </div>
              )} */}
        </PdfWrapper>
      )}
    </div>
  )
}
