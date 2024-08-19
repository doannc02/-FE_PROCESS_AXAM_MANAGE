import { BaseResponse, PageResponse } from "@/service/type"
import { ReqSalaryTemplateAction } from "../get/type"


export type ResponseSalaryTemplateAll = PageResponse<ReqSalaryTemplateAction[]>
export type ResDetailSalaryTemplate = BaseResponse<{ id: number }>