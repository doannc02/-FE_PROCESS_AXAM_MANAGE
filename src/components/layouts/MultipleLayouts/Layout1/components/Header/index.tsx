import { useAppSelector } from '@/redux/hook'
import { AvatarCustom } from './AvatarCustom'
import { SwitchSystem } from './SwitchSystem'
import Notifications from './Notifications'

export const Header = () => {
  const { firstMainColor: GREEN_VIU } = useAppSelector(
    (state) => state.themeColorData
  )

  const user = useAppSelector((state) => state.userData)

  return (
    <div
      className='flex justify-between h-[45px] top-0 sticky'
      style={{
        backgroundColor: GREEN_VIU,
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
