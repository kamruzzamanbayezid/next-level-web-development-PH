enum UserRole {
  admin = "Admin",
  moderator = "Moderator",
  user = "User",
}

const getRolePermission = (role: UserRole) => {
  if (role === UserRole.admin) {
    return "Full Access";
  } else if (role === UserRole.moderator) {
    return "Limited Access";
  } else {
    return "Read Only";
  }
};

console.log(getRolePermission(UserRole.admin));
console.log(getRolePermission(UserRole.moderator));
console.log(getRolePermission(UserRole.user));
