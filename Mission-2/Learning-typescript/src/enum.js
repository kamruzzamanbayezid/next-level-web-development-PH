var UserRole;
(function (UserRole) {
    UserRole["admin"] = "Admin";
    UserRole["moderator"] = "Moderator";
    UserRole["user"] = "User";
})(UserRole || (UserRole = {}));
var getRolePermission = function (role) {
    if (role === UserRole.admin) {
        return "Full Access";
    }
    else if (role === UserRole.moderator) {
        return "Limited Access";
    }
    else {
        return "Read Only";
    }
};
console.log(getRolePermission(UserRole.admin));
console.log(getRolePermission(UserRole.moderator));
console.log(getRolePermission(UserRole.user));
