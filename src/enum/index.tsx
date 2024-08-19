import { BLUE, GREEN, RED } from '@/helper/colors'

export const subjectType = [
  { value: 'SIMPLE_PRODUCTION', label: 'Sản xuất giản đơn' }, // product
  { value: 'SALE_ORDER', label: 'Đơn hàng' }, // đơn hàng
  { value: 'CONTRACT', label: 'Hợp đồng' }, // hợp đồng
  {
    value: 'COEFFICIENTS_RATIOS_PRODUCTION',
    label: 'Sản xuất theo hệ số, tỷ lệ',
  }, // quy trình
  { value: 'STEP_STOOL_PRODUCTION', label: 'Sản xuất phân bước' }, // quy trình
]

export const salaryMethodType = [
  { value: 'PRODUCT', label: 'Lương theo sản phẩm' },
  { value: 'BASIC', label: 'Lương cơ bản' },
]

export const balanceType = [
  { value: 'EXTERNAL', label: 'Khách hàng' },
  { value: 'STAFF', label: 'Nhân viên' },
  { value: 'INTERNAL', label: 'Nội bộ' },
]

export const taxReturnActionType = [
  {
    label: 'Hoạt động sản xuất kinh doanh thông thường',
    value: 'NORMAL_PRODUCTION_AND_BUSINESS',
  },
  {
    label: 'Hoạt động thăm dò, khai thác dầu khí',
    value: 'OIL_AND_GAS_EXPLORATION_AND_EXPLOITATION_ACTIVITIES',
  },
  {
    label:
      'Dự án đầu tư cơ sở hạ tầng, nhà để chuyển nhượng khác địa bàn tỉnh nơi đóng trụ sở chính',
    value: 'INFRASTRUCTURE_INVESTMENT_PROJECTS',
  },
  {
    label: 'Nhà máy sản xuất điện khác địa bàn tỉnh nơi đóng trụ sở chính',
    value: 'POWER_PRODUCTION_PLANT',
  },
]

export const taxReturnState = [
  {
    label: 'Nháp',
    value: 'DRAFT',
    color: RED,
  },

  {
    label: 'Đã lập',
    value: 'DONE',
    color: GREEN,
  },
]

export const documentType = [
  {
    label: 'Khác',
    value: 'OTHER',
  },
  {
    label: 'Hạch toán chi phí lương',
    value: 'SALARY_COST',
  },
  {
    label: 'Hạch toán thuế TNDN',
    value: 'CORPORATE_INCOME_TAX',
  },
]

export const state = [
  {
    label: 'Nháp',
    value: 'DRAFT',
    color: RED,
  },
  {
    label: 'Chờ vào sổ',
    value: 'AWAITING_POSTED',
    color: BLUE,
  },
  {
    label: 'Đã vào sổ',
    value: 'POSTED',
    color: GREEN,
  },
]

export const accountJournalType = [
  {
    label: 'Bán hàng',
    value: 'SALE',
  },
  {
    label: 'Mua hàng',
    value: 'PURCHASE',
  },
  {
    label: 'Tiền mặt',
    value: 'CASH',
  },
  {
    label: 'Ngân hàng',
    value: 'BANK',
  },
  {
    label: 'Thông tin khác',
    value: 'GENERAL',
  },
]

export const paymentStatusEnum = [
  {
    label: 'Chưa thanh toán',
    value: 'NOT_PAYMENT',
  },
  {
    label: 'Đảo ngược',
    value: 'REVERSE',
  },
  {
    label: 'Thanh toán 1 phần',
    value: 'PARTIAL_PAYMENT',
  },
  {
    label: 'Đã thanh toán',
    value: 'PAID',
  },
]

export const inboundInvoice = [
  { label: 'Thu tiền khách hàng', value: 'PARTNER' },
  { label: 'Hoàn ứng nhân viên', value: 'STAFF' },
  { label: 'Thu khác', value: 'OTHER' },
]

export const outboundInvoice = [
  { label: 'Chi tiền nhà cung cấp', value: 'PARTNER' },
  { label: 'Trả lương cho nhân viên', value: 'STAFF' },
  { label: 'Chi khác', value: 'OTHER' },
]

export const paymentMethodSelect = [
  { label: 'Ngân hàng', value: 'BANK' },
  {
    label: 'Tiền mặt',
    value: 'CASH',
  },
]

export const partnerType = [
  { label: 'Khách hàng', value: 'CUSTOMER' },
  {
    label: 'Nhà cung cấp',
    value: 'VENDOR',
  },
  { label: 'Nội bộ', value: 'INTERNAL' },
]

