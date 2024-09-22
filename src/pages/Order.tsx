import React, { useState } from 'react';
import { Flex, Box, Text, Checkbox, useTheme, Tooltip } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderDetails from '@/components/OrderDetails';
import { CustomCheckboxProps } from '@/lib/types/customCheckbox';
import { selectedCartRooms } from '@/lib/types/order';
import { postOrder } from '@/api/order/orderApi';

const CustomCheckbox = ({ onChange, ...props }: CustomCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <Checkbox
      {...props}
      onChange={handleChange}
      sx={{
        '& .chakra-checkbox__control': {
          width: '2rem',
          height: '2rem',
        },
        '& .chakra-checkbox__icon': {
          fontSize: '2.5rem',
        },
      }}
    />
  );
};

const Order = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const location = useLocation();
  const selectedCartRooms: selectedCartRooms[] = location.state?.selectedCartRooms || [];
  const selectedBookingRoom = location.state?.selectedBookingRoom || null;
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsCheckboxChecked(isChecked);
  };
  console.log('selectedBookingRoom', selectedBookingRoom);
  console.log('selectedCartRooms', selectedCartRooms);

  const handlePayment = async () => {
    if (isCheckboxChecked) {
      try {
        const requestOrderList =
          selectedCartRooms.length > 0
            ? selectedCartRooms.map((selectedCartRoom) => ({
                id: selectedCartRoom.room.id,
                startDate: selectedCartRoom.start_date,
                endDate: selectedCartRoom.end_date,
              }))
            : [
                {
                  id: selectedBookingRoom.id,
                  startDate: selectedBookingRoom.startDate,
                  endDate: selectedBookingRoom.endDate,
                },
              ];

        const totalPrice =
          selectedCartRooms.length > 0
            ? selectedCartRooms.reduce((accumulator, current) => accumulator + current.room.roomPrice, 0)
            : selectedBookingRoom.roomPrice;

        const response = await postOrder({ requestOrderList, totalPrice });

        navigate(`/order/payment/${response.data.data.id}`);
      } catch (error) {
        console.error('주문 생성 실패:', error);
      }
    }
  };

  if ((!selectedCartRooms || selectedCartRooms.length === 0) && !selectedBookingRoom) {
    return (
      <Flex direction="column" justifyContent="flex-start" alignItems="center" minHeight="calc(100vh - 80px)" p={4}>
        <Text>데이터를 불러오는 중 오류가 발생했습니다.</Text>
      </Flex>
    );
  }

  const totalAmount =
    selectedCartRooms.length > 0
      ? selectedCartRooms.reduce((accumulator, current) => accumulator + current.room.roomPrice, 0)
      : selectedBookingRoom.roomPrice;

  return (
    <>
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        minHeight="calc(100vh - 80px)"
        p={4}
        px={20}>
        <Box width="100%" maxWidth="1240px" paddingTop="8rem">
          <Text mb={4} textAlign="left" fontWeight="900" fontSize="3rem">
            예약 결제
          </Text>
          <OrderDetails selectedCartRooms={selectedCartRooms} selectedBookingRoom={selectedBookingRoom} />
          <Box
            width="100%"
            padding="2.5rem"
            marginTop="5rem"
            border="1px solid"
            borderColor="main"
            borderRadius="1.5rem"
            background="background">
            <Flex justifyContent="space-between" width="100%">
              <Text fontSize="3rem" fontWeight="900">
                총 결제금액
              </Text>
              <Text fontSize="3rem" color="price">
                {totalAmount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
              </Text>
            </Flex>
          </Box>
          <Flex mt={4} alignItems="center">
            <CustomCheckbox onChange={handleCheckboxChange} colorScheme="teal" borderColor="main" />
            <Text marginLeft="1rem" fontSize="1.5rem">
              [필수] 만 14세 이상 이용 동의
            </Text>
          </Flex>
          <Tooltip fontSize="1.7rem" color="black" label="필수 동의를 체크해 주세요" isDisabled={isCheckboxChecked}>
            <Box
              width="100%"
              padding="2.2rem"
              marginTop="5rem"
              border="1px solid gray"
              borderRadius="1.5rem"
              background={isCheckboxChecked ? theme.colors.main : theme.colors.gray}
              onClick={handlePayment}
              cursor={isCheckboxChecked ? 'pointer' : 'not-allowed'}>
              <Flex width="100%" justifyContent="center" alignItems="center">
                <Text textAlign="center" fontSize="3rem" color="white">
                  {`${totalAmount.toLocaleString('ko-KR', {
                    style: 'decimal',
                    currency: 'KRW',
                  })}원`}{' '}
                  결제하기
                </Text>
              </Flex>
            </Box>
          </Tooltip>
        </Box>
      </Flex>
    </>
  );
};

export default Order;
