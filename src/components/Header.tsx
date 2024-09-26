import { Box, Flex, Heading, Button, Spacer, Text, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import Logo from '@/assets/logo.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { DropdownRef } from '@/lib/types/searchBar';
import { CartItems } from '@/lib/types/cart';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef: DropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const cartRooms = useCartStore<CartItems[]>((state) => state.cartRooms);

  const handleUserNameClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleScroll = () => {
    if (targetRef.current) {
      if (window.scrollY >= 300) {
        targetRef.current.style.visibility = 'hidden';
      } else {
        targetRef.current.style.visibility = 'visible';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Box
      ref={targetRef}
      color="main"
      height="8rem"
      boxShadow="0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.03)"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="50"
      background="white">
      <Flex height="8rem" align="center" paddingX="4.75rem">
        <Heading _hover={{ opacity: '0.6' }}>
          <Link to="/">
            <Logo />
          </Link>
        </Heading>
        <Spacer />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Box display="flex" alignItems="center" paddingRight="2vw" cursor="pointer" onClick={handleUserNameClick}>
                <Text fontSize="2.4rem">{user.name} 님</Text>
                {showDropdown && (
                  <PopoverContent
                    top="1.3vh"
                    right="1.2vw"
                    width="9vw"
                    height="23.6vh"
                    border="1px solid"
                    borderColor="grayLight"
                    color="black"
                    borderRadius="0 0 .5rem .5rem"
                    shadow="0 0.8rem 1.5rem 0 rgba(0, 0, 0, 0.09),"
                    ref={dropdownRef}>
                    <Flex flexDirection="column" align="center" gap="1vh" fontSize="2rem" color="black">
                      <Text
                        onClick={() => navigate('/mypage')}
                        color="black"
                        marginTop="2.5vh"
                        _hover={{
                          color: 'main',
                          opacity: '0.6',
                        }}>
                        마이페이지
                      </Text>
                      <Text onClick={() => navigate('/cart')} _hover={{ color: 'main', opacity: '0.6' }}>
                        장바구니 {cartRooms.length > 0 && `(${cartRooms.length})`}
                      </Text>
                      <Text onClick={() => navigate('/orderhistory')} _hover={{ color: 'main', opacity: '0.6' }}>
                        주문내역
                      </Text>
                      <Button
                        width="7vw"
                        height="4vh"
                        marginTop="1.8rem"
                        backgroundColor="main"
                        fontSize="2rem"
                        color="white"
                        borderRadius=".8rem"
                        _hover={{
                          background: 'primaryHover',
                        }}
                        onClick={handleLogout}>
                        로그아웃
                      </Button>
                    </Flex>
                  </PopoverContent>
                )}
              </Box>
            </PopoverTrigger>
          </Popover>
        ) : (
          <Box display="flex" gap="1.5rem">
            <Link to="/signin">
              <Button
                padding="1.8rem"
                background="white"
                border=".1rem solid "
                borderColor="main"
                borderRadius=".5rem"
                fontSize="1.8rem"
                color="main"
                _hover={{
                  background: 'main',
                  color: 'white',
                }}>
                로그인
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                padding="1.8rem"
                background="main"
                border=".1rem solid "
                borderRadius=".5rem"
                borderColor="main"
                color="white"
                fontSize="1.8rem"
                _hover={{
                  background: 'primaryHover',
                }}>
                회원가입
              </Button>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
