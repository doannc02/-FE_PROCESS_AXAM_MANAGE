import { AppPropsWithLayout } from '@/lib/next/types'
import { store } from '@/redux/store'
import { appWithTranslation } from 'next-i18next'
import { createWrapper } from 'next-redux-wrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { compose } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '../../public/styles/globals.css'

let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (pageProps.err) return <>Error Page</>

  const getLayout = Component.getLayout ?? ((page) => page)
  const getMeta = Component.getMeta ?? ((page) => page)
  return getLayout(
    getMeta(
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          containerId='a-toast'
          position='top-center'
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          limit={3}
        />

        <Component {...pageProps} />
      </PersistGate>,
      pageProps
    )
  )
}
const wrapper = createWrapper(() => store)
const enhance = compose(wrapper.withRedux, appWithTranslation)
export default enhance(MyApp)
