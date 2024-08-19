import Image from 'next/image'
import { memo } from 'react'

interface Props {
  url: string
  className?: string
  removeImage: () => void
}

function urlAreEqual(prev: Props, next: Props) {
  return prev.url === next.url
}

const ImageBox = (props: Props) => {
  const { url, className, removeImage } = props

  return (
    <div className={className}>
      <div
        className='absolute cursor-pointer top-2 right-2'
        onClick={removeImage}
      >
        <Image
          alt='remove'
          width={16}
          height={16}
          src={require('@/assets/svg/iconRemove.svg')}
        />
      </div>
      {url && <Image src={url} alt='' width={80} height={80} />}
    </div>
  )
}

export default memo(ImageBox, urlAreEqual)
