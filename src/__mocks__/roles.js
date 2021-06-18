import { v4 as uuid } from "uuid";

export default [
  {
    id: uuid(),
    role: "Accountant",
    createdAt: 1555016400000,
    permissions: ["Manage User", "Create User", "Edit User"],
  },
  {
    id: uuid(),
    role: "HR",
    createdAt: 1555016400000,
    permissions: [
      "Manage User",
      "Create User",
      "Edit User",
      "Manage User",
      "Create User",
      "Edit User",
    ],
  },
  {
    id: uuid(),
    role: "Employee",
    createdAt: 1555016400000,
    permissions: ["Manage User", "Create User", "Edit User"],
  },
];
