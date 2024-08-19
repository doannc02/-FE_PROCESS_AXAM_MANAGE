import Moving from '@/assets/svg/Moving.svg'
import Bank from '@/assets/svg/bank.svg'
import Cash from '@/assets/svg/cash.svg'
import Debt from '@/assets/svg/debt.svg'
import Pen from '@/assets/svg/pen.svg'
import Setting from '@/assets/svg/setting.svg'
import Surplus from '@/assets/svg/surplus.svg'
import Warehouse from '@/assets/svg/warehouse.svg'

import {
  Dashboard,
  ImportContacts,
  PriceChangeSharp,
  TaxiAlertTwoTone,
} from '@mui/icons-material'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'

export interface MenuPathProps {
  name: string
  path: string
  icon?: ReactNode
  isChecked?: boolean
  children?: MenuPathProps[]
  subMenu?: MenuPathProps[]
}

export const ACCOUNTING = 'accounting'

export const TRANSLATE = {
  COMMON: 'common',
  TAX: `${ACCOUNTING}/tax`,
  BANK_CASH_ACCOUNT: `${ACCOUNTING}/bank-cash-account`,
  ACCOUNT_INVOICE: `${ACCOUNTING}/account-invoice`,
  ACCOUNT_HISTORY: `${ACCOUNTING}/account-history`,
  BANK_CASH_REPORT: `${ACCOUNTING}/bank-cash-report`,
  OTHER_DOCUMENT: `${ACCOUNTING}/other-document`,
  TAX_RETURN: `${ACCOUNTING}/tax-return`,
  WARE_HOUSE: `${ACCOUNTING}/ware-house`,
  THCP: `${ACCOUNTING}/thcp`,
  SALARY_MANAGEMENT: `${ACCOUNTING}/salary-management`
}

const OEM_URL = `/saleOrder/oem`
const B2B_URL = `/saleOrder/b2b`
const B2C_URL = `/saleOrder/b2c`
const MERCHANT_URL = `/saleOrder/merchant`
const LIQUIDATION_URL = `/saleOrder/liquidation`
const ASSET_ESC_URL = `/fixedAssets/esc`
const ASSET_DESC_URL = `/fixedAssets/desc`
const ASSET_CATEGORY = '/fixedAssets/categoryAsset'
const TOOL_CATEGORY = '/tool/categoryAsset'
const TOOL_ESC_URL = '/tool/esc'
const TOOL_DESC_URL = '/tool/desc'
const TOOL_MONITOR = '/tool/monitoring'
const ASSET_MONITOR = '/fixedAssets/monitoring'
const GENERAL_ACC = '/generalAcc'
const OPEN_BOOK = '/generalAcc/openBook'
const LOCKUP_BOOK = '/generalAcc/lockUpBook'
const OTHER_DOC = '/generalAcc/otherDocument'
const WARE_HOUSE_SALE = '/warehouse/sale'
const WARE_HOUSE_INTERNAL = '/warehouse/internal'
const WARE_HOUSE_FACTORY = '/warehouse/factory'
const PAYROLL_MANAGEMENT = "/salaryManagement"

