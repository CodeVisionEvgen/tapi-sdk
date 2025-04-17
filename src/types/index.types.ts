export type TapiResponseType<T> = {
  data: T;
} & TapiBasicResponse;
export type TapiBasicResponse = {
  status: "success" | "error";
  msg: string;
};

export type TapiPaginationResponse = {
  has_next_page: boolean;
  next_cursor: string | null;
};
