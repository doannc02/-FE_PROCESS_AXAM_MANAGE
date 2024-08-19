import { postGenerateTaxOtherDocument } from '@/service/accounting/otherDocument/generateTax'
import { CommonObject } from '@/service/type'

export const computeTaxUntil = async (
  amountUntaxed: number,
  tax: CommonObject,
  taxType: string
) => {
  if (amountUntaxed && tax?.id && taxType) {
    const res = await postGenerateTaxOtherDocument([
      { amountUntaxed, taxId: tax?.id, taxType },
    ])

    if (res && Array.isArray(res.data)) {
      const [value] = res.data
      return value?.taxAmount
    }

    return 0
  }

  return 0
}
