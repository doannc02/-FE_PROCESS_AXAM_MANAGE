import { ExamSet } from '@/service/examSet/type'
import { useFormContext } from 'react-hook-form'

export const useTableRowAllocation = (props: { index: number }) => {
  const methodForm = useFormContext<ExamSet>()
  return [{ methodForm }, {}] as const
}
