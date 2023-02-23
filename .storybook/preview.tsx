import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { withRouter } from 'storybook-addon-react-router-v6'
import ErrorBoundary from '../src/components/ErrorBoundary'
import { AppProvider } from '../src/contexts/app.context'
import '../src/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => null,
  },
})

export const decorators = [
  withRouter,
  Story => (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <Story />
          </ErrorBoundary>
        </HelmetProvider>
      </AppProvider>
    </QueryClientProvider>
  ),
]
