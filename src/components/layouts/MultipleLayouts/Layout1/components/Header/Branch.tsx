import { logoutAccount } from '@/config/axios'
import { getCmsToken, setCmsToken } from '@/config/token'
import { backToListUI } from '@/helper/backToListUI'
import { WHITE } from '@/helper/colors'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setBranchConfig } from '@/redux/reducer/branchReducer'
import { setLedgerRefConfig } from '@/redux/reducer/ledgerRefReducer'
import {
  getAccountLedger,
  useGetAccountLedger,
} from '@/service/accounting/accountLedger/getList'
import { postRefreshToken } from '@/service/auth/refreshToken'
import { useQueryGetUserBranchList } from '@/service/common/branch/getListByUser'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { MenuCustom } from '../MenuCustom'

export const Branch = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const [anchorEl1, setAnchorEl1] = useState<any>(null)
  const currentPath = router.pathname

  const { id: idLedger, name: nameLedger } = useAppSelector(
    (state) => state.ledgerRefData
  )

  const { type: typeBranch, name: branchName } = useAppSelector(
    (state) => state.branchData
  )

  const { id: idCompany, name: companyName } = useAppSelector(
    (state) => state.companyConfigData
  )

  const callBackLedgerRef = useCallback(async () => {
    await getAccountLedger({
      page: 0,
      size: MAX_VALUE,
      isDefault: true,
    }).then((res) => {
      if (res?.data?.content.length > 0) {
        dispatch(
          setLedgerRefConfig({
            id: res?.data?.content[0]?.id,
            name: res?.data?.content[0]?.name,
            code: res?.data?.content[0]?.code,
          })
        )
      } else {
        if (!!idLedger) {
          dispatch(
            setLedgerRefConfig({
              id: null,
              name: '',
              code: '',
            })
          )
        } else {
          dispatch(
            setLedgerRefConfig({
              id: null,
              name: 'Chọn sổ cái',
              code: '',
            })
          )
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: dataLedger } = useGetAccountLedger({
    page: 0,
    size: MAX_VALUE,
  })

  const handleChangeLedgerRef = (id: number, name: string, code: string) => {
    dispatch(setLedgerRefConfig({ id, name, code }))
    backToListUI(currentPath, router)
    setAnchorEl1(null)
  }

  const handleChangeBranch = async (id: number | null, name: string | null) => {
    try {
      const tokenAccess = JSON.parse(getCmsToken() ?? '{}')
      if (tokenAccess && tokenAccess?.refreshToken) {
        await postRefreshToken(tokenAccess?.refreshToken, id)
          .then((res) => {
            if (res && res?.data && res.data.accessToken) {
              setCmsToken(res.data)
            }
          })
          .catch((e) => {
            logoutAccount()
            errorMsg(e)
          })

        dispatch(
          setBranchConfig({
            id,
            name,
            type: id === null ? 'company' : 'branch',
          })
        )
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/account-config`],
        })
        await callBackLedgerRef()
        router.push({ pathname: '/dashboard' })
        setAnchorEl(null)
      }
    } catch (error) {
      errorMsg(error)
      logoutAccount()
    }
  }

  const { data: branchList } = useQueryGetUserBranchList({
    activated: true,
    isDefaultCompany: true,
    page: 0,
    size: MAX_VALUE,
  })

  useEffect(() => {
    // branch lan tru dang nhap
    try {
      if (!typeBranch) {
        const branches = branchList?.data?.content ?? []
        const branchDefault = branches.find((item) => item.isDefault)
        if (branchDefault) {
          handleChangeBranch(
            branchDefault.type === 'COMPANY' ? null : branchDefault.id,
            branchDefault.name
          )
          dispatch(
            setBranchConfig({
              id: branchDefault.type === 'COMPANY' ? null : branchDefault.id,
              name: branchDefault.name,
              type: branchDefault.type === 'COMPANY' ? 'company' : 'branch',
            })
          )
        } else if (branches.length > 0) {
          handleChangeBranch(
            branches[0].type === 'COMPANY' ? null : branches[0].id,
            branches[0].name
          )
          dispatch(
            setBranchConfig({
              id: branches[0].type === 'COMPANY' ? null : branches[0].id,
              name: branches[0].name,
              type: branches[0].type === 'COMPANY' ? 'company' : 'branch',
            })
          )
        }
      } else {
        callBackLedgerRef()
      }
    } catch (error) {
      errorMsg(error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchList])

  return (
    <div className='flex items-center gap-10 h-full'>
      <>
        {typeBranch === 'company' && (
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <div className='flex gap-3 items-center text-white'>
              <Typography variant='body1' style={{ color: WHITE }}>
                {companyName}
              </Typography>
              <KeyboardArrowDownIcon fontSize='small' />
            </div>
          </IconButton>
        )}

        {typeBranch === 'branch' && (
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <div className='flex gap-3 items-center text-white'>
              <Typography variant='body1' style={{ color: WHITE }}>
                {branchName}
              </Typography>
              <KeyboardArrowDownIcon fontSize='small' />
            </div>
          </IconButton>
        )}

        <MenuCustom
          classes={{
            root: 'mt-4',
            paper: 'w-106',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          itemList={branchList ? branchList.data.content : []}
          onItemAction={(item) => {
            handleChangeBranch(
              item.id === idCompany ? null : item.id,
              item.name
            )
          }}
          currentValue={typeBranch === 'company' ? companyName : branchName}
        />
      </>

      <div className='w-[1px] h-1/3 bg-slate-300'></div>

      <>
        <div
          className='flex gap-3 items-center cursor-pointer text-white'
          onClick={(e) => {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/account-ledger/list'],
            })
            setAnchorEl1(e.currentTarget)
          }}
        >
          <Typography variant='body1' style={{ color: WHITE }}>
            {nameLedger}
          </Typography>
          <KeyboardArrowDownIcon fontSize='small' />
        </div>

        <MenuCustom
          classes={{
            root: 'mt-4',
            paper: 'w-106',
          }}
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={() => setAnchorEl1(null)}
          itemList={dataLedger ? dataLedger?.data?.content : []}
          onItemAction={(item) => {
            handleChangeLedgerRef(item.id, item.name, item.code)
          }}
          currentValue={idLedger}
        />
      </>
    </div>
  )
}
