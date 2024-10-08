import { useFormContext } from 'react-hook-form'

export const useTableRowAllocation = (props: { index: number }) => {
  const methodForm = useFormContext<any>()
  return [{ methodForm }, {}] as const
}
