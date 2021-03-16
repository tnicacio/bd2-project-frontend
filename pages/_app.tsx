import '../styles/globals.css';
import { ModalProvider } from '../contexts/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
