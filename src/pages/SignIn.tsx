import React from 'react';
import '../index.css';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Logo from '../assets/logo.svg?react';
import emotionStyled from '@emotion/styled';

const SignIn = () => {
  return (
    <Box position="relative" backgroundColor="background" height="100vh">
      <Box
        top="0"
        bottom="0"
        left="0"
        right="0"
        position="absolute"
        width="60rem"
        height="70rem"
        margin="auto"
        backgroundColor="white">
        <Flex flexDirection="column" justify="center" align="center" marginTop="15rem">
          <Logo />
          <Box marginTop="5rem">
            <Flex flexDirection="column" justify="center" align="center">
              <InputBox placeholder="E-mail" />
              <InputBox placeholder="Password" />
              <Button
                width="40rem"
                height="4rem"
                marginTop="1.5rem"
                borderRadius=".5rem"
                backgroundColor="main"
                fontSize="1.5rem"
                color="white"
                _hover={{ bg: 'background', border: '.1rem solid var(--color-main)', color: 'main' }}>
                Log in
              </Button>
              <Box width="19rem" fontSize="1.2rem" marginTop="2rem" color="main">
                <Flex justify="space-between">
                  <Text cursor="pointer">패스워드 재설정</Text>
                  <Text>|</Text>
                  <Text cursor="pointer">이메일로 회원가입</Text>
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
  width : 40rem;
  height: 4rem;
  margin-top: 1.5rem;
  padding: 2rem 3rem;
  border: .1rem solid var(--color-main);
  border-radius: .5rem;

  font-size: 1.5rem;
  color: var(--color-main);

  outline: none;
`;
