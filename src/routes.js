import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Branch from 'src/pages/constant/branch';
import Department from 'src/pages/constant/department';
import Designation from 'src/pages/constant/designation';
import DocumentType from 'src/pages/constant/document-type';
import Employee from 'src/pages/employee';
import CreateEmployee from 'src/pages/employee/CreateEmployee';
import EmployeeProfile from 'src/pages/staff/employee-profile';
import User from 'src/pages/staff/user';
import Role from 'src/pages/staff/role';
import LastLogin from 'src/pages/staff/last-login';
import SetSalary from 'src/pages/payroll/set-salary';
import SalaryDetailView from 'src/pages/payroll/SalaryDetailView';
import Payslip from 'src/pages/payroll/payslip';

import TimeSheet from 'src/pages/timesheet/manage-timesheet';
import ManageLeave from 'src/pages/timesheet/manage-leave';
import ManageMarkedAttendance from 'src/pages/timesheet/attendance/marked-attendance';
import ManageBulkAttendance from 'src/pages/timesheet/attendance/bulk-attendance';

import Indicator from 'src/pages/performance/indicator';
import Appraisal from 'src/pages/performance/appraisal';
import GoalTracking from 'src/pages/performance/goal-tracking';

import FinanceAccount from 'src/pages/finance/account-list';
import Deposit from 'src/pages/finance/deposit';
import Expense from 'src/pages/finance/expense';
import Payees from 'src/pages/finance/payees';
import Payers from 'src/pages/finance/payers';
import TransferBalance from 'src/pages/finance/transfer-balance';

import TrainingList from 'src/pages/training/training-list';
import Trainer from 'src/pages/training/trainer';

//HR
import Award from 'src/pages/hr/award';
import Transfer from 'src/pages/hr/transfer';
import Resignation from 'src/pages/hr/resignation';
import Trip from 'src/pages/hr/trip';
import Promotion from './pages/hr/promotion';
import Complaints from './pages/hr/complaints';
import Warning from './pages/hr/warning';
import Termination from './pages/hr/termination';
import Announcement from './pages/hr/announcement';

// Recruitment
import Jobs from './pages/recruitment/jobs';
import CreateJob from './pages/recruitment/jobs/CreateJob';

import Ticket from './pages/ticket';

import Meeting from './pages/meeting';

import Assets from './pages/assets';

import Document from './pages/document';

import CompanyPolicy from './pages/company-policy';

import SystemSetting from './pages/system-setting';

import {StateContext} from './state/StateProvider';

// Constant
import ConstantAward from 'src/pages/constant/award';
import PayslipType from './pages/constant/payslip-type';
import AllowanceOption from './pages/constant/allowance-option';
import LoanOption from './pages/constant/loan-option';
import DeductionOption from './pages/constant/deduction-option';
import ExpenseType from './pages/constant/expense-type';
import IncomeType from './pages/constant/income-type';
import PaymentType from './pages/constant/payment-type';
import LeaveType from './pages/constant/leave-type';
import TerminationType from './pages/constant/termination-type';
import GoalType from './pages/constant/goal-type';
import TrainingType from './pages/constant/training-type';
import JobCategory from './pages/constant/job-category';
import MonthlyAttendance from './pages/report/monthly-attendance';
import Leave from './pages/report/leave';
import Event from './pages/event';


