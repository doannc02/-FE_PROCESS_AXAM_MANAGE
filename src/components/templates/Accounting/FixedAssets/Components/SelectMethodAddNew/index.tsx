import iconAddAsset from '@/assets/svg/fixedAsset/iconAddAsset.svg'
import iconAddHandmade from '@/assets/svg/fixedAsset/iconAddHandmade.svg'
import iconAddSaleOder from '@/assets/svg/fixedAsset/iconAddSaleOder.svg'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { MENU_URL } from '@/routes'
import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import DialogMethodAddNew from '../../Esc/DialogMethodAddNew'
import SaveEscTool from '../../Esc/HandMade/SaveEscTool'

export type Props = {}

const SelectMethodAddNew = (props: Props) => {
  const { hideDialog, showDialog } = useDialog()
  const { t } = useTranslation()
  const router = useRouter()
  const { typeToolAsset } = useCheckPath()

  const arrCate = useMemo(
    () => [
      {
        label: 'Thủ công',
        component: <SaveEscTool />,
        icon: (
          <IconButton>
            <Image alt='' src={iconAddHandmade} />
          </IconButton>
        ),
        type: 'HANDMADE',
      },
      {
        label: `${
          typeToolAsset === 'ASSET'
            ? 'Lấy TSCĐ từ chứng từ mua hàng'
            : 'Lấy CCDC từ chứng từ mua hàng'
        }`,
        component: (
          <DialogMethodAddNew
            type='PURCHASE'
            title={`${
              typeToolAsset === 'ASSET'
                ? 'Chọn TSCĐ từ chứng từ mua hàng'
                : 'Chọn CCDC từ chứng từ mua hàng'
            }`}
          />
        ),
        icon: (
          <IconButton>
            <Image alt='' src={iconAddAsset} />
          </IconButton>
        ),
        type: 'PURCHASE',
      },
      {
        label: `${
          typeToolAsset === 'ASSET'
            ? 'Lấy TSCĐ từ hệ thống quản lý tài sản'
            : 'Lấy CCDC từ hệ thống quản lý tài sản'
        }`,
        component: (
          <DialogMethodAddNew
            type='ASSET'
            title={`${
              typeToolAsset === 'ASSET'
                ? 'Chọn TSCĐ từ hệ thống quản lý tài sản'
                : 'Chọn CCDC từ hệ thống quản lý tài sản'
            }`}
          />
        ),
        icon: (
          <IconButton>
            <Image alt='' src={iconAddSaleOder} />
          </IconButton>
        ),
        type: 'ASSET',
      },
    ],
    [typeToolAsset]
  )
  return (
    <DialogCustom
      title='Chọn phương thức thêm mới'
      onClose={hideDialog}
      width={500}
      formProps={{
        className: 'p-20',
      }}
    >
      {arrCate.map((item, index) => (
        <div
          key={index}
          className='p-15 w-full h-full flex justify-start items-center'
          style={{ borderBottom: '1px solid' }}
          onClick={() => {
            if (item.type === 'HANDMADE') {
              router.replace(`${MENU_URL[typeToolAsset].ESC}/handMade/addNew`)
              hideDialog()
            } else if (item.type !== 'HANDMADE') {
              hideDialog()
              showDialog(item.component)
            }
          }}
        >
          {item.icon}
          <IconButton>
            <Typography
              fontSize='16px'
              fontWeight='700'
              sx={{ marginLeft: '15px' }}
            >
              {item.label}
            </Typography>
          </IconButton>
        </div>
      ))}
    </DialogCustom>
  )
}

export default SelectMethodAddNew
