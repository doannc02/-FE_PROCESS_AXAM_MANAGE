import { Box, Grid, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { RowBoxCommon } from './BoxCustom'

export type Props = {
  data: any
}
export const DialogDistributionInformationWarehouse = ({ data }: Props) => {
  return (
    <>
      {/* <div className='grid grid-cols-2 gap-8 mx-12'>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí xem cửa hàng
              <Tooltip title='Vị trí xem cửa hàng'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí tồn kho
              <Tooltip title='Vị trí tồn kho'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.stockLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí nhập kho
              <Tooltip title='Vị trí nhập kho'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.inputLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí kiểm soát chất lượng
              <Tooltip title='Vị trí kiểm soát chất lượng'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.qualityLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí đóng gói
              <Tooltip title='Vị trí đóng gói'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.packingLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí xuất kho
              <Tooltip title='Vị trí xuất kho'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.outputLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí tồn kho sau sản xuất
              <Tooltip title='Vị trí tồn kho sau sản xuất'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.samLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí lấy hàng trước khi sản xuất
              <Tooltip title='Vị trí lấy hàng trước khi sản xuất'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.pbmLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí nhà cung cấp
              <Tooltip title='Vị trí nhà cung cấp'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.vendorLocation?.name}`}</p>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          <div className='grid grid-cols-2'>
            <p className='text-[#747475] text-sm flex items-center'>
              Vị trí khách hàng
              <Tooltip title='Vị trí khách hàng'>
                <HelpOutlineIcon
                  style={{ width: 15, height: 15, paddingLeft: 2 }}
                />
              </Tooltip>
            </p>
            <p className='text-[#242424] text-sm font-bold'>{`${data?.customerLocation?.name}`}</p>
          </div>
        </Box>
      </div> */}
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {' '}
        <RowBoxCommon title='Vị trí tồn kho' data={data?.stockLocation?.name} />
        <RowBoxCommon
          title='Vị trí nhập kho'
          data={data?.inputLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí kiểm soát chất lượng'
          data={data?.qualityLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí đóng gói'
          data={data?.packingLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí xuất kho'
          data={data?.outputLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí tồn kho sau sản xuất'
          data={data?.samLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí lấy hàng trước khi sản xuất'
          data={data?.pbmLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí nhà cung cấp'
          data={data?.vendorLocation?.name}
        />
        <RowBoxCommon
          title='Vị trí khách hàng'
          data={data?.customerLocation?.name}
        />
      </Grid>
    </>
  )
}
