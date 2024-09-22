import { client } from '@/api/apiConfig';

/**
 * 회원가입
 * @param payload {email, name, phone_number, password}
 */
export const postUserRegister = (payload: { email: string; name: string; phone_number: string; password: string }) => {
  return client.post('/open-api/user/register', payload);
};

/**
 * 로그인
 * @param payload {email, password}
 */
export const postUserLogin = (payload: { email: string; password: string }) => {
  return client.post('/open-api/user/login', payload);
};

/**
 * 아이디 찾기
 * @param username
 * @param phoneNumber
 */
export const getUserFindId = async (username: string, phoneNumber: string) => {
  return client.get('/open-api/user/find-email', {
    params: {
      username,
      phoneNumber,
    },
  });
};

/**
 * 패스워드 재설정
 * @param payload {email, password}
 */
export const putUserResetPw = async (payload: { email: string; password: string }) => {
  return client.put('/open-api/user/change-password', payload);
};

/**
 * 프로필사진 등록
 * @param formData
 */
export const postUserImgupload = async (formData: FormData) => {
  return client.post('api/user/my-page/image/upload', formData);
};

/**
 * 프로필사진 수정
 * @param formData
 * @param params {oldImageUrl}
 */
export const PutUserImg = async (formData: FormData, oldImageUrl: string) => {
  return client.put('/api/user/my-page/image/update', formData, {
    params: {
      oldImageUrl: oldImageUrl,
    },
  });
};

/**
 * 휴대폰번호 재설정
 * @param payload {phone_number}
 */
export const putUserEditPhoneNumber = async (payload: { phone_number: string }) => {
  return client.put('/api/user/my-page/change-phone-number', payload, {});
};
