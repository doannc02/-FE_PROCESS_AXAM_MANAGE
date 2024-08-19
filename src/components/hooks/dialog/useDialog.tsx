import { ReactNode, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dialogNode, isOpenDialog } from './recoil'

export function useDialog() {
  const setOpenDialog = useSetRecoilState(isOpenDialog)
  const setDialogNode = useSetRecoilState(dialogNode)
  const showDialog = useCallback(
    (props: JSX.Element) => {
      setOpenDialog(true)
      setDialogNode(props)
    },
    [setOpenDialog, setDialogNode]
  )
  const hideDialog = useCallback(() => {
    setOpenDialog(false)
  }, [setOpenDialog])

  return { showDialog, hideDialog } as const
}

function useRenderDialog() {
  const isOpen = useRecoilValue(isOpenDialog)
  const node = useRecoilValue(dialogNode)
  const renderDialog = useCallback(() => {
    if (!isOpen || !node) return null
    return <>{node}</>
  }, [isOpen, node])

  return renderDialog
}

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const renderDialog = useRenderDialog()
  return (
    <>
      {children}
      {renderDialog()}
    </>
  )
}