export const scopeCustomerTypeSelect = [
  {
    label: 'Chứng từ bán hàng trong nước',
    value: 'DOMESTICALLY',
  },
  {
    label: 'Chứng từ bán hàng xuất khẩu',
    value: 'EXPORTED',
  },
]

export const scopeProviderTypeSelect = [
  {
    label: 'Chứng từ mua hàng trong nước',
    value: 'DOMESTICALLY',
  },
  {
    label: 'Chứng từ mua hàng quốc tế',
    value: 'EXPORTED',
  },
]

export const scopeTypeWithAllSelect = [
  {
    label: 'Mua hàng',
    value: 'PURCHASE',
  },
  {
    label: 'Bán hàng',
    value: 'SALE',
  },
  {
    label: 'Cả 2',
    value: 'ALL',
  },
]

export const invoicePrintTypeConfig = [
  {
    label: 'Hóa đơn thanh toán',
    value: 'A_INVOICE_PAYMENT',
  },
  {
    label: 'Hóa đơn hoàn tiền khách hàng',
    value: 'A_INVOICE_REFUND_CUSTOMER',
  },
  {
    label: 'Phiếu thu',
    value: 'A_RECEIPT',
  },
  {
    label: 'Phiếu chi',
    value: 'A_EXPENSE',
  },
  {
    label: 'Hóa đơn mua hàng',
    value: 'A_PURCHASE_INVOICE',
  },
  {
    label: 'Hóa đơn hoàn tiền nhà cung cấp',
    value: 'A_PROVIDER_REFUND_INVOICE',
  },
  {
    label: 'Dự trù vật tư',
    value: 'P_PROCUREMENT_OF_MATERIALS',
  },
  {
    label: 'Báo giá đơn mua',
    value: 'P_REQUEST_FOR_QUOTATION',
  },
  {
    label: 'Tổng hợp báo giá đơn mua',
    value: 'P_SUMMARY_OF_QUOTATION',
  },
  {
    label: 'Lệnh xuất hàng đơn bán',
    value: 'S_ORDERS',
  },
  {
    label: 'Báo giá đơn bán',
    value: 'S_QUOTATIONS',
  },
  {
    label: 'Đơn đặt hàng đơn bán',
    value: 'S_ORDER',
  },
  {
    label: 'Hàng hóa bị trả lại',
    value: 'S_RETURNED_GOODS_ORDER',
  },
  {
    label: 'Phiếu nhập kho cho nhân viên kho',
    value: 'W_EMPLOYEE_IMPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu nhập kho cho nhân viên bán hàng',
    value: 'W_SALE_EMPLOYEE_IMPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu xuất kho cho nhân viên kho',
    value: 'W_EMPLOYEE_EXPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu xuất kho cho nhân viên bán hàng',
    value: 'W_SALE_EXPORT_IMPORT_WAREHOUSE',
  },
  {
    label: 'Chứng từ kế toán',
    value: 'A_ACCOUNTING_DOCUMENT',
  },
]

export const taxType = [
  {
    label: 'Tăng thuế đầu vào',
    value: 'INPUT_TAX_INCREASE',
  },
  {
    label: 'Giảm thuế đầu ra',
    value: 'OUTPUT_TAX_REDUCTION ',
  },
]

export const taxTypeList = [
  {
    label: 'Thuế suất GTGT',
    value: 'VAT_RATES',
  },
  {
    label: 'Thuế TTĐB',
    value: 'SPECIAL_CONSUMPTION_TAX',
  },
  {
    label: 'Thuế TNMT',
    value: 'NATURAL_RESOURCES_TAX',
  },
  {
    label: 'Thuế xuất khẩu',
    value: 'EXPORT_TAX',
  },
]

export const taxComputeTypeSelect = [
  {
    label: 'Giá cố định',
    value: 'FIXED',
  },
  {
    label: 'Phần trăm',
    value: 'PERCENT',
  },
  // {
  //   label: 'Nhóm thuế',
  //   value: 'GROUP_OF_TAXES', // => bỏ
  // },
]

export const statusPolicyType = [
  {
    label: 'Nháp',
    value: 'DRAFT',
  },
  {
    label: 'Chờ phê duyệt',
    value: 'AWAITING',
  },
  {
    label: 'Đã duyệt',
    value: 'APPROVE',
  },
  {
    label: 'Từ chối',
    value: 'REJECT',
  },
]

export const periodType = [
  {
    label: 'Tháng',
    value: 'MONTH',
  },
  {
    label: 'Quý',
    value: 'QUARTERLY',
  },
  {
    label: 'Năm',
    value: 'YEAR',
  },
]

