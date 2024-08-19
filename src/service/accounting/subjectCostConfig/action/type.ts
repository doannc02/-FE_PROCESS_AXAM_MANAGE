import { CommonObject } from '@/service/type'
import { Root2 } from '../get/type'

export type SaveSubjectCost = {
  subjectType?: string | null
  process: CommonObject | null
  data: Root2[]
}
