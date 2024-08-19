import { IncreaseTool, IncreaseToolHandMade } from '../../getDetail/getIncrease/type'

export type RequestBody = {
  SAVE: IncreaseToolHandMade
  PURCHASE: {
    params: {
      start: string
      end: string
      startOffset?: string
      endOffset?: string
    }
    requestBody: IncreaseTool['increaseTool']
  }
}