export const timeType = [
  {
    label: 'Ngày',
    value: 'DAYS',
  },
  {
    label: 'Tháng',
    value: 'MONTH',
  },
  {
    label: 'Năm',
    value: 'YEAR',
  },
]

export const statusType = [
  { label: 'Nháp', value: 'DRAFT' },
  { label: 'Chờ phê duyệt', value: 'PENDING_APPROVAL' },
  { label: 'Sắp diễn ra', value: 'UPCOMING' },
  { label: 'Đang diễn ra', value: 'EFFECTIVE' },
  { label: 'Lưu trữ', value: 'ARCHIVED' },
]

export const warehouseType = [
  { label: 'Nội bộ', value: 'INTERNAL' },
  { label: 'Kho thành phẩm', value: 'SALE' },
  { label: 'Nhà máy', value: 'FACTORY' },
]

export const scopeType = [
  { label: 'Mua hàng trong nước nhập kho', value: 'DOMESTIC_WAREHOUSE' },
  {
    label: 'Mua hàng trong nước không qua kho',
    value: 'DOMESTIC_WITHOUT_WAREHOUSE',
  },
  { label: 'Mua hàng nhập khẩu nhập kho', value: 'IMPORTED_WAREHOUSE' },
  {
    label: 'Mua hàng nhập khẩu không qua kho',
    value: 'IMPORTED_WITHOUT_WAREHOUSE',
  },
]

export const activeType = [
  {
    value: true,
    label: 'Active',
  },
  {
    value: false,
    label: 'InActive',
  },
]

export const displayWarehouse = {
  INTERNAL: 'Nội bộ',
  FACTORY: 'Nhà máy',
  SALE: 'Kho thành phẩm',
}

export const InvoiceNumberFormType = [
  { value: 'ELECTRONIC_BILL', label: 'Hóa đơn giá trị gia tăng (HĐ điện tử)' },
  { value: 'VAT_BILL', label: 'Hóa đơn giá trị gia tăng' },
  { value: 'SALE_BILL', label: 'Hóa đơn bán hàng (HĐ điện tử)' },
]

export const optionReason = [
  { value: 'SALES_LIQUIDATION', label: 'Nhượng bán, thanh lý' },
  {
    value: 'CONTRIBUTE_CAPITAL_WITH_FIXED_ASSETS',
    label: 'Góp vốn bằng tài sản cố định',
  },
  { value: 'MISSING_WHEN_INVENTORYING', label: 'Thiếu khi kiểm kê' },
]

export const displayReasonDescToolsAsset = {
  SALES_LIQUIDATION: 'Nhượng bán, thanh lý',
  CONTRIBUTE_CAPITAL_WITH_FIXED_ASSETS: 'Góp vốn bằng tài sản cố định',
  MISSING_WHEN_INVENTORYING: 'Thiếu khi kiểm kê',
}

export const commonCostAllocationMethod = [
  {
    label: 'Định mức NVL trực tiếp',
    value: 'BOM',
  },
  {
    label: 'Định mức nhân công trực tiếp',
    value: 'LABOR',
  },
  {
    label: 'Số lượng TP/BTP hoàn thành',
    value: 'COMPLETE_QTY_PRODUCT',
  },
]

export const methodCalculatingCost = [
  {
    label: 'Hệ số, tỷ lệ',
    value: 'RATIO',
  },
  {
    label: 'Số lượng TP/BTP hoàn thành',
    value: 'COMPLETE_QTY_PRODUCT',
  },
]

export const displayTitleHis = {
  OUT_INVOICE: 'Bán hàng',
  OUT_REFUND: 'Trả hàng',
  IN_INVOICE: 'Mua hàng',
  IN_REFUND: 'Trả hàng',
}

export const displayThuChi = {
  OUT_INVOICE: 'Thu tiền',
  OUT_REFUND: 'Chi tiền',
  IN_INVOICE: 'Chi tiền',
  IN_REFUND: 'Thu tiền',
}

export const pricingConfig = [
  { label: 'FIFO', value: 'FIFO' },
  { label: 'LIFO', value: 'LIFO' },
  { label: 'Bình quân gia quyền', value: 'AVERAGE' },
]

export const stateInventory = {
  WAITING: 'Chờ xử lý',
  DONE: 'Hoàn thành',
  REJECTED: 'Bị huỷ',
  DONE_PART: 'Xuất 1 phần',
}

export const typeDebtReceivable = {
  EXTERNAL: 'Tổng hợp',
  INTERNAL: 'Nội bộ',
  STAFF: 'Nhân viên',
  BANK: 'Khách hàng',
}