export const MENU_URL = {
  CUSTOMER: {
    INVOICE: {
      NORMAL: {
        ALL: '/customer/customerInvoice/normal',
        INTERNAL: '/customer/customerInvoice/normal/internal/all',
        EXTERNAL: '/customer/customerInvoice/normal',
        MERCHANT: '/customer/customerInvoice/normal/merchant',
        B2C: '/customer/customerInvoice/normal/b2c',
        B2B: '/customer/customerInvoice/normal/b2b',
        OEM: '/customer/customerInvoice/normal/oem',
        LIQUIDATION: '/customer/customerInvoice/normal/liquidation',
        CLEARANCE: '/customer/customerInvoice/normal/liquidation',
      },
    },
    REFUND: {
      NORMAL: {
        INTERNAL: '/customer/customerRefund/normal/internal/all',
        EXTERNAL: '/customer/customerRefund/normal/all',
        MERCHANT: '/customer/customerRefund/normal/merchant',
        B2C: '/customer/customerRefund/normal/b2c',
        B2B: '/customer/customerRefund/normal/b2b',
        OEM: '/customer/customerRefund/normal/oem',
        LIQUIDATION: '/customer/customerRefund/normal/liquidation',
        CLEARANCE: '/customer/customerRefund/normal/liquidation',
      },
      // : {
      //   EXTERNAL: '',
      //   INTERNAL: '/customer/customerRefund/internal/all',
      //   MERCHANT: '/customer/customerRefund/internal/merchant',
      //   B2C: '/customer/customerRefund/internal/b2c',
      //   B2B: '/customer/customerRefund/internal/b2b',
      //   OEM: '/customer/customerRefund/internal/oem',
      //   LIQUIDATION: '/customer/customerRefund/internal/liquidation',
      //   CLEARANCE: '/customer/customerRefund/internal/liquidation',
      // },
    },
    PAYMENT_TERM: '/customer/paymentTerm',
    POLICY: '/customer/policy',
    APPROVE_POLICY: '/customer/approve',
  },
  PROVIDER: {
    INVOICE: '/provider/providerInvoice',
    REFUND: '/provider/providerRefund',
    PAYMENT_TERM: '/provider/paymentTerm',
  },
  GENERAL_ACC: {
    OPEN_BOOK: OPEN_BOOK,
    LOCKUP_BOOK: LOCKUP_BOOK,
    OTHER_DOC: OTHER_DOC,
  },
  BANK_ACCOUNT: {
    INBOUND: '/bankAccount/inbound',
    OUTBOUND: '/bankAccount/outbound',
    REPORT: '/bankAccount/bankReport',
  },
  CASH_ACCOUNT: {
    INBOUND: '/cashAccount/inbound',
    OUTBOUND: '/cashAccount/outbound',
    REPORT: '/cashAccount/cashReport',
  },
  OTHER_DOCUMENT: '/otherDocument',
  CASH_REPORT: '/cashReport',
  ENTRY: {
    ENTRY_INVOICE: '/entry/entryInvoice',
    ENTRY_LIST: '/entry/entryList',
  },
  DEBT: {
    PAYABLE: '/debt/payable',
    RECEIVABLE: '/debt/receivable',
    INVOICE: '/debt/invoice',
  },
  BALANCE: {
    ACCOUNT_BALANCE: '/balance/accountBalance',
    BANK_BALANCE: '/balance/bankBalance',
    CUSTOMER: '/balance/customer',
    PROVIDER: '/balance/provider',
  },
  BILLS: {
    OEM: {
      SALE_ORDER: `${OEM_URL}/orderManagement`,
      BACK_SALE_ORDER: `${OEM_URL}/backPurchaseOrderManagement`,
      ORDER_EXCEED_DEBT: `${OEM_URL}/orderExceedDebt`,
      TRACKING: `${OEM_URL}/trackingOrder`,
    },
    MERCHANT: {
      SALE_ORDER: `${MERCHANT_URL}/orderManagement`,
      BACK_SALE_ORDER: `${MERCHANT_URL}/backPurchaseOrderManagement`,
      ORDER_EXCEED_DEBT: `${MERCHANT_URL}/orderExceedDebt`,
      TRACKING: `${MERCHANT_URL}/trackingOrder`,
    },
    CLEARANCE: {
      SALE_ORDER: `${LIQUIDATION_URL}/orderManagement`,
      LIQUIDATION_ORDER: `${LIQUIDATION_URL}/liquidationOrder`,
      ORDER_EXCEED_DEBT: `${LIQUIDATION_URL}/orderExceedDebt`,
      BACK_SALE_ORDER: `#`,
      BACK_SALE_ORDER_APPROVAL: '#',
      PARTNER_TAG: '#',
      CUSTOMER: '#',
    },
    B2C: {
      SALE_ORDER: `${B2C_URL}/orderManagement`,
      BACK_SALE_ORDER: `${B2C_URL}/backPurchaseOrderManagement`,
      ORDER_EXCEED_DEBT: `${B2C_URL}/orderExceedDebt`,
      TRACKING: `${B2C_URL}/trackingOrder`,
    },
    B2B: {
      SALE_ORDER: `${B2B_URL}/orderManagement`,
      BACK_SALE_ORDER: `${B2B_URL}/backPurchaseOrderManagement`,
      ORDER_EXCEED_DEBT: `${B2B_URL}/orderExceedDebt`,
      TRACKING: `${B2B_URL}/trackingOrder`,
    },
  },
  TAX_RETURN: '/taxReturn',
  TAX_RETURN_CONFIG: '/configTaxReturn',
  COST: {
    THCP: '/cost/thcp',
    BOM_COST_MANAGE: {
      BOM_COST_GENERAL: '/cost/manageCost/bomCostManage',
      MANAGE_MATERIAL_COST_INPUT: '/cost/manageCost/manageMaterialCost',
      LABOR_COST_INPUT: '/cost/manageCost/laborCostManage',
      GENERAL_PRICE_LIST: '/cost/manageCost/bomPrice',
    },
    UNFINISHED_COST: '/cost/unfinishedCost',
  },
  CONFIG: {
    CASH_ROUNDING: '/config/cashRounding',
    ACCOUNT_CONFIG: '/config/accountConfig',
    PRINT: '/config/print',
    INVOICE: {
      PAYMENT_TERM: '/config/invoice/paymentTerm',
    },
    ACCOUNTING: {
      SYSTEM: '/config/account/accountSystemConfig',
      ACCOUNT_JOURNAL: '/config/account/accountJournal',
      TAX: '/config/account/tax',
      ACCOUNT_TAG: '/config/account/accountTag',
      ACCOUNT_TYPE: '/config/account/accountType',
      LEDGER: '/config/ledger',
    },
  },
  ASSET: {
    ESC: ASSET_ESC_URL,
    DESC: ASSET_DESC_URL,
    CATEGORY: ASSET_CATEGORY,
    MONITOR: ASSET_MONITOR,
  },
  TOOL: {
    ESC: TOOL_ESC_URL,
    DESC: TOOL_DESC_URL,
    CATEGORY: TOOL_CATEGORY,
    MONITOR: TOOL_MONITOR,
  },
  WARE_HOUSE: {
    SALE: {
      MANAGEMENT: `${WARE_HOUSE_SALE}/warehouseManagement`,
      IMPORT_WAREHOUSE: {
        STOCK_PICKING_REQUEST: `${WARE_HOUSE_SALE}/importWarehouse/stockPickingRequest`,
        STOCK_PICKING_LIST: `${WARE_HOUSE_SALE}/importWarehouse/stockPickingList`,
      },
      EXPORT_WAREHOUSE: {
        STOCK_PICKING_LIST: `${WARE_HOUSE_SALE}/exportWarehouse/stockPickingList`,
        FACTORY_WAREHOUSE: `${WARE_HOUSE_SALE}/exportWarehouse/factoryWarehouse`,
      },
      INVENTORY_WAREHOUSE: {
        INVENTORY_FIRST_PERIOD: `${WARE_HOUSE_SALE}/inventoryWarehouse/inventoryFirstPeriod`,
        DEPARTMENT: {
          VIEW_BY_WAREHOUSE: `${WARE_HOUSE_SALE}/inventoryWarehouse/saleDepartment/inventoryByWarehouse`,
          VIEW_BY_PRODUCT_TEMPLATE: `${WARE_HOUSE_SALE}/inventoryWarehouse/saleDepartment/inventoryByProductTemplate`,
          VIEW_BY_VARIANTS: `${WARE_HOUSE_SALE}/inventoryWarehouse/saleDepartment/inventoryByVariants`,
        },
      },
      PRICING_CONFIG: `${WARE_HOUSE_SALE}/pricingConfig`,
    },
    FACTORY: {
      MANAGEMENT: `${WARE_HOUSE_FACTORY}/warehouseManagement`,
      IMPORT_WAREHOUSE: {
        STOCK_PICKING_REQUEST: `${WARE_HOUSE_FACTORY}/importWarehouse/stockPickingRequest`,
        STOCK_PICKING_LIST: `${WARE_HOUSE_FACTORY}/importWarehouse/stockPickingList`,
      },
      EXPORT_WAREHOUSE: {
        STOCK_PICKING_LIST: `${WARE_HOUSE_FACTORY}/exportWarehouse/stockPickingList`,
        FACTORY_WAREHOUSE: `${WARE_HOUSE_FACTORY}/exportWarehouse/factoryWarehouse`,
      },
      INVENTORY_WAREHOUSE: {
        INVENTORY_FIRST_PERIOD: `${WARE_HOUSE_FACTORY}/inventoryWarehouse/inventoryFirstPeriod`,
        DEPARTMENT: {
          VIEW_BY_WAREHOUSE: `${WARE_HOUSE_FACTORY}/inventoryWarehouse/saleDepartment/inventoryByWarehouse`,
          VIEW_BY_PRODUCT_TEMPLATE: `${WARE_HOUSE_FACTORY}/inventoryWarehouse/saleDepartment/inventoryByProductTemplate`,
          VIEW_BY_VARIANTS: `${WARE_HOUSE_FACTORY}/inventoryWarehouse/saleDepartment/inventoryByVariants`,
        },
      },
      PRICING_CONFIG: `${WARE_HOUSE_FACTORY}/pricingConfig`,
    },
    INTERNAL: {
      MANAGEMENT: `${WARE_HOUSE_INTERNAL}/warehouseManagement`,
      IMPORT_WAREHOUSE: {
        STOCK_PICKING_REQUEST: `${WARE_HOUSE_INTERNAL}/importWarehouse/stockPickingRequest`,
        STOCK_PICKING_LIST: `${WARE_HOUSE_INTERNAL}/importWarehouse/stockPickingList`,
      },
      EXPORT_WAREHOUSE: {
        STOCK_PICKING_LIST: `${WARE_HOUSE_INTERNAL}/exportWarehouse/stockPickingList`,
        FACTORY_WAREHOUSE: `${WARE_HOUSE_INTERNAL}/exportWarehouse/factoryWarehouse`,
      },
      INVENTORY_WAREHOUSE: {
        INVENTORY_FIRST_PERIOD: `${WARE_HOUSE_INTERNAL}/inventoryWarehouse/inventoryFirstPeriod`,
        DEPARTMENT: {
          VIEW_BY_WAREHOUSE: `${WARE_HOUSE_INTERNAL}/inventoryWarehouse/saleDepartment/inventoryByWarehouse`,
          VIEW_BY_PRODUCT_TEMPLATE: `${WARE_HOUSE_INTERNAL}/inventoryWarehouse/saleDepartment/inventoryByProductTemplate`,
          VIEW_BY_VARIANTS: `${WARE_HOUSE_INTERNAL}/inventoryWarehouse/saleDepartment/inventoryByVariants`,
        },
      },
      PRICING_CONFIG: `${WARE_HOUSE_INTERNAL}/pricingConfig`,
    },
  },
  PAYROLL_MANAGEMENT: {
    SALARY_GROUP: `${PAYROLL_MANAGEMENT}/salaryGroup`,
    SALARY_COLUMN: `${PAYROLL_MANAGEMENT}/salaryColumn`,
    SALARY_TEMPLATE: `${PAYROLL_MANAGEMENT}/salaryTemplate`,
    SALARY_TABLE: `${PAYROLL_MANAGEMENT}/salaryTable`,


  }
}

