import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import emotionStyled from '@emotion/styled';
import { useRef, useState } from 'react';
import { User } from '@/lib/types/authStore';
import { putUserEditPhoneNumber, postUserImgupload, PutUserImg, putUserResetPw } from '@/api/user/userApi';
import { handleKeyDown } from '@/utils/keyDownUtils';
import { validatePhoneNumber } from '@/utils/inputValidationUtils';
import { useAuth } from '@/lib/hooks/useAuth';
import FileResizer from 'react-image-file-resizer';

const Mypage = () => {
  const { user, login } = useAuth();
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>(user?.phone_number || '');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>(user?.img_url || '');
  const oldImageUrl = user?.img_url;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditInfo = async () => {
    if (editPhoneNumber !== user?.phone_number) {
      if (!validatePhoneNumber(editPhoneNumber)) {
        return;
      }

      const payload = {
        phone_number: editPhoneNumber,
      };

      try {
        const response = await putUserEditPhoneNumber(payload);
        if (response.data.result_code === '200') {
          alert('정상적으로 변경되었습니다.');
          login({ ...user, phone_number: editPhoneNumber } as User);
        } else {
          alert('수정에 실패하였습니다.');
          console.error(response.data.error.error_message);
        }
      } catch (error) {
        console.error('프로필 수정 에러', error);
      }
    }

    if (password == user?.password) {
      if (newPassword !== confirmPassword) {
        alert('패스워드가 일치하지 않습니다.');
        return;
      }
      const payload = {
        email: user?.email,
        password: newPassword,
      };

      try {
        const response = await putUserResetPw(payload);
        if (response.data.result_code === '200') {
          alert('정상적으로 변경되었습니다.');
        }
      } catch (error) {
        console.error('프로필 수정 에러', error);
      }
    }
  };

  const handleProfileImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * 이미지 파일 변경 시 호출되는 함수
   * @param event
   */
  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      FileResizer.imageFileResizer(
        file,
        300,
        300,
        'WEBP',
        100,
        0,
        (uri) => {
          setSelectedFile(uri as File);
          setImgUrl(URL.createObjectURL(uri as Blob));
        },
        'blob',
      );
    }
  };

  /**
   * 이미지 업로드 함수
   */
  const handleImgUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', selectedFile);

      let response;

      if (oldImageUrl && oldImageUrl !== 'undefined') {
        response = await PutUserImg(formData, oldImageUrl);
      } else {
        response = await postUserImgupload(formData);
      }

      if (response?.data.result_code === '200') {
        alert('프로필 사진이 등록되었습니다.');
        const newImgUrl = response.data.data;
        setImgUrl(newImgUrl);
        login({ ...user, img_url: newImgUrl } as User);
      } else {
        alert('프로필 사진이 등록되지 않았습니다.');
        console.error(response?.data.error.error_message);
      }
    }
  };

  return (
    <Box marginTop="8.3vh" height="100vh" backgroundColor="background">
      <Flex justify="center" align="center">
        <Box width="41.7vw" height="100vh" backgroundColor="white">
          <Flex flexDirection="column" justify="center" align="center" gap="2vh">
            <Box
              position="relative"
              width="200px"
              height="200px"
              marginTop="10vh"
              borderRadius="50%"
              backgroundColor="background"
              overflow="hidden"
              cursor="pointer"
              onClick={handleProfileImgClick}>
              <img
                src={imgUrl}
                className="profile_img"
                alt="Profile"
                style={{
                  display: imgUrl === 'undefined' ? 'none' : 'block',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '0',
                  right: '0',
                }}
              />
              <Input type="file" ref={fileInputRef} display="none" onChange={handleImgChange} />
            </Box>
            <Button
              onClick={handleImgUpload}
              border="1px solid"
              borderRadius=".5rem"
              background="main"
              textColor="white"
              padding="1.5rem">
              <Text fontSize="1.5rem">등록</Text>
            </Button>
            <Box width="35vw" height="60vh" marginTop="3vh">
              <Flex justify="space-between" align="center">
                <Text width="40%" fontSize="2rem" color="main">
                  Name
                </Text>
                <TextBox>{user?.name}</TextBox>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text width="40%" fontSize="2rem" color="main">
                  Account
                </Text>
                <TextBox>{user?.email}</TextBox>
              </Flex>
              <Box margin="3vh 0 3vh 0" border=".1rem solid var(--color-main)" borderBottom="none"></Box>
              <Flex justify="space-between" align="center">
                <Text width="40%" fontSize="2rem" color="main">
                  Phone Number
                </Text>
                <InputBox
                  type="text"
                  placeholder={user?.phone_number}
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleEditInfo)}></InputBox>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text width="40%" fontSize="2rem" color="main">
                  Password
                </Text>
                <InputBox
                  type="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleEditInfo)}></InputBox>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text width="40%" fontSize="2rem" color="main">
                  New Password
                </Text>
                <InputBox
                  type="password"
                  placeholder="New Password *"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleEditInfo)}></InputBox>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text width="21%" fontSize="2rem" color="main">
                  New Password
                </Text>
                <Text width="19%" fontSize="1.5rem" color="main">
                  (confirm)
                </Text>
                <InputBox
                  type="password"
                  placeholder="Confirm New Password *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleEditInfo)}
                />
              </Flex>
              <Button
                width="35vw"
                height="5vh"
                marginTop="4.5vh"
                fontSize="2rem"
                backgroundColor="main"
                color="white"
                borderRadius=".5rem"
                _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}
                onClick={handleEditInfo}>
                Edit
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Mypage;

const TextBox = emotionStyled.div`
  width: 60%;
  padding: 1vh 1vw;
  margin-top: 1.5vh;
  font-size: 2rem;
  color: var(--color-main);
  border: .1rem solid var(--color-main);
  border-radius: .5rem;
`;

const InputBox = emotionStyled.input`
  width: 60%;
  padding: 1vh 1vw;
  margin-bottom: 1.5vh;
  font-size: 2rem;
  border: .1rem solid var(--color-main);
  border-radius: .5rem;
  color: var(--color-main);
  outline: none;
`;
