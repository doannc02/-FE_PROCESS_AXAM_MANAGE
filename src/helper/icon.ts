import * as Icons from '@mui/icons-material'

export const listIconMUI = (props?: any) => {
  const list = Object.keys(Icons)
    .filter(
      (item) =>
        !['Outlined', 'Rounded', 'TwoTone', 'Sharp'].some((v) =>
          item.includes(v)
        )
    )
    .map((v) => {
      return {
        id: v,
        name: v,
        icon: (Icons as any)[`${v}`].type.render(props),
      }
    })
  return list
}
