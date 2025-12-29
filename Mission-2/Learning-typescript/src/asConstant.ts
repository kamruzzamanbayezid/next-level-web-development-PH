{
  const UserRole = {
    admin: "Admin",
    moderator: "Moderator",
    user: "User",
  } as const;

  //   console.log(UserRole.admin);

  const getRolePermission = (
    role: (typeof UserRole)[keyof typeof UserRole]
  ) => {
    if (role === UserRole.admin) {
      return "Full Access";
    } else if (role === UserRole.moderator) {
      return "Limited Access";
    } else {
      return "Read Only";
    }
  };

  //     console.log(getRolePermission(UserRole.admin));
  //     console.log(getRolePermission(UserRole.moderator));
  //     console.log(getRolePermission(UserRole.user));

  //? Conditional type

  type UserRole = {
    admin: "Admin";
    moderator: "Moderator";
    user: "User";
  };

  type checkUser<T> = T extends keyof UserRole ? "valid User" : "Guest User";

  type isValidUser = checkUser<"user">;
  
}
