import { UploadFileCustom } from '@/components/molecules/UploadFileCustom'
import {  commonApi } from '@/config/axios'
import { errorMsg } from '@/helper/message'
import { ChangeEvent, useState } from 'react'

export const fileUpload = (data: any, params: any = {}) => {
  return  commonApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload-file',
    data,
    params,
  })
}

interface Props {
  setImage: (val: string) => void
}
const UploadImageBox = (props: Props) => {
  const { setImage } = props
  const [loading, setLoading] = useState(false)
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    setLoading(true)
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFiles[0])
        formData.append('feature_alias', 'upload-product')
        const res = await fileUpload(formData)
        setImage(res?.data?.data?.url)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        errorMsg(e)
      }
    }
  }
  return (
    <UploadFileCustom handleFileUpload={handleFileUpload} loading={loading} />
  )
}

export default UploadImageBox
