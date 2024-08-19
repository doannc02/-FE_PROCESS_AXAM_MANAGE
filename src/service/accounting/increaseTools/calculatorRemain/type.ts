import { BaseResponse, PageResponse } from '@/service/type'
import { calculatorIncreaseTool } from '../calculatorIncreaseTool/type'
import { LineDecreasedTool } from '../getDetail/getDecrease/type'

export type RequestParams = {
  GET: {
    lines: LineDecreasedTool[]
    decreaseDate?: string
  }
}

export type Response = {
  GET: {
    data: LineDecreasedTool[]
  }
}
