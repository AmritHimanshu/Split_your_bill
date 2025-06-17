export type userSchema = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  uniqueID: string;
};

export type IUserState = {
  userState: userSchema | null;
};