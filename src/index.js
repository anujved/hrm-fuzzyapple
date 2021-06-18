import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { CookiesProvider } from "react-cookie";
import { StateProvider } from "./state/StateProvider";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(
  <CookiesProvider>
    <StateProvider>
      <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
      </BrowserRouter>
    </StateProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
