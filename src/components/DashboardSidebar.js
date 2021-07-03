import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
import NavItem2 from "./NavItem2";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "lucy Smith",
};

const items = [
  {
    href: "/",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/dashboard/staff",
    icon: UsersIcon,
    title: "Staff",
    items: [
      {
        href: "/staff/user",
        icon: ShoppingBagIcon,
        title: "User",
      },
      {
        href: "/staff/role",
        icon: ShoppingBagIcon,
        title: "Role",
      },
      {
        href: "/staff/employee-profile",
        icon: ShoppingBagIcon,
        title: "Employee Profile",
      },
      {
        href: "/staff/last-login",
        icon: ShoppingBagIcon,
        title: "Last Login",
      },
    ],
  },
  {
    href: "/dashboard/employee",
    icon: BarChartIcon,
    title: "Employee",
  },
  {
    href: "/dashboard/payroll",
    icon: UsersIcon,
    title: "Payroll",
    items: [
      {
        href: "/payroll/set-salary",
        icon: ShoppingBagIcon,
        title: "Set Salary",
      },
      {
        href: "/payroll/pay-slip",
        icon: ShoppingBagIcon,
        title: "Pay Slip",
      },
    ],
  },
  {
    href: "/dashboard/timesheet",
    icon: ShoppingBagIcon,
    title: "TimeSheet",
    items: [
      {
        href: "/timesheet/manage-timesheet",
        icon: ShoppingBagIcon,
        title: "TimeSheet",
      },
      {
        href: "/timesheet/manage-leave",
        icon: ShoppingBagIcon,
        title: "Manage Leave",
      },
      {
        href: "/dashboard/attendance",
        icon: ShoppingBagIcon,
        title: "Attendance",
        items: [
          {
            href: "/timesheet/attendance/manage-marked-attendance",
            icon: ShoppingBagIcon,
            title: "Manrked Attendance",
          },
          {
            href: "/timesheet/attendance/manage-bulk-attendance",
            icon: ShoppingBagIcon,
            title: "Bulk Attendance",
          },
        ],
      },
    ],
  },
  {
    href: "/dashboard/performance",
    icon: UsersIcon,
    title: "Performance",
    items: [
      {
        href: "/performance/indicator",
        icon: ShoppingBagIcon,
        title: "Indicator",
      },
      {
        href: "/performance/appraisal",
        icon: ShoppingBagIcon,
        title: "Appraisal",
      },
      {
        href: "/performance/goal-tracking",
        icon: ShoppingBagIcon,
        title: "Goal Tracking",
      },
    ],
  },
  {
    href: "/dashboard/finance",
    icon: UsersIcon,
    title: "Finance",
    items: [
      {
        href: "/finance/account-list",
        icon: ShoppingBagIcon,
        title: "Account List",
      },
      {
        href: "/finance/payees",
        icon: ShoppingBagIcon,
        title: "Payees",
      },
      {
        href: "/finance/payers",
        icon: ShoppingBagIcon,
        title: "Payers",
      },
      {
        href: "/finance/deposit",
        icon: ShoppingBagIcon,
        title: "Deposit",
      },
      {
        href: "/finance/expense",
        icon: ShoppingBagIcon,
        title: "Expense",
      },
      {
        href: "/finance/transfer-balance",
        icon: ShoppingBagIcon,
        title: "Transfer Balance",
      },
    ],
  },
  {
    href: "/dashboard/training",
    icon: UsersIcon,
    title: "Training",
    items: [
      {
        href: "/training/training-list",
        icon: ShoppingBagIcon,
        title: "Training List",
      },
      {
        href: "/training/trainer",
        icon: ShoppingBagIcon,
        title: "Trainer",
      },
    ],
  },
  {
    href: "/dashboard/hr",
    icon: UsersIcon,
    title: "HR",
    items: [
      {
        href: "/hr/award",
        icon: ShoppingBagIcon,
        title: "Award",
      },
      {
        href: "/hr/transfer",
        icon: ShoppingBagIcon,
        title: "Transfer",
      },
      {
        href: "/hr/resignation",
        icon: ShoppingBagIcon,
        title: "Resignation",
      },
      {
        href: "/hr/trip",
        icon: ShoppingBagIcon,
        title: "Trip",
      },
      {
        href: "/hr/promotion",
        icon: ShoppingBagIcon,
        title: "Promotion",
      },
      {
        href: "/hr/complaints",
        icon: ShoppingBagIcon,
        title: "Compliants",
      },
      {
        href: "/hr/warning",
        icon: ShoppingBagIcon,
        title: "Warning",
      },
      {
        href: "/hr/termination",
        icon: ShoppingBagIcon,
        title: "Termination",
      },
      {
        href: "/hr/announcement",
        icon: ShoppingBagIcon,
        title: "Announcement",
      },
      {
        href: "/dashboard/holidays",
        icon: ShoppingBagIcon,
        title: "Holidays",
      },
    ],
  },
  {
    href: "/dashboard/recruitment",
    icon: UsersIcon,
    title: "Recruitment",
    items: [
      {
        href: "/recruitment/jobs ",
        icon: ShoppingBagIcon,
        title: "Jobs",
      },
      {
        href: "/dashboard/job-application",
        icon: ShoppingBagIcon,
        title: "Job Application",
      },
      {
        href: "/dashboard/job-candidate",
        icon: ShoppingBagIcon,
        title: "Job Candidate",
      },
      {
        href: "/dashboard/job-onboard",
        icon: UserIcon,
        title: "Job OnBoard",
      },
      {
        href: "/dashboard/custom-question",
        icon: UserIcon,
        title: "Custom Question",
      },
      {
        href: "/dashboard/interview-schedule",
        icon: UserIcon,
        title: "Interview Schedule",
      },
      {
        href: "/dashboard/career",
        icon: UserIcon,
        title: "Career",
      },
    ],
  },
  {
    href: "/dashboard/messenger",
    icon: UserIcon,
    title: "Messenger",
  },
  {
    href: "/dashboard/ticket",
    icon: UserIcon,
    title: "Ticket",
  },
  {
    href: "/event",
    icon: UserIcon,
    title: "Event",
  },
  {
    href: "/dashboard/meeting",
    icon: UserIcon,
    title: "Meeting",
  },
  {
    href: "/dashboard/client",
    icon: UserIcon,
    title: "client",
  },
  {
    href: "/dashboard/assets",
    icon: UserIcon,
    title: "Assets",
  },
  {
    href: "/dashboard/document",
    icon: UserIcon,
    title: "Document",
  },
  {
    href: "/dashboard/company-policy",
    icon: UserIcon,
    title: "Company Policy",
  },
  {
    href: "/dashboard/report",
    icon: UserIcon,
    title: "Report",
    items: [
      {
        href: "/report/income-vs-expense",
        icon: UserIcon,
        title: "Income Vs Expense",
      },
      {
        href: "/report/monthly-attendance",
        icon: UserIcon,
        title: "Monthly Attendance",
      },
      {
        href: "/report/leave",
        icon: UserIcon,
        title: "Leave",
      },
      {
        href: "/report/account-statement",
        icon: UserIcon,
        title: "Account Statement",
      },
      {
        href: "/report/payroll",
        icon: UserIcon,
        title: "Payroll",
      },
      {
        href: "/report/timesheet",
        icon: UserIcon,
        title: "Timesheet",
      },
    ],
  },
  {
    href: "/constant/constant",
    icon: UserIcon,
    title: "Constant",
    items: [
      {
        href: "/constant/branch",
        icon: UserIcon,
        title: "Branch",
      },
      {
        href: "/constant/department",
        icon: UserIcon,
        title: "Department",
      },
      {
        href: "/constant/designation",
        icon: UserIcon,
        title: "Designation",
      },
      {
        href: "/constant/document-type",
        icon: UserIcon,
        title: "Document Type",
      },
      {
        href: "/constant/award-type",
        icon: UserIcon,
        title: "Award Type",
      },
      {
        href: "/constant/payslip-type",
        icon: UserIcon,
        title: "Payslip Type",
      },
      {
        href: "/constant/allowance-option",
        icon: UserIcon,
        title: "Allowance Option",
      },
      {
        href: "/constant/loan-option",
        icon: UserIcon,
        title: "Loan Option",
      },
      {
        href: "/constant/deduction-option",
        icon: UserIcon,
        title: "Deduction Option",
      },
      {
        href: "/constant/expense-type",
        icon: UserIcon,
        title: "Expense Type",
      },
      {
        href: "/constant/income-type",
        icon: UserIcon,
        title: "Income Type",
      },
      {
        href: "/constant/payment-type",
        icon: UserIcon,
        title: "Payment Type",
      },
      {
        href: "/constant/leave-type",
        icon: UserIcon,
        title: "Leave Type",
      },
      {
        href: "/constant/termination-type",
        icon: UserIcon,
        title: "Termination Type",
      },
      {
        href: "/constant/goal-type",
        icon: UserIcon,
        title: "Goal Type",
      },
      {
        href: "/constant/training-type",
        icon: UserIcon,
        title: "Training Type",
      },
      {
        href: "/constant/job-category",
        icon: UserIcon,
        title: "Job Category",
      },
      {
        href: "/constant/job-stage",
        icon: UserIcon,
        title: "Job Stage",
      },
    ],
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    title: "System Setting",
  },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem2
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              items={item.items}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
