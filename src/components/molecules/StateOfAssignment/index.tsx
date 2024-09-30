import { BLUE, GREEN, ORANGE, RED } from '@/helper/colors'
import { memo } from 'react'
import CustomState from './customState'

const typePaymentBGColor = {
  pending_approval: ORANGE,
  approved: GREEN,
  rejected: RED,
  in_progress: BLUE,
}

const StateOfAssignment = ({ state }: { state: string }) => {
  return (
    <>
      {
        <div
          className='absolute top-50 right-10 h-50 w-60'
          style={{
            backgroundColor:
              typePaymentBGColor[
                state as
                  | 'approved'
                  | 'in_progress'
                  | 'pending_approval'
                  | 'rejected'
              ],
            clipPath: ' polygon(0 0, 33% 0, 100% 66%, 100% 100%)',
          }}
        >
          {
            <CustomState
              listStep={[
                state === 'pending_approval'
                  ? 'Đang chờ duyệt'
                  : state === 'in_progress'
                  ? 'Đang thực hiện'
                  : state === 'approved'
                  ? 'Đã phê duyệt'
                  : 'Bị từ chối',
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
