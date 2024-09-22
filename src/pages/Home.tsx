import { Box, Image } from '@chakra-ui/react';
import { settings } from '@/lib/constants/slickCarousel';
import SearchBar from '@/components/SearchBar';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Accommodation, AccommodationResponse } from '@/lib/types/accommodation';
import { useLocation } from 'react-router-dom';
import AccommodationList from '@/components/AccommodationList';
import banner1 from '@/assets/images/banner1.webp';
import banner2 from '@/assets/images/banner2.webp';
import banner3 from '@/assets/images/banner3.webp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchFilteredData = async () => {
      const query = new URLSearchParams(location.search);
      const keyword = query.get('keyword') || '';
      const start = query.get('start') || '';
      const end = query.get('end') || '';
      const guest = query.get('guest') || '2';

      try {
        const url = `http://ec2-43-203-40-90.ap-northeast-2.compute.amazonaws.com/open-api/accommodation`;
        const response = await axios.get<AccommodationResponse>(url, {
          params: { keyword, start, end, guest },
        });

        if (response.data?.data?.content) {
          setAccommodationData(response.data.data.content);
        } else {
          console.error('Unexpected API response structure', response.data);
          setAccommodationData([]);
        }
      } catch (error) {
        console.error('검색어 필터링 오류', error);
        setAccommodationData([]);
      }
    };
    fetchFilteredData();
  }, [location.search]);

  return (
    <Box paddingTop="8rem">
      <Box position="relative" overflowX="hidden">
        <Slider {...settings}>
          <Box pointerEvents="none">
            <Image src={banner1} width="100%" height="70vh" opacity=".9" />
          </Box>
          <Box pointerEvents="none">
            <Image src={banner2} width="100%" height="70vh" opacity=".9" />
          </Box>
          <Box pointerEvents="none">
            <Image src={banner3} width="100%" height="70vh" opacity=".9" />
          </Box>
        </Slider>
        <SearchBar />
      </Box>
      <Box padding="8rem 15rem 7rem" display="flex" flexDirection="column" alignItems="center">
        <AccommodationList accommodation={accommodationData} />
      </Box>
    </Box>
  );
};

export default Home;
