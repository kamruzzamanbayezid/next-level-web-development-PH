{
  type Roles = "admin" | "moderator" | "user";

  type Person = {
    name: string;
    age: number;
  };

  type RecordType = Record<Roles, string>;
  type ReadOnlyType = Readonly<Person>;

  const User: RecordType = {
    admin: "admin",
    moderator: "moderator",
    user: "user",
  };
}
