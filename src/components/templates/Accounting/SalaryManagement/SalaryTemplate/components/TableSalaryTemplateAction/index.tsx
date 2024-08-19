import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI";
import { getAllSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/get";
import { getAllSalaryGroup } from "@/service/accounting/mangementSalaryTable/SalaryGroup/get";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import SalaryTemplateColumns from "../SalaryTemplateColumns";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { TRANSLATE } from "@/routes";
type Props = {
    item: any
    index: number
    isAllowDelete: boolean
    isUpdate: boolean
}
export default function TableSalaryTemplateAction({ item, index, isAllowDelete, isUpdate }: Props) {

    const methods = useFormContext()
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const { control, setValue, watch } = methods
    const router = useRouter()
    const isView = router.query.actionType === "VIEW"

    const changeGroupSalaryType = useCallback((groupColumnType: string) => {
        if (groupColumnType === "DEFAULT") {
            return "Mặc định"
        }
        else if (groupColumnType === "PLUS") {
            return "Khoản cộng"
        }
        else if (groupColumnType === "MINUS") {
            return "Khoản trừ"
        } else {
            return ""
        }
    }, [])

    return <>
        {item.salaryColumn ? <CoreAutoCompleteAPI
            name={`salaryTemplateColumns.${index}.salaryColumn`}
            control={control}
            label="Cột lương"
            labelPath="code"
            valuePath="id"
            placeholder="Mã cột lương"
            fetchDataFn={getAllSalaryColumn}
            isViewProp={isView ? true : isUpdate ? isAllowDelete !== false ? false : true : isAllowDelete === false ? true : false}
            onChangeValue={(val) => {
                if (val) {
                    setValue(`salaryTemplateColumns.${index}.salaryColumn.name`, val?.name)
                } else {
                    setValue(`salaryTemplateColumns.${index}.salaryColumn.name`, null)
                }
            }}
            rules={{
                required: t("common:validation.required")
            }}
            required
        /> : item.groupSalaryColumn ?
            <div className="flex flex-col">
                <div className="flex justify-between gap-40">
                    <div className="flex-1">
                        <CoreAutoCompleteAPI
                            name={`salaryTemplateColumns.${index}.groupSalaryColumn`}
                            control={control}
                            label="Nhóm cột lương"
                            labelPath="name"
                            valuePath="id"
                            placeholder="Chọn nhóm cột lương"
                            fetchDataFn={getAllSalaryGroup}
                            onChangeValue={(val) => {
                                if (val) {
                                    setValue(`salaryTemplateColumns.${index}.groupSalaryColumn.groupColumnType`, val?.groupColumnType)
                                }
                                setValue(`salaryTemplateColumns.${index}.groupSalaryColumnItems`, val?.salaryColumns)
                            }}
                            rules={{
                                required: t("common:validation.required")
                            }}
                            required
                        />
                    </div>
                    {watch(`salaryTemplateColumns.${index}.groupSalaryColumn.groupColumnType`) &&
                        <div>
                            <label className="text-[9px] text-[#00000099]">Loại nhóm cột lương</label>
                            <p>{changeGroupSalaryType(watch(`salaryTemplateColumns.${index}.groupSalaryColumn.groupColumnType`))}</p>
                        </div>
                    }
                </div>
                {(watch(`salaryTemplateColumns.${index}.groupSalaryColumnItems`) ?? []).length > 0 &&
                    <SalaryTemplateColumns router={router} index={index} />
                }
            </div>
            :
            item.code}
    </>
}
