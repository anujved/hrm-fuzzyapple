import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { CookiesProvider } from "react-cookie";
import { StateProvider } from "./state/StateProvider";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux"
import App from "./App";
import store from "./store/store"

ReactDOM.render(
  <CookiesProvider>
    <StateProvider>
      <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiPickersUtilsProvider>
      </BrowserRouter>
    </StateProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
