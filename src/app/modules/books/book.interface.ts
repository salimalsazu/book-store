
export type IUserLoginResponse = {
  accessToken: string;
};
export type IBookFilterRequest = {
  search?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  category?: string | undefined;
};

