import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { SearchIcon, ChevronDownIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import People from '../assets/people.svg?react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [guest, setGuest] = useState<number>(2);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const incrementGuestCount = () => {
    setGuest((prevCount) => (prevCount < 30 ? prevCount + 1 : prevCount));
  };

  const decrementGuestCount = () => {
    setGuest((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  const handleClickSearchBtn = () => {
    const query = new URLSearchParams({
      keyword,
      start: startDate,
      end: endDate,
      guest: guest.toString(),
    }).toString();

    navigate(`/?${query}`);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    if (targetRef.current) {
      const style = targetRef.current.style;
      if (window.scrollY >= 300) {
        style.display = 'flex';
        style.justifyContent = 'center';
        style.alignItems = 'center';
        style.position = 'fixed';
        style.top = '4.4vh';
        style.height = '9vh';
        style.backgroundColor = 'var(--color-banner)';
        style.zIndex = '100';
      } else {
        style.position = 'absolute';
        style.top = '50%';
        style.transform = 'translateY(-50%)';
        style.backgroundColor = 'initial';
        style.zIndex = '10';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const inputWidth = useBreakpointValue({ base: '90vw', md: '29.9vw' });
  const datepickerWidth = useBreakpointValue({ base: '90vw', md: '27.8vw' });
  const guestWidth = useBreakpointValue({ base: '90vw', md: '18.1vw' });
  const buttonWidth = useBreakpointValue({ base: '90vw', md: '12.5vw' });
  const inputFontSize = useBreakpointValue({ base: '1.2rem', md: '1.7rem' });
  const buttonFontSize = useBreakpointValue({ base: '2rem', md: '3rem' });
  const height = useBreakpointValue({ base: '5vh', md: '6.5vh' });

  return (
    <div
      ref={targetRef}
      className="searchBar"
      style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0', left: '0' }}>
      <Flex justify="center" align="center">
        <Box position="absolute" width={useBreakpointValue({ base: '95vw', md: '90.3vw' })} height={height}>
          <Flex justifyContent="space-between" align="center" wrap="wrap">
            <InputGroup width={inputWidth}>
              <InputLeftElement width="3vw" height={height} paddingLeft=".5vw">
                <SearchIcon color="gray" w={7} h={7} />
              </InputLeftElement>
              <Input
                type="text"
                height={height}
                padding="0 5.5rem"
                border=".1rem solid var(--color-main)"
                borderRadius=".8rem"
                backgroundColor="white"
                fontSize={inputFontSize}
                placeholder="어디로 가실건가요?   ex) 서울, 대구"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                _focusVisible={{ outline: 'none' }}
              />
            </InputGroup>
            <InputGroup
              width={datepickerWidth}
              height={height}
              border=".1rem solid var(--color-main)"
              borderRadius=".8rem"
              backgroundColor="white">
              <Flex align="center" width="100%">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  height={height}
                  padding="0 3.5vw"
                  border=".1rem solid var(--color-main)"
                  borderRadius=".8rem"
                  backgroundColor="white"
                  fontSize={inputFontSize}
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  height={height}
                  padding="0 3.5vw"
                  border=".1rem solid var(--color-main)"
                  borderRadius=".8rem"
                  backgroundColor="white"
                  fontSize={inputFontSize}
                />
              </Flex>
            </InputGroup>

            <InputGroup width={guestWidth} position="relative" ref={dropdownRef}>
              <InputLeftElement width="3vw" height={height} paddingLeft=".5vw">
                <People />
              </InputLeftElement>
              <Input
                type="number"
                height={height}
                padding="0 3.5vw"
                border=".1rem solid var(--color-main)"
                borderRadius=".8rem"
                backgroundColor="white"
                fontSize={inputFontSize}
                placeholder={`인원 ${guest}명`}
                _focusVisible={{ outline: 'none' }}
                value={`인원 ${guest}명`}
                readOnly
              />
              <InputRightElement>
                <ChevronDownIcon
                  w={10}
                  h={10}
                  color="gray"
                  marginTop="3.5vh"
                  marginRight="1vw"
                  cursor="pointer"
                  onClick={toggleDropdown}
                />
              </InputRightElement>
              {showDropdown && (
                <Box
                  position="absolute"
                  top="100%"
                  right="0"
                  width="80%"
                  border=".1rem solid var(--color-main)"
                  borderRadius=".8rem"
                  backgroundColor="white"
                  zIndex="10"
                  padding="1vh 1vw"
                  height="8vh">
                  <Flex height="100%" justify="space-between" align="center" fontSize="1.5rem">
                    <Button onClick={decrementGuestCount} fontSize="2rem" fontWeight="200">
                      <MinusIcon w={6} h={6} color="gray" />
                    </Button>
                    <Box>인원 {guest}명</Box>
                    <Button onClick={incrementGuestCount} fontSize="2rem" fontWeight="200">
                      <AddIcon w={6} h={6} color="gray" />
                    </Button>
                  </Flex>
                </Box>
              )}
            </InputGroup>
            <Button
              width={buttonWidth}
              height={height}
              borderRadius=".8rem"
              backgroundColor="main"
              fontSize={buttonFontSize}
              color="white"
              _hover={{ bg: 'primaryHover', border: '.1rem solid var(--color-main)' }}
              onClick={handleClickSearchBtn}>
              Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default SearchBar;
