export type TapiResponseType<T> = {
  status: "success" | "error";
  msg: string;
  data: T;
};

export type TapiPaginationResponse = {
  has_next_page: boolean;
  next_cursor: string | null;
};
