// import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
// import CoreInput from '@/components/atoms/CoreInput'
// import { CoreTable } from '@/components/organism/CoreTable'
// import PageContainer from '@/components/organism/PageContainer'
// import { WHITE } from '@/helper/colors'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material'
// import { listType, useInventoryByVariants } from './useViewInventoryByVariants'
// import { CoreButton } from '@/components/atoms/CoreButton'

// export const InventoryByVariant = () => {
//   const [values, handles] = useInventoryByVariants()

//   const {
//     methodForm,
//     isLoading,
//     columns,
//     rowData,
//     data,
//     anchorEl,
//     open,
//     queryPage,
//   } = values

//   const {
//     onSubmit,
//     onReset,
//     refetch,
//     onChangePageSize,
//     handleClick,
//     handleClose,
//     setQueryPage,
//   } = handles

//   const { control } = methodForm

//   return (
//     <PageContainer
//       title={
//         <CoreBreadcrumbs textCurrent='Kho hàng hỏng' textPrev='Kho hàng' />
//       }
//     >
//       <form onSubmit={onSubmit}>
//         <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid item xs={12} sm={12} md={6} lg={6}>
//             <CoreInput control={control} name='sku' label='SKU' />
//           </Grid>
//           <Grid item xs={12} sm={12} md={6} lg={6}>
//             <CoreInput control={control} name='name' label='Tên sản phẩm' />
//           </Grid>
//         </Grid>
//         <Box className='flex items-center justify-center m-10 gap-x-10'>
//           <CoreButton
//             theme='reset'
//             fontSize={14}
//             textTransform='none'
//             onClick={onReset}
//           >
//             Reset
//           </CoreButton>
//           <CoreButton
//             theme='submit'
//             fontSize={14}
//             textTransform='none'
//             type='submit'
//           >
//             Tìm kiếm
//           </CoreButton>
//         </Box>
//       </form>
//       <Box className='flex items-center justify-center float-right'>
//         <Typography>Lọc</Typography>
//         <Button
//           id='basic-button'
//           aria-controls={open ? 'basic-menu' : undefined}
//           aria-haspopup='true'
//           aria-expanded={open ? 'true' : undefined}
//           onClick={handleClick}
//           style={{
//             backgroundColor: WHITE,
//             color: '#213660',
//             fontSize: '14px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Box
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Typography
//               style={{
//                 color: '#213660',
//                 fontSize: '14px',
//               }}
//             >
//               {
//                 listType?.find((item) => item.value === queryPage.checkingType)
//                   ?.label
//               }
//             </Typography>
//             <KeyboardArrowDownIcon />
//           </Box>
//         </Button>
//         <Menu
//           id='basic-menu'
//           anchorEl={anchorEl}
//           open={!!anchorEl}
//           onClose={handleClose}
//           MenuListProps={{
//             'aria-labelledby': 'basic-button',
//           }}
//         >
//           {listType?.map((item) => {
//             return (
//               <MenuItem
//                 key={item?.value}
//                 onClick={() => {
//                   setQueryPage({ ...queryPage, checkingType: item?.value })
//                   handleClose()
//                 }}
//               >
//                 {item?.label}
//               </MenuItem>
//             )
//           })}
//         </Menu>
//       </Box>
//       <CoreTable
//         {...data}
//         isShowColumnStt
//         columns={columns}
//         data={rowData}
//         onChangePageSize={onChangePageSize}
//         isLoading={isLoading}
//         paginationHidden={rowData?.length < 1}
//       />
//     </PageContainer>
//   )
// }
