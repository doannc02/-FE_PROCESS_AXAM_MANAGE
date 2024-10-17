import { get } from 'lodash'

export const getTranText = (val: any, label1 = 'code', label2 = 'name') => {
  if (!val) return ''
  return (get(val, label1) ?? '') + ' - ' + (get(val, label2) ?? '')
}

export const extractTextFromHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}