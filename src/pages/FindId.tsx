import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Logo from '../assets/logo.svg?react';
import emotionStyled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserFindId } from '@/api/user/userApi';
import { handleKeyDown } from '@/utils/keyDownUtils';

const FindId = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (): Promise<void> => {
    fetchUserFindId(username, phoneNumber)
      .then((response) => {
        setEmail(response.data.data);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('입력하신 정보와 일치하는 계정이 존재하지 않습니다.');
      });
  };

  return (
    <Box position="relative" height="100vh" backgroundColor="background">
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        width="41.7vw"
        height="68.4vh"
        margin="auto"
        backgroundColor="white">
        <Flex flexDirection="column" justify="center" align="center" marginTop="14.6vh">
          <Logo />
          <Box marginTop="4.9vh">
            {!email && (
              <Flex flexDirection="column" justify="center" align="center">
                <InputBox
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                />
                <InputBox
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                />
                <Button
                  width="27.8vw"
                  height="4.9vh"
                  marginTop="2vh"
                  borderRadius=".5rem"
                  backgroundColor="main"
                  fontSize="1.5rem"
                  color="white"
                  _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}
                  onClick={handleSubmit}>
                  Find ID
                </Button>
                <Text
                  marginTop="2.5vh"
                  fontSize="1.2rem"
                  color="main"
                  cursor="pointer"
                  onClick={() => navigate('/resetpw')}>
                  패스워드 재설정
                </Text>
              </Flex>
            )}
            {email && (
              <Box marginTop="3.5vh" color="main">
                <Flex flexDirection="column" align="center">
                  <Text fontSize="1.5rem" color="black">
                    입력하신 정보와 일치하는 계정이 존재합니다.
                  </Text>
                  <Text marginTop="2vh" fontSize="2.3rem" fontWeight="800">
                    {email}
                  </Text>
                  <Button
                    width="27.8vw"
                    height="4.9vh"
                    marginTop="5vh"
                    fontSize="2rem"
                    backgroundColor="main"
                    color="white"
                    _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}
                    onClick={() => {
                      navigate('/findpw');
                    }}>
                    Reset Password
                  </Button>
                  <Button
                    width="27.8vw"
                    height="4.9vh"
                    marginTop="2vh"
                    fontSize="2rem"
                    backgroundColor="main"
                    color="white"
                    _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}
                    onClick={() => {
                      navigate('/');
                    }}>
                    Return to main
                  </Button>
                </Flex>
              </Box>
            )}
            {error && (
              <Flex flexDirection="column" align="center">
                <Box marginTop="5vh" fontSize="1.2rem" color="red">
                  {error}
                </Box>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default FindId;

const InputBox = emotionStyled.input`
  width : 27.8vw;
  height: 4.9vh;
  margin-top: 2vh;
  padding: 2.6vh 2.1vw;
  border: .1rem solid var(--color-main);
  border-radius: .5rem;

  font-size: 1.5rem;
  color: var(--color-main);

  outline: none;
`;
