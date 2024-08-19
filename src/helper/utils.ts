export const checkChangeArray = (
  oldArr: any[] = [],
  newArr: any[] = [],
  compareName: string
) => {
  const additionalArr = oldArr
    ? newArr.filter(
        (v) =>
          !oldArr.some((v2) => v2?.[`${compareName}`] === v?.[`${compareName}`])
      )
    : newArr
  const deletedArr = newArr
    ? oldArr.filter(
        (v) =>
          !newArr.some((v2) => v2?.[`${compareName}`] === v?.[`${compareName}`])
      )
    : oldArr
  return { additionalArr, deletedArr }
}

export const handleGetAllPath = (options: any[]) => {
  let arr: any[] = []
  options.forEach((element) => {
    const listArr = element?.children
      ? element.children?.filter((v: any) => v.path)
      : []
    arr = [...arr, ...listArr]
    element?.children?.forEach((ele2: any) => {
      if (ele2.children) {
        arr = [...arr, ...handleGetAllPath([ele2])]
      }
    })
  })
  return arr
}

export const flatMenu = (route: any[]) => {
  let arr = [...route]
  route.forEach((element: any) => {
    if (element?.children?.length > 0) {
      arr = [...arr, ...flatMenu(element?.children)]
    }
  })
  return arr
}

export function trimObject(obj: {}) {
  const trim: any = {}
  Object.entries(obj).forEach((v: any[] = []) => {
    trim[`${v[0]}`] = typeof v[1] === 'string' ? v[1].trim() : v[1]
  })
  return trim
}
