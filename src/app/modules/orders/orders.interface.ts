export type OrderBook = {
  bookId: string;
  quantity: number;
};

export type IOrderRequest = {
  orderedBooks: OrderBook[];
};
