import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import CartItem from '@/components/CartItem';
import CartOrder from '@/components/CartOrder';
import { Accommodation } from '@/lib/types/accommodation';
import { useAuth } from '@/store/authStore';
import { fetchLodgment, fetchRoomListMSW } from '@/api';

const Cart = () => {
  const { user } = useAuth(); // 로그인한 사용자 정보
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const theme = useTheme();
  const [items, setItems] = useState<Accommodation[]>([]);
  const [selectedItems, setSelectedItems] = useState<Accommodation[]>([]);

  useEffect(() => {
    fetchLodgment().then((response) => {
      setItems(response);
      setLoading(false);
    });
  }, []);

  const handleSelectItem = (accommodationItem: Accommodation, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems((prev) => [...prev, accommodationItem]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== accommodationItem.id));
    }
  };

  // if (loading) {
  //   return (
  //     <Flex direction="column" justifyContent="center" alignItems="center" minHeight="calc(100vh - 80px)" p={10}>
  //       <Text>로딩 중...</Text>
  //     </Flex>
  //   );
  // }

  return (
    <Flex direction="column" justifyContent="flex-start" minHeight="calc(100vh - 80px)" p={10} alignItems="center">
      <Box width="100%" maxWidth="1240px" mx="auto" paddingTop="8rem">
        <Text mb={4} textAlign="left" fontWeight="900" fontSize="3rem">
          장바구니
        </Text>

        {items.length === 0 ? (
          <Box
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            p={10}
            mb={3}
            border={`1px solid ${theme.colors.main}`}
            borderRadius="xl">
            <Text height="60vh" fontWeight="500" fontSize="2rem">
              장바구니가 비어 있습니다.
            </Text>
          </Box>
        ) : (
          <Flex width="100%" gap="1rem">
            <Flex flex="1" direction="column">
              <CartItem items={items} onSelectItem={handleSelectItem} />
            </Flex>
            <Flex flex="1" direction="column">
              <CartOrder selectedItems={selectedItems} />
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Cart;
