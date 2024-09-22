import { client } from '@/api/apiConfig';
import { AccommodationResponse } from '@/lib/types/accommodation';
import { AxiosResponse } from 'axios';

/**
 * 전체 상품 조회 (숙박)
 * @param cursor
 * @param keyword
 * @param start
 * @param end
 * @param count
 * @returns
 */
export const getAccommodation = async (
  cursor: number,
  keyword: string,
  start: string,
  end: string,
  count: number,
): Promise<AxiosResponse<AccommodationResponse>> => {
  return client.get('/open-api/accommodation', {
    params: {
      cursor,
      keyword,
      start,
      end,
      count,
    },
  });
};

/**
 * 개별 상품 조회 (숙박, 객실)
 * @param accommodationId
 */
export const getAccommodationById = async (accommodationId: number): Promise<AxiosResponse<AccommodationResponse>> => {
  try {
    return await client.get(`/open-api/accommodation/${accommodationId}`);
  } catch (error) {
    console.error('개별 상품 조회 오류: ', error);
    throw error;
  }
};
