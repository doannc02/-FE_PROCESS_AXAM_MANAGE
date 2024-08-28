import { useAppSelector } from '@/redux/hook'
import { AvatarCustom } from './AvatarCustom'
import { Notifications } from './Notifications'

export const Header = () => {
  const { firstMainColor: PRIMARY } = useAppSelector(
    (state) => state.themeColorData
  )

  // const {
  //   name: companyName,
  //   username,
  //   firstName,
  //   lastName,
  // } = useAppSelector((state) => state.companyConfigData)

  return (
    <div
      className='flex justify-between h-[45px] top-0 sticky'
      style={{
        backgroundColor: PRIMARY,
      }}
    >
      <div className='flex items-center gap-10 h-full'>
        {/* <SwitchSystem /> */}
        <div className='w-[1px] h-1/3 bg-slate-300'></div>
        {/* <DynamicBranch /> */}
      </div>

      <div className='flex items-center gap-6 px-5'>
        <Notifications numberUnRead={15} />
        <AvatarCustom
          companyName={'company'}
          username={'username'}
          firstName={'firstName'}
          lastName={'lastName'}
        />
      </div>
    </div>
  )
}

export default Header
