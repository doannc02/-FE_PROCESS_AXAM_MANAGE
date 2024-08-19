import { errorMsg } from '@/helper/message'
import { useAppSelector } from '@/redux/hook'
import { ResponseBody } from '@/service/accounting/accountConfig/importFile/importAccountConfigFile/type'
import { useState } from 'react'
import { Props } from '.'

export const useDialogImportFile = (props: Props) => {
  const { refetch, fetchDataExport, fetchDataImport } = props
  const [file, setFile] = useState<File>()
  const [importResult, setImportResult] = useState<ResponseBody['POST']>()
  const [loadingImport, setLoadingImport] = useState<boolean>(false)

  const handleDownloadFile = (res: any) => {
    const { name } = res
    const url = URL.createObjectURL(res)
    const downloadLink = document.createElement('a')
    document.body.appendChild(downloadLink)
    downloadLink.href = url
    downloadLink.target = '_self'
    downloadLink.download = name ?? 'Template.xlsx'
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const handleGetProductTemplateFile = async () => {
    try {
      if (accountLedgerId) {
        const res = await fetchDataExport(accountLedgerId)  
        handleDownloadFile(res)
      } else {
        errorMsg('Vui lòng chọn sổ cái.')
      }
    } catch (error) {
      errorMsg(error)
    }
  }

  const handleDownloadFileByURL = (url: string) => {
    try {
      url = url + '?content-disposition=ATTACHMENT'
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = url
      downloadLink.target = '_self'
      downloadLink.download = 'Result.xlsx'
      downloadLink.click()
    } catch (error) {
      errorMsg(error)
    }
  }

  const handleDeleteFile = () => {
    setFile(undefined)
  }

  const handleSaveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const onSubmit = async () => {
    setLoadingImport(true)
    try {
      if (file && accountLedgerId) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetchDataImport(accountLedgerId, formData)
        setImportResult(res)
        refetch()
      }
    } catch (error) {
      errorMsg(error)
    }
    setLoadingImport(false)
  }

  return [
    { file, loadingImport, importResult },
    {
      handleGetProductTemplateFile,
      handleSaveFile,
      handleDeleteFile,
      onSubmit,
      handleDownloadFileByURL,
    },
  ] as const
}
