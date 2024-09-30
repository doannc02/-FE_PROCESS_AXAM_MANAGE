import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import branchSlice from './reducer/branchReducer'
import buttonConfigSlice from './reducer/buttonReducer'
import companyConfigSlice from './reducer/companyConfigReducer'
import fontConfigSlice from './reducer/fontReducer'
import tableSlice from './reducer/tableReducer'
import themeColorSlice from './reducer/themeColorReducer'

const reducers = combineReducers({
  themeColorData: themeColorSlice,
  fontData: fontConfigSlice,
  buttonData: buttonConfigSlice,
  companyConfigData: companyConfigSlice,
  tableConfigData: tableSlice,
  branchData: branchSlice,
})

const persistConfig = {
  key: 'afs-root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
