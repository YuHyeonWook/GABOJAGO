export type OrderData = {
  id: number;
  isActive: boolean;
  createdAt: string;
  totalPrice: number;
  status: string;
  updatedAt: string;
  doneRoomList: Rooms[];
};

export type selectedCartRooms = {
  room: Rooms;
  id: number;
  start_date: string;
  end_date: string;
  cart_item_id: number;
};

export type OrderDetailsProps = {
  selectedCartRooms: selectedCartRooms[];
  selectedBookingRoom: Rooms;
};

export type Rooms = {
  id: number;
  imageList: { url: string }[];
  roomType: string;
  roomTypeName: string;
  roomPrice: number;
  roomExtraPrice: number;
  roomStock: number;
  roomDefaultGuest: number;
  roomMaxGuest: number;
  comment: string;
  cart_item_id?: number;
  endDate?: string;
  startDate?: string;
};

export type OrderResponse = {
  data: OrderData;
};
