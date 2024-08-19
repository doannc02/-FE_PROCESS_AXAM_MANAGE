import { IncreaseTool } from '../../../increaseTools/getDetail/getIncrease/type'
import { IncreaseAssetHandMade } from '../../getDetail/getDetailEscAsset/type'

export type RequestBody = {
  SAVE: IncreaseAssetHandMade
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
