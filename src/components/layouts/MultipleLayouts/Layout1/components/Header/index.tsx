import { useAppSelector } from '@/redux/hook'
import { AvatarCustom } from './AvatarCustom'
import { SwitchSystem } from './SwitchSystem'
import Notifications from './Notifications'
import { WHITE } from '@/helper/colors'

export const Header = () => {
  const { firstMainColor: GREEN_VIU } = useAppSelector(
    (state) => state.themeColorData
  )

  const user = useAppSelector((state) => state.userData)

  return (
    <div
      className='flex justify-between h-[55px] top-0 sticky'
      style={{
        backgroundColor: WHITE,
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)', // Viền dưới màu xám đậm hơn
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Bóng mờ đậm hơn
      }}
    >
      <div className='flex items-center gap-10 h-full'>
        <SwitchSystem />

        {/* <DynamicBranch /> */}
      </div>

      <div className='flex items-center gap-6 px-5'>
        <Notifications />
        <AvatarCustom
          email={user.email ?? ''}
          username={user.name}
          firstName={user.fullname}
          lastName={'lastName'}
        />
      </div>
    </div>
  )
}

export default Header
