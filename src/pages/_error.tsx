import React from "react"

import type { NextPageContext } from "next"
import Head from "next/head"

import Error from "@/components/page/error"
import Page from "@/components/page/page"

interface ErrorComponentProps {
  err: string | undefined
  statusCode?: number
  statusMessage?: string
}

function ErrorComponent ({ statusCode, statusMessage, err }: Readonly<ErrorComponentProps>): JSX.Element {
  return (
    <Page>
      <Head>
        <title>
          {statusCode}

          {statusMessage}

          {" "}
          | Theresa.wiki
        </title>
      </Head>

      <Error
        errorMessage={(statusCode != null)
          ? `An error ${statusCode} ${statusMessage ?? ""} occurred on server`
          : err !== undefined ? err : "An error occurred on client"}
      />

    </Page>
  )
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
ErrorComponent.getInitialProps = ({ asPath, err, res }: Readonly<NextPageContext>): ErrorComponentProps => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const statusMessage = res ? res.statusMessage : ""

  console.error("Error for path: ", asPath, " statusCode: ", statusCode, " statusMessage: ", statusMessage, " err: ", err)

  return { err: err?.name, statusCode, statusMessage }
}

export default ErrorComponent
