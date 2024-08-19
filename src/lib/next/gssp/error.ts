import { Redirect } from 'next'

export type RedirectProps = {
  permanent: boolean
  destination: string
  basePath?: false
}

export class RedirectError extends Error {
  destination: string
  basePath?: false
  permanent?: boolean

  constructor(redirect: RedirectProps) {
    super('redirect error')
    this.destination = redirect.destination
    this.basePath = redirect.basePath
    this.permanent = redirect.permanent
  }

  toProps(): { redirect: Redirect } {
    return {
      redirect: {
        destination: this.destination,
        basePath: this.basePath,
        permanent: !!this.permanent,
      },
    }
  }
}
