import { getAccommodation } from '@/api/accommodation/accommodationApi';
import { Accommodation, AccommodationListProps } from '@/lib/types/accommodation';
import { Box, Grid, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AccommodationList = ({ accommodation }: AccommodationListProps) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number>(91);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const keyword = query.get('keyword') || '';
  const start = query.get('start') || '';
  const end = query.get('end') || '';
  const guest = parseInt(query.get('guest') || '2', 10);

  useEffect(() => {
    setAccommodations(accommodation);
    if (accommodation.length > 0) {
      setCursor(91 - accommodation.length);
    }
    setHasMore(true);
  }, [accommodation]);

  /**
   * @description loadMore 함수를 useCallback으로 감싸서 렌더링 시마다 새로운 함수를 생성하지 않도록 함
   */
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    getAccommodation(cursor, keyword, start, end, guest)
      .then((response) => {
        const newData: Accommodation[] = response.data.data.content;
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setAccommodations((prev) => [...prev, ...newData]);
          const newCursor = cursor - newData.length;
          setCursor(newCursor <= 1 ? 91 : newCursor);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [cursor, hasMore, keyword, start, end, guest]);

  /**
   * @description IntersectionObserver를 이용하여 스크롤 이벤트를 감지하여 무한 스크롤 구현
   */
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, hasMore]);

  return (
    <Grid
      templateColumns={{
        mobile: 'repeat(1, 1fr)',
        tablet: 'repeat(2, 1fr)',
        desktop: 'repeat(4, 1fr)',
      }}
      gap="1.5rem">
      {accommodations.map((accommodation, index) => {
        const isLastElement = accommodations.length === index + 1;
        return (
          <Box key={`${accommodation.id}-${index}`} ref={isLastElement ? lastElementRef : null}>
            <Box
              width="100%"
              height="100%"
              border="1px solid"
              borderColor="grayLight"
              borderRadius="0.8rem"
              gap="1.5rem"
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.01)',
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
              }}>
              <Link to={`/accommodation/${accommodation.id}`}>
                <Image
                  src={accommodation.thumbnail}
                  alt={accommodation.name}
                  width="100%"
                  height="25.7rem"
                  borderRadius="0.8rem 0.8rem 0 0"
                />
                <Box display="flex" flexDirection="column" width="100%" height="auto" paddingLeft="1rem" gap=".5rem">
                  <Text fontSize="2rem" fontWeight="900" marginTop="1rem">
                    {accommodation.name}
                  </Text>
                  <Box padding=".5rem">
                    <Text fontSize="1.5rem" color="gray">
                      {accommodation.address}
                    </Text>
                    <Text fontSize="1.5rem" color="gray">
                      {accommodation.numbers}
                    </Text>
                    <Text fontSize="1.8rem" color="gray">
                      {accommodation.comment}
                    </Text>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" marginTop="3rem" paddingRight="1rem">
                    <Text fontSize="1.5rem" color="gray" paddingRight="2.8rem">
                      1박당 요금
                    </Text>
                    <Text fontSize="2rem" color="red">
                      {`${accommodation.price.toLocaleString('ko-KR')}원`}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
};

export default AccommodationList;
