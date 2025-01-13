import '@/styles/globals.css';
import '@/styles/pretendard.css';
import Layout from '../components/layout/Layout';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <aside id="aside-root"></aside>
    </QueryClientProvider>
  );
}
