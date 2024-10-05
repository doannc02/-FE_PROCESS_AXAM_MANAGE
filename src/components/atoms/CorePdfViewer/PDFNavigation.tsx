import { WHITE } from '@/helper/colors'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import { Typography } from '@mui/material'
import type { TUsePDFSlickStore } from '@pdfslick/react'
import clsx from 'clsx' // Ensure clsx is installed: npm install clsx

type PDFNavigationProps = {
  usePDFSlickStore: TUsePDFSlickStore
}

export default function PDFNavigation({
  usePDFSlickStore,
}: PDFNavigationProps) {
  const pageNumber = usePDFSlickStore((s) => s.pageNumber)
  const numPages = usePDFSlickStore((s) => s.numPages)
  const pdfSlick = usePDFSlickStore((s) => s.pdfSlick)
  const scale = usePDFSlickStore((s) => s.scale)
  return (
    <div className='relative'>
      <div className='absolute z-50 h-fit pointer-events-none flex justify-center bottom-[-105px] w-full translate-y-[84vh]'>
        <div className='bg-[#34322c] w-fit h-24 rounded-xl sticky opacity-[4]'>
          <div className='flex justify-center p-8 -mt-4 '>
            <div
              className={clsx(
                'inline-flex rounded-lg shadow-md justify-center border items-center'
              )}
            >
              <Typography sx={{ color: WHITE }}>Trang</Typography>&nbsp;
              <Typography sx={{ color: WHITE }}>{pageNumber}</Typography>&nbsp;
              <Typography sx={{ color: WHITE }}>/ {numPages}</Typography>&nbsp;
              <button
                disabled={pageNumber === 1}
                onClick={() => pdfSlick?.gotoPage(pageNumber - 1)}
                type='button'
                style={{ backgroundColor: '#34322c', border: 'none' }}
                className={`${
                  pageNumber === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                }  relative inline-flex items-center px-3 py-2 text-white ring-0 ring-inset transition-all focus:z-10 disabled:opacity-50 pointer-events-auto`}
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                disabled={!pdfSlick || scale <= 0.25}
                onClick={() => pdfSlick?.viewer?.decreaseScale()}
                type='button'
                style={{ backgroundColor: '#34322c', border: 'none' }}
                className={`${
                  !pdfSlick || scale <= 0.25
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                } relative inline-flex items-center px-3 py-2 text-white ring-0 ring-inset transition-all focus:z-10 disabled:opacity-50 pointer-events-auto`}
              >
                <span className='sr-only'>Zoom Out</span>
                <ZoomOutIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                disabled={!pdfSlick || scale >= 5}
                onClick={() => pdfSlick?.viewer?.increaseScale()}
                type='button'
                style={{ backgroundColor: '#34322c', border: 'none' }}
                className={`${
                  !pdfSlick || scale >= 5
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                } relative inline-flex items-center px-3 py-2 text-white ring-0 ring-inset transition-all focus:z-10 disabled:opacity-50 pointer-events-auto`}
              >
                <span className='sr-only'>Zoom In</span>
                <ZoomInIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              <button
                disabled={numPages <= pageNumber}
                onClick={() => pdfSlick?.gotoPage(pageNumber + 1)}
                type='button'
                style={{ backgroundColor: '#34322c', border: 'none' }}
                className={`${
                  numPages <= pageNumber
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                } relative inline-flex items-center px-3 py-2 text-white ring-0 ring-inset transition-all focus:z-10 disabled:opacity-50 pointer-events-auto`}
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
