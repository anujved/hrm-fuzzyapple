import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import Routes from 'src/routes';
import {StateContext} from './state/StateProvider';
import {Toaster} from 'react-hot-toast';
import {MainLoading} from './views/loading/loading';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import NProgress from 'nprogress';
import dotenv from 'dotenv';
dotenv.config();

const App = (props) => {
  const [isFetching, setIsFetching] = React.useState(true);
  const store = React.useContext(StateContext);

  React.useEffect(() => {
    const { cookies } = props;
    const session = cookies.get('session');
    NProgress.start();

    if (session) {
      NProgress.inc();
      const endpoint = '/session';

      const fetchSession = async () => {
        await axios.post(endpoint).then(res => {
          store.setLoginState('LOGGED_IN');
        }).catch(err => {
          console.log(err);
        });
        NProgress.done();
        setTimeout(() => {
          setIsFetching(false);
        }, 100);
      }

      fetchSession();

    }
    else {
      NProgress.done();
      setTimeout(() => {
        setIsFetching(false);
      }, 100);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!isFetching ? <Routes /> : <MainLoading />}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default withCookies(App);
