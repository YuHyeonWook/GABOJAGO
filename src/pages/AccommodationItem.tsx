import { Accommodation, Rooms } from '@/lib/types/accommodation';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cart from '@/assets/images/cart.svg?react';
import { ReservationModal } from '@/lib/common/ReservationModal';
import RoomDetailModal from '@/lib/common/RoomDetailModal';
import { ToastAlert } from '@/lib/common/ToastAlert';
import { useCartStore } from '@/store/cartStore';
import { getAccommodationById } from '@/api/accommodation/accommodationApi';
import { getRoomList } from '@/api/accommodation/roomApi';
import { createCartItems } from '@/api/cart/cartItemsApi';
import dayjs from 'dayjs';
import { configureDayjs } from '@/lib/constants/dayjsConfig';

const AccommodationItem = () => {
  const { accommodationId } = useParams();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRooms, setSelectedRooms] = useState<Rooms>({
    id: 0,
    imageList: [],
    roomType: '',
    roomTypeName: '',
    roomPrice: 0,
    roomExtraPrice: 0,
    roomStock: 0,
    roomDefaultGuest: 0,
    roomMaxGuest: 0,
    comment: '',
    start_date: '',
    end_date: '',
  });
  const [roomList, setRoomList] = useState<Rooms[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showToast = ToastAlert();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const accommodationIdNumber = parseInt(accommodationId ?? '0', 10);
    getAccommodationById(accommodationIdNumber)
      .then((response) => {
        const { content } = response.data.data;
        setAccommodations(content);
      })
      .catch((error) => {
        const errorTime = new Date().toISOString();
        console.error(`[${errorTime}] Error  data:`, error);
      });
  }, [accommodationId]);

  useEffect(() => {
    const accommodationIdNumber = parseInt(accommodationId ?? '0', 10);
    getRoomList(accommodationIdNumber)
      .then((response) => {
        const { data } = response?.data;
        setRoomList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  configureDayjs(); // dayjs 한국 시간 설정

  /**
   * 특정 객실을 "지금 예약하기" 누르면 결제정보 페이지도 이동되는 함수
   * @return void
   */
  const handleConfirm = () => {
    if (selectedRooms) {
      const today = dayjs().tz().format('YYYY-MM-DDTHH:mm:ssZ');
      const tomorrow = dayjs().tz().add(1, 'day').format('YYYY-MM-DDTHH:mm:ssZ');

      const updatedSelectedRooms = {
        ...selectedRooms,
        startDate: today.split('T')[0],
        endDate: tomorrow.split('T')[0],
      };

      navigate(`/order/${selectedRooms.id}`, { state: { selectedBookingRoom: updatedSelectedRooms } });
    }
    onClose();
  };

  /**
   * 객실 "지금 예약하기" 버튼 클릭 시 실행되는 함수
   * @param room 선택된 방의 정보 data
   * @return void
   */
  const handlePayment = (room: SetStateAction<Rooms>) => {
    setSelectedRooms(room);
    onOpen();
  };

  /**
   * 객실 이미지, 객실 이름 클릭 시  객실 상세 Modal 실행되는 함수
   * @param room 선택된 방의 정보 data
   * @return void
   */
  const handleRoomClick = (room: Rooms) => {
    setSelectedRooms(room);
    setIsModalOpen(true);
  };

  /**
   * 객실 상세 Modal 닫고 선택된 객실 정보 초기화 함수
   * @return void
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRooms({
      id: 0,
      imageList: [],
      roomType: '',
      roomTypeName: '',
      roomPrice: 0,
      roomExtraPrice: 0,
      roomStock: 0,
      roomDefaultGuest: 0,
      roomMaxGuest: 0,
      comment: '',
      start_date: '',
      end_date: '',
    });
  };

  /**
   * 장바구니에 추가하는 함수
   * @param roomId 선택된 방의 id
   * @return void
   */
  const handleAddToCart = (roomId: string) => {
    const selectedRoomForCart = accommodations[0].roomList.find((room) => room.id === parseInt(roomId, 10));
    if (selectedRoomForCart) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const payload = {
        roomId: selectedRoomForCart.id,
        startDate: today,
        endDate: tomorrow,
      };
      createCartItems(payload)
        .then((response) => {
          addToCart(response.data.data);
          showToast({
            title: `객실 ${selectedRoomForCart.roomTypeName}이 장바구니에 추가되었습니다.`,
            description: '',
            status: 'success',
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          showToast({
            title: '객실을 장바구니에 추가하는 도중 오류가 발생했습니다.',
            description: '',
            status: 'error',
          });
        });
    }
  };

  return (
    <>
      <Box paddingX="15rem">
        <Flex justify="center" flexDirection="column" alignItems="center" paddingTop="10rem">
          <List>
            {accommodations.map((accommodation, _) => (
              <ListItem key={accommodationId}>
                <Heading marginBottom="2rem" fontSize="3rem">
                  {accommodation.name}
                </Heading>
                <Text
                  display="flex"
                  justifyContent="end"
                  color="red"
                  fontSize="2.5rem"
                  fontWeight="600"
                  marginBottom="2rem"></Text>
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap=".5rem"
                  margin="0 auto 2.4rem"
                  borderRadius="1rem">
                  {accommodation.imageList.map((image, index) => (
                    <GridItem key={index} colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1}>
                      <Image
                        src={image.url}
                        alt={accommodation.name}
                        width="100%"
                        height={index === 0 ? '100%' : '100%'}
                        objectFit="cover"
                        borderRadius={
                          index === 0 ? '1rem 0 0 1rem' : index === 2 ? '0 1rem 0 0' : index === 4 ? '0 0 1rem 0' : ''
                        }
                      />
                    </GridItem>
                  ))}
                </Grid>
                <Text fontSize="1.6rem">{accommodation.address}</Text>
                <Text fontSize="1.6rem" fontWeight="600">
                  {accommodation.numbers}
                </Text>
                <Text
                  marginTop="2rem"
                  fontWeight="600"
                  fontSize="2rem"
                  borderBottom="1px solid"
                  borderColor="grayLight">
                  숙소 소개
                </Text>
                <Text fontSize="1.8rem" marginBottom="2rem" color="gray">
                  {accommodation.comment}
                </Text>
                {roomList && (
                  <List display="flex" flexDirection="column" gap="1rem">
                    <Heading paddingBottom="1rem" borderBottom="1px solid" borderColor="grayLight">
                      객실을 선택하세요
                    </Heading>
                    {roomList.map((room, _) => (
                      <ListItem
                        key={room.id}
                        borderBottom="1px solid"
                        borderColor="grayLight"
                        display="flex"
                        justifyContent="space-between"
                        padding="2rem 0"
                        gap="1rem">
                        <Flex gap="4rem">
                          {room.imageList?.map((image, index) => (
                            <Image
                              onClick={() => handleRoomClick(room)}
                              key={index}
                              src={image.url}
                              alt={room.roomTypeName}
                              width="20vw"
                              height="30vh"
                              borderRadius="1rem"
                              marginBottom="1rem"
                              _hover={{ cursor: 'pointer', opacity: '0.8' }}
                            />
                          ))}
                          <Flex flexDirection="column" gap=".5rem">
                            <Heading
                              onClick={() => handleRoomClick(room)}
                              fontSize="2rem"
                              cursor="pointer"
                              _hover={{
                                color: 'main',
                                opacity: '0.6',
                              }}>
                              {room.roomTypeName}
                            </Heading>
                            <Box display="flex" flexDirection="column" paddingLeft="1rem" gap=".5rem">
                              <Text fontSize="1.6rem">{room.roomType}</Text>
                              <Text fontSize="1.6rem">
                                기준 {room.roomDefaultGuest}인 / 최대 {room.roomMaxGuest}명
                              </Text>
                              <Text fontSize="1.6rem" display="flex" gap=".5rem">
                                추가금액:{' '}
                                <span style={{ color: 'red' }}>
                                  {`${room.roomPrice.toLocaleString('ko-KR', {
                                    style: 'decimal',
                                    currency: 'KRW',
                                  })}원`}
                                </span>
                              </Text>
                              <Text fontSize="1.6rem">객실 소개: {room.comment}</Text>
                              <Text fontSize="1.8rem">
                                객실 재고: <span style={{ color: 'red' }}>{room.roomStock}</span>
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                        <Flex gap=".5rem" alignItems="end">
                          <Button
                            onClick={() => handleAddToCart(room.id.toString())}
                            paddingY="1.8rem"
                            background="white"
                            border=".1rem solid "
                            borderColor="grayLight"
                            borderRadius=".5rem"
                            color="main"
                            _hover={{
                              background: 'main',
                              color: 'white',
                            }}
                            disabled={room.roomStock === 0}>
                            <Cart width="3rem" height="3.5rem" />
                          </Button>
                          <Flex flexDirection="column" gap="1rem">
                            <Text
                              display="flex"
                              justifyContent="flex-end"
                              marginRight=".1rem"
                              alignItems="end"
                              fontSize="2rem"
                              color="price"
                              fontWeight="600">
                              {`${room.roomPrice.toLocaleString('ko-KR', {
                                style: 'decimal',
                                currency: 'KRW',
                              })}원`}
                            </Text>
                            <Button
                              onClick={() => handlePayment(room)}
                              padding="1.8rem"
                              background="main"
                              border=".1rem solid "
                              borderRadius=".5rem"
                              borderColor="grayLight"
                              color="white"
                              fontSize="1.6rem"
                              _hover={{
                                background: 'primaryHover',
                                color: 'white',
                              }}
                              disabled={room.roomStock === 0}>
                              지금 예약하기
                            </Button>
                          </Flex>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                )}
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
      <ReservationModal
        isOpen={isOpen}
        onClose={onClose}
        title="이 객실을 예약하시겠습니까?"
        body={
          <Box>
            <Text>객실 이름: {selectedRooms.roomTypeName}</Text>
            <Text>객실 타입: {selectedRooms.roomType}</Text>
            <Text>
              가격:{' '}
              {`${selectedRooms.roomPrice.toLocaleString('ko-KR', {
                style: 'decimal',
                currency: 'KRW',
              })}원`}
            </Text>
          </Box>
        }
        confirmButtonText="예약하기"
        cancelButtonText="아니오"
        onConfirm={handleConfirm}
      />
      <RoomDetailModal isOpen={isModalOpen} onClose={handleCloseModal} selectedRooms={selectedRooms} />
    </>
  );
};

export default AccommodationItem;
