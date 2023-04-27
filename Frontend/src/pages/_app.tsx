import { UiProvider } from '@/context'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { EntriesProvider } from '@/context/entries'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>
      <EntriesProvider>
        <Component {...pageProps} />
      </EntriesProvider>
    </UiProvider>
  )
}
