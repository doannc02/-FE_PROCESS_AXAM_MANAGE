import { usePDFSlick } from '@pdfslick/react'
import '@pdfslick/react/dist/pdf_viewer.css'
import { ReactNode, useId } from 'react'
import PDFNavigation from './PDFNavigation'
import CoreLoading from '@/components/molecules/CoreLoading'

type PDFViewerAppProps = {
  pdfFilePath: string
}

const PdfWrapper = ({ children }: { children: ReactNode }) => (
  <div className='absolute inset-0 bg-[#a7a7a7] bg-opacity-10 overflow-hidden'>
    <div className=' flex-1 relative w-[1100px] h-[100vh] overflow-hidden'>
      {children}
    </div>
  </div>
)

const CorePdfViewer = ({ pdfFilePath }: PDFViewerAppProps) => {
  console.log(pdfFilePath, 'pathFile')
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(
    pdfFilePath,
    {
      singlePageViewer: true,
      scaleValue: 'page-width',
    }
  )

  const data = usePDFSlickStore()
  const key = useId()

  return (
    <div className='overflow-x-hidden'>
      <PdfWrapper key={key}>
        <PDFSlickViewer className='p-6' {...{ viewerRef, usePDFSlickStore }} />
        {data.isDocumentLoaded ? (
          <PDFNavigation {...{ usePDFSlickStore }} />
        ) : (
          <div className='mt-[35vh]'>
            <CoreLoading />
          </div>
        )}
      </PdfWrapper>
    </div>
  )
}

export { CorePdfViewer, PdfWrapper }
