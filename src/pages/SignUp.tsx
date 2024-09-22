import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Logo from '../assets/logo.svg?react';
import emotionStyled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { postUserRegister } from '@/api/user/userApi';
import { handleKeyDown } from '@/utils/keyDownUtils';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '@/utils/inputValidationUtils';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateConfirmPassword(password, confirmPassword) ||
      !validatePhoneNumber(phoneNumber)
    ) {
      return;
    }

    if (name === '') {
      alert('이름을 입력해주세요.');
      return;
    }

    const payload = {
      name,
      email,
      password,
      phone_number: phoneNumber,
    };

    postUserRegister(payload)
      .then((response) => {
        if (response.data.result_code === '200') {
          alert('회원가입이 정상적으로 처리되었습니다.');
          navigate('/signin');
        }
      })
      .catch((error) => {
        console.error('회원가입 오류', error);
        alert('이미 등록된 이메일입니다.');
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
        <Flex flexDirection="column" justify="center" align="center" marginTop="8vh">
          <Logo />
          <Box marginTop="4.9vh">
            <Flex flexDirection="column" justify="center" align="center">
              <InputBox
                placeholder="E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
              <InputBox
                placeholder="Password *"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
              <InputBox
                placeholder="Confirm Password *"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
              <InputBox
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              />
              <InputBox
                placeholder="Phone Number *"
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
                onClick={handleSubmit}
                _hover={{ bg: 'background', border: '.1rem solid var(--color-main)', color: 'main' }}>
                Sign up
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignUp;

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
