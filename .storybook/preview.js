import { initialize, mswDecorator } from 'msw-storybook-addon'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    path: '/dashboard',
    asPath: '/dashboard',
    query: {},
    push(path) {
     // console.log(`router push to: ${path}`)
    },
    Provider: RouterContext.Provider,
  },
}

initialize()
export const decorators = [mswDecorator]
