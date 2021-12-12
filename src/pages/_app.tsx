import React from "react"
import type { AppProps /*, AppContext */ } from "next/app"

import "./styles.scss"

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
function myApp ({ Component, pageProps }: AppProps): React.ReactChild {
  return <Component {...pageProps} />
}

export default myApp
