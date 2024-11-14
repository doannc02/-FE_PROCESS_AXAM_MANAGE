import { GREEN_VIU } from '@/helper/colors'
import EditOffIcon from '@mui/icons-material/EditOff'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export type ActionType =
  | 'delete'
  | 'watch'
  | 'edit'
  | 'append'
  | 'remove'
  | 'copy'
  | 'export'
  | 'import'
  | 'history'
  | 'view'
  | 'print'
  | 'draft'
  | 'approval'
type Props = {
  actionList: ActionType[]
  isShowText?: boolean
  onWatchAction?: () => void
  onDeleteAction?: () => void
  onEditAction?: () => void
  onAppendAction?: () => void
  onRemoveAction?: () => void
  onCopyAction?: () => void
  onImportAction?: () => void
  onExportAction?: () => void
  onHistoryAction?: () => void
  onViewAction?: () => void
  onPrintAction?: () => void
  onDraftAction?: () => void
  onPaymentAction?: () => void
}

export const TopAction = ({
  actionList,
  isShowText = true,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onAppendAction,
  onRemoveAction,
  onCopyAction,
  onHistoryAction,
  onViewAction,
  onPrintAction,
  onDraftAction,
  onExportAction,
  onImportAction,
  onPaymentAction,
}: Props) => {
  const { t } = useTranslation('common')

  const router = useRouter()

  const { actionType } = router.query
  return (
    <div className='flex items-center gap-5'>
      {actionList.includes('history') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onHistoryAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/history.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.history')}</Typography>
        </div>
      )}
      {actionList.includes('approval') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onPaymentAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/buildingFactory.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>Ghi nhận thanh toán</Typography>
        </div>
      )}
      {actionType !== 'VIEW' && actionList.includes('view') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onViewAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/view.svg')}
              alt='view'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.view')}</Typography>
        </div>
      )}

      {actionType === 'VIEW' && actionList.includes('edit') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onEditAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/edit.svg')}
              alt='edit'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.edit')}</Typography>
        </div>
      )}

      {actionList.includes('watch') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onWatchAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/watch.svg')}
              alt='watch'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('detail')}</Typography>
        </div>
      )}

      {actionList.includes('delete') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onDeleteAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/delete.svg')}
              alt='delete'
              width={16}
              height={16}
            />
          </IconButton>

          {isShowText && (
            <Typography variant='body2'>{t('btn.delete')}</Typography>
          )}
        </div>
      )}

      {actionList.includes('append') && (
        <IconButton onClick={onAppendAction}>
          <Image
            src={require('@/assets/svg/action/append.svg')}
            alt='append'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('remove') && (
        <IconButton onClick={onRemoveAction}>
          <Image
            src={require('@/assets/svg/action/remove.svg')}
            alt='remove'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('copy') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onCopyAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/copy.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.copy')}</Typography>
        </div>
      )}

      {actionList.includes('export') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onExportAction}
        >
          <IconButton onClick={onExportAction}>
            <Image
              src={require('@/assets/svg/action/export.svg')}
              alt='export'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.export')}</Typography>
        </div>
      )}

      {actionList.includes('import') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onImportAction}
        >
          <IconButton>
            <Image
              src={require('@/assets/svg/action/import.svg')}
              alt='copy'
              width={16}
              height={16}
            />
          </IconButton>
          <Typography variant='body2'>{t('btn.import')}</Typography>
        </div>
      )}

      {actionList.includes('print') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onPrintAction}
        >
          <LocalPrintshopIcon
            sx={{
              color: GREEN_VIU,
            }}
          />
          <Typography variant='body2'>Print</Typography>
        </div>
      )}

      {actionList.includes('draft') && (
        <div
          className='flex items-center cursor-pointer'
          onClick={onDraftAction}
        >
          <EditOffIcon
            sx={{
              color: GREEN_VIU,
            }}
            fontSize='small'
          />
          <Typography variant='body2'>Đặt lại nháp</Typography>
        </div>
      )}
    </div>
  )
}
