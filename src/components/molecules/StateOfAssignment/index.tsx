import { BLUE, GREEN, RED } from '@/helper/colors'
import { memo } from 'react'
import CustomState from './customState'

const typePaymentBGColor = {
  AWAIT: BLUE,
  POSTED: GREEN,
  DRAFT: RED,
}

const StateOfAssignment = ({
  state,
}: {
  state: string
}) => {
  return (
    <>
      {
        <div
          className='absolute top-50 right-10 h-50 w-60'
          style={{
            backgroundColor:
              typePaymentBGColor[state as 'AWAIT' | 'POSTED' | 'DRAFT'],
            clipPath: ' polygon(0 0, 33% 0, 100% 66%, 100% 100%)',
          }}
        >
          {
            <CustomState
              listStep={[
                state === 'AWAIT'
                  ? 'Đang xử lý'
                  : state === 'DRAFT'
                  ? 'Bản lưu nháp'
                  : 'Đã phê duyệt',
              ]}
              index={1}
              enableNextStep={false}
              color={'white'}
            />
          }
        </div>
      }
    </>
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
}

export default memo(StateOfAssignment)
