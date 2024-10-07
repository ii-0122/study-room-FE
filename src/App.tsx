import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Router from './router/Router';
import Layout from './components/layout/Layout';
import CustomToastContainer from './components/toast/Toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomToastContainer />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
