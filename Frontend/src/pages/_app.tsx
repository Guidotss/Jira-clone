import type { AppProps } from 'next/app'
import { UiProvider } from '@/context'
import { EntriesProvider } from '@/context/entries'
import { SnackbarProvider } from 'notistack'

import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3} >
      <UiProvider>
        <EntriesProvider>
          <Component {...pageProps} />
        </EntriesProvider>
      </UiProvider>
    </SnackbarProvider>
  )
}
