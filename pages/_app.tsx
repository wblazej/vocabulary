import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ThemeToggler from '../components/ThemeToggler';
import { Toaster } from 'react-hot-toast';

function QuizApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <title>Vocabulary Quiz</title>
      </Head>

      <Component {...pageProps} />

      <Toaster
				position="bottom-left"
			/>

      <ThemeToggler />
    </div>
  );
}

export default QuizApp;
