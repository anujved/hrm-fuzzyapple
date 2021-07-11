import { all } from "redux-saga/effects";
import Employee from "../pages/payroll/set-salary/store/saga"
export default function* rootSaga() {
  yield all([Employee()]);
}
