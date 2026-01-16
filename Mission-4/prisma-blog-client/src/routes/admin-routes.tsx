import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Create user",
        url: "/create-user",
      },
      {
        title: "Manage user",
        url: "/manage-user",
      },
    ],
  },
];
