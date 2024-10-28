import { useAppSelector } from '@/redux/hook'

const useGeneral = () => {
  const email = useAppSelector((state) => state.userData.email)
  return [{ email }, {}] as const
}

export default useGeneral