export const listMenuRoutes: MenuPathProps[] = [
  {
    name: 'Trang chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Kế toán bán hàng',
    path: '/customer/',
    icon: (
      <IconButton>
        <Image alt='' width={20} height={20} src={Moving} />
      </IconButton>
    ),
    subMenu: [
      {
        name: 'Bán hàng',
        path: `${MENU_URL.CUSTOMER.INVOICE.NORMAL.ALL}`,
        isChecked: true,
        children: [
          {
            name: 'Merchant',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.MERCHANT,
          },
          {
            name: 'B2C',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.B2C,
          },
          {
            name: 'B2B',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.B2B,
          },
          {
            name: 'OEM',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.OEM,
          },
          {
            name: 'Thanh lý',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.LIQUIDATION,
          },
          {
            name: 'Nội bộ',
            path: MENU_URL.CUSTOMER.INVOICE.NORMAL.INTERNAL,
          },
        ],
      },
      {
        name: 'Trả hàng',
        path: `${MENU_URL.CUSTOMER.REFUND.NORMAL.EXTERNAL}`,
        isChecked: true,
        children: [
          {
            name: 'Merchant',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.MERCHANT,
          },
          {
            name: 'B2C',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.B2C,
          },
          {
            name: 'B2B',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.B2B,
          },
          {
            name: 'OEM',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.OEM,
          },
          {
            name: 'Thanh lý',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.LIQUIDATION,
          },
          {
            name: 'Nội bộ',
            path: MENU_URL.CUSTOMER.REFUND.NORMAL.INTERNAL,
          },
          {
            name: 'Đơn hàng',
            path: '/saleOrder',
            children: [
              {
                name: 'Đơn bán hàng Merchant',
                path: `${MERCHANT_URL}`,
                children: [
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.MERCHANT.SALE_ORDER,
                  },
                ],
              },
              {
                name: 'Đơn bán hàng (B2B)',
                path: `${B2B_URL}`,
                children: [
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.B2B.SALE_ORDER,
                  },
                ],
              },
              {
                name: 'Đơn bán hàng (B2C)',
                path: `${B2C_URL}`,
                children: [
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.B2C.SALE_ORDER,
                  },
                ],
              },

              {
                name: 'Đơn bán hàng đặt (OEM)',
                path: `${OEM_URL}`,
                children: [
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.OEM.SALE_ORDER,
                  },
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.OEM.SALE_ORDER,
                  },
                ],
              },
              {
                name: 'Đơn thanh lý',
                path: `${LIQUIDATION_URL}`,
                children: [
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.CLEARANCE.SALE_ORDER,
                  },
                  {
                    name: 'Quản lý đơn bán',
                    path: MENU_URL.BILLS.CLEARANCE.SALE_ORDER,
                  },
                ],
              },
            ],
          },
          {
            name: 'Điều khoản thanh toán',
            path: MENU_URL.CUSTOMER.PAYMENT_TERM,
          },
        ],
      },
    ],
  },

  {
    name: 'Kế toán mua hàng',
    path: 'accounting/provider',
    icon: (
      <IconButton>
        <ImportContacts></ImportContacts>
      </IconButton>
    ),
    subMenu: [
      {
        name: 'Mua hàng',
        path: MENU_URL.PROVIDER.INVOICE,
      },
      {
        name: 'Trả hàng',
        path: MENU_URL.PROVIDER.REFUND,
      },
      {
        name: 'Điều khoản thanh toán',
        path: MENU_URL.PROVIDER.PAYMENT_TERM,
      },
    ],
  },

  {
    name: 'Kế toán ngân hàng',
    path: '/bankAccount',
    icon: <Image alt='' width={23} height={23} src={Bank} />,
    children: [
      {
        name: 'Thu tiền',
        path: MENU_URL.BANK_ACCOUNT.INBOUND,
      },
      {
        name: 'Chi tiền',
        path: MENU_URL.BANK_ACCOUNT.OUTBOUND,
      },
      {
        name: 'Báo cáo',
        path: MENU_URL.BANK_ACCOUNT.REPORT,
      },
    ],
  },
  {
    name: 'Kế toán tiền mặt',
    path: MENU_URL.OTHER_DOCUMENT,
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Cash} />
      </IconButton>
    ),
    children: [
      {
        name: 'Thu tiền',
        path: MENU_URL.CASH_ACCOUNT.INBOUND,
      },
      {
        name: 'Chi tiền',
        path: MENU_URL.CASH_ACCOUNT.OUTBOUND,
      },
      {
        name: 'Báo cáo',
        path: MENU_URL.CASH_ACCOUNT.REPORT,
      },
    ],
  },
  {
    name: 'Kế toán tổng hợp',
    path: GENERAL_ACC,
    icon: (
      <IconButton>
        <LockOpenIcon fontSize='small' />
      </IconButton>
    ),
    children: [
      {
        name: 'Khóa sổ kế toán',
        path: MENU_URL.GENERAL_ACC.LOCKUP_BOOK,
      },
      {
        name: 'Chứng từ khác',
        path: MENU_URL.GENERAL_ACC.OTHER_DOC,
      },
    ],
  },

  {
    name: 'Số dư ban đầu',
    path: '/balance',
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Surplus} />
      </IconButton>
    ),
    children: [
      {
        name: 'Số dư tài khoản',
        path: MENU_URL.BALANCE.ACCOUNT_BALANCE,
      },
      {
        name: 'Số dư TK ngân hàng',
        path: MENU_URL.BALANCE.BANK_BALANCE,
      },
      {
        name: 'Số dư công nợ KH',
        path: MENU_URL.BALANCE.CUSTOMER,
      },
      {
        name: 'Số dư công nợ NCC',
        path: MENU_URL.BALANCE.PROVIDER,
      },
    ],
  },
  {
    name: 'Công nợ',
    path: '/debt',
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Debt} />
      </IconButton>
    ),
    children: [
      {
        name: 'Công nợ phải thu',
        path: MENU_URL.DEBT.RECEIVABLE,
      },
      {
        name: 'Công nợ phải trả',
        path: MENU_URL.DEBT.PAYABLE,
      },
    ],
  },

  {
    name: 'Bút toán',
    path: '/entry',
    icon: (
      <IconButton>
        <Image alt='' width={20} height={20} src={Pen} />
      </IconButton>
    ),
    children: [
      {
        name: 'Bút toán phát sinh',
        path: MENU_URL.ENTRY.ENTRY_INVOICE,
      },
      {
        name: 'Đối soát bút toán',
        path: MENU_URL.ENTRY.ENTRY_LIST,
      },
    ],
  },

  {
    name: 'Tài sản cố định',
    path: '/fixedAssets',
    icon: <Inventory2Icon fontSize='small' />,
    children: [
      {
        name: 'Danh mục TSCD',
        path: MENU_URL.ASSET.CATEGORY,
      },
      {
        name: 'Ghi tăng',
        path: MENU_URL.ASSET.ESC,
      },

      {
        name: 'Ghi giảm',
        path: MENU_URL.ASSET.DESC,
      },
      {
        name: 'Theo dõi khấu hao',
        path: MENU_URL.ASSET.MONITOR,
      },
    ],
  },
  {
    name: 'Công cụ dụng cụ',
    path: '/tool/handMade',
    icon: <ConstructionOutlinedIcon fontSize='small' />,
    children: [
      {
        name: 'Danh mục CCDC',
        path: MENU_URL.TOOL.CATEGORY,
      },
      {
        name: 'Ghi tăng',
        path: MENU_URL.TOOL.ESC,
      },
      {
        name: 'Ghi giảm',
        path: MENU_URL.TOOL.DESC,
      },
      {
        name: 'Theo dõi phân bổ',
        path: MENU_URL.TOOL.MONITOR,
      },
    ],
  },
  {
    name: 'Kế toán kho',
    path: '/warehouse',
    icon: (
      <IconButton>
        <Image alt='' width={20} height={20} src={Warehouse} />
      </IconButton>
    ),
    subMenu: [
      {
        name: 'Kho thành phẩm',
        path: '/warehouse/sale',
        subMenu: [
          {
            name: 'Quản lý kho',
            path: MENU_URL.WARE_HOUSE.SALE.MANAGEMENT,
          },
          {
            name: 'Nhập kho',
            path: '/warehouse/sale/importWarehouse',
            children: [
              {
                name: 'Yêu cầu nhập kho',
                path: MENU_URL.WARE_HOUSE.SALE.IMPORT_WAREHOUSE
                  .STOCK_PICKING_REQUEST,
              },
              {
                name: 'Phiếu nhập kho',
                path: MENU_URL.WARE_HOUSE.SALE.IMPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
            ],
          },
          {
            name: 'Xuất kho',
            path: '/warehouse/sale/exportWarehouse',
            children: [
              {
                name: 'Yêu cầu xuất kho',
                path: MENU_URL.WARE_HOUSE.SALE.EXPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
              {
                name: 'Phiếu xuất kho',
                path: MENU_URL.WARE_HOUSE.SALE.EXPORT_WAREHOUSE
                  .FACTORY_WAREHOUSE,
              },
            ],
          },
          {
            name: 'Tồn kho',
            path: '/warehouse/sale/inventoryWarehouse',
            children: [
              {
                name: 'Tồn kho đầu kỳ',
                path: MENU_URL.WARE_HOUSE.SALE.INVENTORY_WAREHOUSE
                  .INVENTORY_FIRST_PERIOD,
              },
              {
                name: 'Tồn kho (Theo kho)',
                path: MENU_URL.WARE_HOUSE.SALE.INVENTORY_WAREHOUSE.DEPARTMENT
                  .VIEW_BY_WAREHOUSE,
              },
              {
                name: 'Tồn kho (Theo sản phẩm)',
                path: MENU_URL.WARE_HOUSE.SALE.INVENTORY_WAREHOUSE.DEPARTMENT
                  .VIEW_BY_PRODUCT_TEMPLATE,
              },
            ],
          },
          {
            name: 'PP tính giá xuất kho',
            path: MENU_URL.WARE_HOUSE.SALE.PRICING_CONFIG,
          },
        ],
      },
      {
        name: 'Kho nguyên vật liệu',
        path: '/warehouse/internal',
        subMenu: [
          {
            name: 'Quản lý kho',
            path: MENU_URL.WARE_HOUSE.INTERNAL.MANAGEMENT,
          },
          {
            name: 'Nhập kho',
            path: '/warehouse/internal/importWarehouse',
            children: [
              {
                name: 'Yêu cầu nhập kho',
                path: MENU_URL.WARE_HOUSE.INTERNAL.IMPORT_WAREHOUSE
                  .STOCK_PICKING_REQUEST,
              },
              {
                name: 'Phiếu nhập kho',
                path: MENU_URL.WARE_HOUSE.INTERNAL.IMPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
            ],
          },
          {
            name: 'Xuất kho',
            path: '/warehouse/internal/exportWarehouse',
            children: [
              {
                name: 'Yêu cầu xuất kho',
                path: MENU_URL.WARE_HOUSE.INTERNAL.EXPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
              {
                name: 'Phiếu xuất kho',
                path: MENU_URL.WARE_HOUSE.INTERNAL.EXPORT_WAREHOUSE
                  .FACTORY_WAREHOUSE,
              },
            ],
          },
          {
            name: 'Tồn kho',
            path: '/warehouse/internal/inventoryWarehouse',
            children: [
              {
                name: 'Tồn kho đầu kỳ',
                path: MENU_URL.WARE_HOUSE.INTERNAL.INVENTORY_WAREHOUSE
                  .INVENTORY_FIRST_PERIOD,
              },
              {
                name: 'Tồn kho (Theo kho)',
                path: MENU_URL.WARE_HOUSE.INTERNAL.INVENTORY_WAREHOUSE
                  .DEPARTMENT.VIEW_BY_WAREHOUSE,
              },
              {
                name: 'Tồn kho (Theo sản phẩm)',
                path: MENU_URL.WARE_HOUSE.INTERNAL.INVENTORY_WAREHOUSE
                  .DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE,
              },
            ],
          },
          {
            name: 'PP tính giá xuất kho',
            path: MENU_URL.WARE_HOUSE.INTERNAL.PRICING_CONFIG,
          },
        ],
      },
      {
        name: 'Kho nhà máy',
        path: '/warehouse/factory',
        subMenu: [
          {
            name: 'Quản lý kho',
            path: MENU_URL.WARE_HOUSE.FACTORY.MANAGEMENT,
          },
          {
            name: 'Nhập kho',
            path: '/warehouse/fatory/importWarehouse',
            children: [
              {
                name: 'Yêu cầu nhập kho',
                path: MENU_URL.WARE_HOUSE.FACTORY.IMPORT_WAREHOUSE
                  .STOCK_PICKING_REQUEST,
              },
              {
                name: 'Phiếu nhập kho',
                path: MENU_URL.WARE_HOUSE.FACTORY.IMPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
            ],
          },
          {
            name: 'Xuất kho',
            path: '/warehouse/fatory/exportWarehouse',
            children: [
              {
                name: 'Yêu cầu xuất kho',
                path: MENU_URL.WARE_HOUSE.FACTORY.EXPORT_WAREHOUSE
                  .STOCK_PICKING_LIST,
              },
              {
                name: 'Phiếu xuất kho',
                path: MENU_URL.WARE_HOUSE.FACTORY.EXPORT_WAREHOUSE
                  .FACTORY_WAREHOUSE,
              },
            ],
          },
          {
            name: 'Tồn kho',
            path: '/warehouse/fatory/inventoryWarehouse',
            children: [
              {
                name: 'Tồn kho đầu kỳ',
                path: MENU_URL.WARE_HOUSE.FACTORY.INVENTORY_WAREHOUSE
                  .INVENTORY_FIRST_PERIOD,
              },
              {
                name: 'Tồn kho (Theo kho)',
                path: MENU_URL.WARE_HOUSE.FACTORY.INVENTORY_WAREHOUSE.DEPARTMENT
                  .VIEW_BY_WAREHOUSE,
              },
              {
                name: 'Tồn kho (Theo sản phẩm)',
                path: MENU_URL.WARE_HOUSE.FACTORY.INVENTORY_WAREHOUSE.DEPARTMENT
                  .VIEW_BY_PRODUCT_TEMPLATE,
              },
            ],
          },
          {
            name: 'PP tính giá xuất kho',
            path: MENU_URL.WARE_HOUSE.FACTORY.PRICING_CONFIG,
          },
        ],
      },
    ],
  },
  {
    name: 'Tờ khai thuế',
    path: 'taxConfig',
    icon: (
      <IconButton>
        <TaxiAlertTwoTone fontSize='small' />
      </IconButton>
    ),
    children: [
      {
        name: 'Cấu hình tờ khai',
        path: MENU_URL.TAX_RETURN_CONFIG,
      },
      {
        name: 'Tờ khai',
        path: MENU_URL.TAX_RETURN,
      },
    ],
  },
  {
    name: 'Giá thành',
    path: 'cost',
    icon: (
      <IconButton>
        <PriceChangeSharp fontSize='small' />
      </IconButton>
    ),
    subMenu: [
      {
        name: 'THCP',
        path: MENU_URL.COST.THCP,
      },
      {
        name: 'Chi phí dở dang',
        path: MENU_URL.COST.UNFINISHED_COST,
      },
      // {
      //   name: 'Chi phí dở dang',
      //   path: MENU_URL.COST.CONFIG_SUBJECT,
      // },
      {
        name: 'QL định mức chi phí chung',
        path: MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL,
      },
      {
        name: 'QL bảng giá NVL đầu vào',
        path: MENU_URL.COST.BOM_COST_MANAGE.MANAGE_MATERIAL_COST_INPUT,
      },
      {
        name: 'QL bảng giá nhân công',
        path: MENU_URL.COST.BOM_COST_MANAGE.LABOR_COST_INPUT,
      },
      {
        name: 'QL định mức TP/BTP ',
        path: MENU_URL.COST.BOM_COST_MANAGE.GENERAL_PRICE_LIST,
      },
    ],
  },
  {
    name: 'Kế toán lương',
    path: '/salaryManagement',
    icon: <Image alt='' width={23} height={23} src={Cash} />,
    children: [
      {
        name: "Quản lý nhóm cột lương",
        path: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP
      },
      {
        name: "Quản lý cột lương",
        path: MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN
      },
      {
        name: "Quản lý mẫu bảng lương",
        path: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE
      },
      {
        name: "Bảng lương",
        path: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TABLE
      },
    ]
  },
  {
    name: 'Cấu hình',
    path: '/config',
    icon: <Image alt='' width={23} height={23} src={Setting} />,
    subMenu: [
      {
        name: 'Cài đặt chung',
        path: MENU_URL.CONFIG.ACCOUNT_CONFIG,
      },
      {
        name: 'Cấu hình in',
        path: MENU_URL.CONFIG.PRINT,
      },
      {
        name: 'Kế toán',
        path: '/config/account',
        children: [
          {
            name: 'Thuế',
            path: MENU_URL.CONFIG.ACCOUNTING.TAX,
          },
          {
            name: 'Sổ cái',
            path: MENU_URL.CONFIG.ACCOUNTING.LEDGER,
          },
          {
            name: 'Sổ kế toán',
            path: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL,
          },
          {
            name: 'Hệ thống tài khoản',
            path: MENU_URL.CONFIG.ACCOUNTING.SYSTEM,
          },
          {
            name: 'Loại tài khoản',
            path: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE,
          },
        ],
      },
    ],
  },

]
