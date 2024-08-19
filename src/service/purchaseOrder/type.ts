import { ItemInGroupPro } from "../asset/getGroupProduct/type"
import { PageResponse } from "../type"

  
  export type Response = {
    GET: PageResponse<ItemInGroupPro[]>
  }
  
  export type Params = {
    GET: {
      lineIds?: number[]
      start: string
      end: string
    }
  }
  