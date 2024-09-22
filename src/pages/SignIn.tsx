import { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Logo from '../assets/logo.svg?react';
import emotionStyled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { postUserLogin } from '@/api/user/userApi';
import { handleKeyDown } from '@/utils/keyDownUtils';
import { validateEmail, validatePassword } from '@/utils/inputValidationUtils';
import { useAuth } from '@/lib/hooks/useAuth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    const payload = {
      email,
      password,
    };

    postUserLogin(payload)
      .then((response) => {
        if (response.data.result_code === '200') {
          alert('로그인 되었습니다');
          localStorage.setItem('accessToken', response.data.data.access_token);
          localStorage.setItem('refreshToken', response.data.data.refresh_token);
          login({
            email,
            password,
            name: response.data.data.name,
            phone_number: response.data.data.phone_number,
            img_url: response.data.data.img_url,
          });
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('로그인 오류', error);
        alert('이메일과 비밀번호를 확인해주세요.');
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
            <Flex flexDirection="column" justify="center" align="center">
              <InputBox
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
              <InputBox
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleSubmit}
                _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}>
                Sign in
              </Button>
              <Box width="12vw" marginTop="2.5vh" marginLeft="2vw" fontSize="1.2rem" color="main">
                <Flex justify="space-between">
                  <Text cursor="pointer" onClick={() => navigate('/findid')}>
                    아이디 찾기
                  </Text>
                  <Text>|</Text>
                  <Text cursor="pointer" onClick={() => navigate('/signup')}>
                    이메일로 회원가입
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignIn;

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
