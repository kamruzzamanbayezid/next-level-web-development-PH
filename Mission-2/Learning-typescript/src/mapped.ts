type ObjOfNum = {
  height: number;
  width: string;
};

type ObjOfStr = {
  [key in keyof ObjOfNum]: string;
};

type objOfBoolean = {
  [key in keyof ObjOfNum]: boolean;
};

type GenericObj<T> = {
  [Key in keyof T]: T[Key];
};

type Area = GenericObj<ObjOfNum>;

type UserInfo = {
  name: string;
  age: number;
  hasPhone: boolean;
};

type CustomInfo<T> = {
  [info in keyof T]: T[info];
};

type Bayezid = CustomInfo<UserInfo>;

const bayezid: Bayezid = {
  name: "Kamruzzaman bayezid",
  age: 22,
  hasPhone: true,
};
