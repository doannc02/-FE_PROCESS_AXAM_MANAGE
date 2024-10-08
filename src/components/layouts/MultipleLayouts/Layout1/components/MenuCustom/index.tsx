import DoneIcon from '@mui/icons-material/Done'
import { Menu, MenuProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

export const MenuCustom = (
  props: MenuProps & {
    itemList: any
    onItemAction: (item: any) => void
    currentValue?: any
  }
) => {
  const { t } = useTranslation()

  const { itemList = [], onItemAction, currentValue = '', ...rest } = props
  console.log(itemList, 'll')
  return (
    <Menu {...rest}>
      {Array.isArray(itemList) && itemList.length === 0 && (
        <div className='h-18 rounded-[8px] gap-10 flex items-center justify-center cursor-pointer group'>
          <Typography variant='body1'>Không có lựa chọn phù hợp</Typography>
        </div>
      )}

      {itemList.map((item: any) => {
        return (
          <div
            onClick={() => onItemAction(item)}
            key={item.name}
            className='h-18 hover:bg-cyan-50 rounded-[8px] gap-5 flex items-center cursor-pointer group px-5'
          >
            <div className='w-2 h-full group-hover:bg-[#0078D4]'></div>

            <Typography variant='body1' className='group-hover:text-[#0078D4]'>
              {t(item.name)}
            </Typography>

            <div className='w-[15px]'>
              {[item.name, item.value].includes(currentValue) && (
                <DoneIcon
                  color='primary'
                  style={{
                    width: 15,
                    marginTop: 4,
                  }}
                />
              )}
            </div>
          </div>
        )
      })}
    </Menu>
  )
}