const Routes = props => {
  const state = React.useContext(StateContext);

  const requireAuthRoute = Component => {
    return state.isLogged ? <Component /> : <Navigate to="/login" />
  }

  const requireNonAuthRoute = Component => {
    return !state.isLogged ? <Component /> : <Navigate to="/" />
  }

  const routes = [
    {
      path: '/',
      element: state.isLogged ? <DashboardLayout /> : <MainLayout />,
      children: [
        {path: '/', element: state.isLogged ? <Navigate to="/dashboard/home"/> : <Navigate to="/login" />},
        {path: 'login', element: requireNonAuthRoute(Login)},
        {path: 'register', element: requireNonAuthRoute(Register)},
        
        /** Authenticated Routes */
        { path: '/dashboard/account', element: requireAuthRoute(Account) },
        { path: '/dashboard/customers', element: requireAuthRoute(CustomerList) },
        { path: '/dashboard/home', element: requireAuthRoute(Dashboard) },
        { path: '/dashboard/products', element: requireAuthRoute(ProductList) },
        { path: '/dashboard/settings', element: requireAuthRoute(SystemSetting) },
        { path: '/dashboard/employee', element: requireAuthRoute(Employee) },
        { path: '/dashboard/employee/create', element: requireAuthRoute(CreateEmployee) },

        /** Staff */
        { path: '/staff/user', element: requireAuthRoute(User) },
        { path: '/staff/role', element: requireAuthRoute(Role) },
        { path: '/staff/employee-profile', element: requireAuthRoute(EmployeeProfile) },
        { path: '/staff/last-login', element: requireAuthRoute(LastLogin) },

        /** Payroll */
        { path: '/payroll/set-salary', element: requireAuthRoute(SetSalary) },
        { path: '/payroll/set-salary/:id', element: requireAuthRoute(SalaryDetailView) },
        { path: '/payroll/pay-slip', element: requireAuthRoute(Payslip) },

        /** Timesheet */
        { path: '/timesheet/manage-timesheet', element: requireAuthRoute(TimeSheet) },
        { path: '/timesheet/manage-leave', element: requireAuthRoute(ManageLeave) },
        { path: '/timesheet/attendance/manage-marked-attendance', element: requireAuthRoute(ManageMarkedAttendance) },
        { path: '/timesheet/attendance/manage-bulk-attendance', element: requireAuthRoute(ManageBulkAttendance) },

        /** Performance */
        { path: '/performance/indicator', element: requireAuthRoute(Indicator) },
        { path: '/performance/appraisal', element: requireAuthRoute(Appraisal) },
        { path: '/performance/goal-tracking', element: requireAuthRoute(GoalTracking) },

        /** Finance */
        { path: '/finance/account-list', element: requireAuthRoute(FinanceAccount) },
        { path: '/finance/deposit', element: requireAuthRoute(Deposit) },
        { path: '/finance/expense', element: requireAuthRoute(Expense) },
        { path: '/finance/payees', element: requireAuthRoute(Payees) },
        { path: '/finance/payers', element: requireAuthRoute(Payers) },
        { path: '/finance/transfer-balance', element: requireAuthRoute(TransferBalance) },

        /** Training */
        { path: '/training/training-list', element: requireAuthRoute(TrainingList) },
        { path: '/training/trainer', element: requireAuthRoute(Trainer) },

        /** HR */
        { path: '/hr/award', element: requireAuthRoute(Award) },
        { path: '/hr/transfer', element: requireAuthRoute(Transfer) },
        { path: '/hr/resignation', element: requireAuthRoute(Resignation) },
        { path: '/hr/trip', element: requireAuthRoute(Trip) },
        { path: '/hr/promotion', element: requireAuthRoute(Promotion) },
        { path: '/hr/complaints', element: requireAuthRoute(Complaints) },
        { path: '/hr/warning', element: requireAuthRoute(Warning) },
        { path: '/hr/termination', element: requireAuthRoute(Termination) },
        { path: '/hr/announcement', element: requireAuthRoute(Announcement) },

        /** Recruitment */
        { path: '/recruitment/jobs', element: requireAuthRoute(Jobs) },
        { path: '/recruitment/jobs/create', element: requireAuthRoute(CreateJob) },

        /** Ticket */
        { path: '/dashboard/ticket', element: requireAuthRoute(Ticket) },

        /** Meeting */
        { path: '/dashboard/meeting', element: requireAuthRoute(Meeting) },

        /** Assets */
        { path: '/dashboard/assets', element: requireAuthRoute(Assets) },

        /** Document */
        { path: '/dashboard/document', element: requireAuthRoute(Document) },

        /** Company Policy */
        { path: '/dashboard/company-policy', element: requireAuthRoute(CompanyPolicy) },

        /** Constant Routes */
        { path: '/constant/branch', element: requireAuthRoute(Branch) },
        { path: '/constant/department', element: requireAuthRoute(Department) },
        { path: '/constant/designation', element: requireAuthRoute(Designation) },
        { path: '/constant/document-type', element: requireAuthRoute(DocumentType) },
        { path: '/constant/award-type', element: requireAuthRoute(ConstantAward) },
        { path: '/constant/payslip-type', element: requireAuthRoute(PayslipType) },
        { path: '/constant/allowance-option', element: requireAuthRoute(AllowanceOption) },
        { path: '/constant/loan-option', element: requireAuthRoute(LoanOption) },
        { path: '/constant/deduction-option', element: requireAuthRoute(DeductionOption) },
        { path: '/constant/expense-type', element: requireAuthRoute(ExpenseType) },
        { path: '/constant/income-type', element: requireAuthRoute(IncomeType) },
        { path: '/constant/payment-type', element: requireAuthRoute(PaymentType) },
        { path: '/constant/leave-type', element: requireAuthRoute(LeaveType) },
        { path: '/constant/termination-type', element: requireAuthRoute(TerminationType) },
        { path: '/constant/goal-type', element: requireAuthRoute(GoalType) },
        { path: '/constant/training-type', element: requireAuthRoute(TrainingType) },
        { path: '/constant/job-category', element: requireAuthRoute(JobCategory) },

        /** Report Routes */
        { path: '/report/monthly-attendance', element: requireAuthRoute(MonthlyAttendance) },
        { path: '/report/leave', element: requireAuthRoute(Leave) },

        /** Event Route */
        { path: '/event', element: requireAuthRoute(Event) },

        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
  ];

  const router = useRoutes(routes);

  return (
    <React.Fragment>
      {router}
    </React.Fragment>
  );
}

export default Routes;
