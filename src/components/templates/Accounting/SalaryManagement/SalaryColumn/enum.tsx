export const paramsType = ["MANUAL", "SYSTEM"]
const columnType = ["PLUS", "MINUS"]
const incomeType = ["TAX", "NON_TAX"]

type Kind = "params_Type" | "column_Type" | "income_Type"
let data = [] as any[]
const typeEnum = (kind: Kind, t: any, type?: string) => {
    if (type) {
        if (kind === "income_Type") {
            data = incomeType
        }
        else if (kind === "params_Type") {
            data = paramsType
            return data.map(item => {
                return {
                    label: t(`management_salary.child.salary_column.${kind}.${item}`),
                    value: item
                }
            })
        }
        return data.map(item => {
            return {
                label: t(`management_salary.child.salary_column.${kind}.${type}.${item}`),
                value: item
            }
        })
    } else {
        if (kind === "column_Type") {
            data = columnType
            return data.map(item => {
                return {
                    label: t(`management_salary.child.salary_column.${kind}.${item}`),
                    value: item
                }
            })
        }
        else {
            return []
        }
    }

}

export default typeEnum