const handlePushPath = (currentPath: string, index: number, router: any) => {
  const trimmedUrl = currentPath.substring(0, index - 1)
  router.push({
    pathname: trimmedUrl
  })
}

export const backToListUI = (currentPath: string, router: any) => {
  let i = currentPath.indexOf('[id]')
  if (i === -1) {
    if (currentPath.includes('addNew')) {
      i = currentPath.indexOf('addNew')
      handlePushPath(currentPath, i, router)
    }
  } else {
    handlePushPath(currentPath, i, router)
  }
}
