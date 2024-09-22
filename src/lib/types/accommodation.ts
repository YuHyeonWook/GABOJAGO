export type CombinedAccommodationRooms = Accommodation & Rooms;

export type Accommodation = {
  imageList: { url: string }[];
  id: number;
  name: string;
  address: string;
  numbers: number;
  comment: string;
  thumbnail: string;
  price: number;
  roomList: Rooms[];
  length?: number;
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
  end_date?: string;
  start_date?: string;
};

export type AccommodationListProps = {
  accommodation: Accommodation[];
};

export type RoomListType = {
  roomList: Rooms[];
};

export type RoomListResponse = {
  data: Rooms[];
};

export type AccommodationResponse = {
  data: {
    content: Accommodation[];
  };
};
