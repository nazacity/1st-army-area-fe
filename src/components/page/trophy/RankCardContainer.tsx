import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import scoreServices from 'services/score.services';
import { IUserScoreInfo } from 'models/user.model';
import RankCard from '../home/RankCard';
import { useFormContext } from 'react-hook-form';
import { MonthSelectDto } from 'dto/score.dto';
import MonthSelector from './MonthSelector';

interface IProps {}

const RankCardContainer: React.FC<IProps> = ({}) => {
  const { watch } = useFormContext<MonthSelectDto>();
  const [userScore, setUserScore] = useState<(IUserScoreInfo | undefined)[]>(
    []
  );
  const { data } = scoreServices.useQueryGetUserScoreByPublic({
    take: 3,
    page: 1,
    month: dayjs(watch('date')).month(),
    year: dayjs(watch('date')).year(),
  });

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const filtedData = data.data.filter((item) => item.sumDistance > 0);
      if (filtedData.length >= 3) {
        setUserScore(filtedData.slice(0, 3));
      } else if (filtedData.length === 2) {
        setUserScore([...filtedData, undefined]);
      } else if (filtedData.length === 1) {
        setUserScore([filtedData[0], undefined, undefined]);
      } else {
        setUserScore([undefined, undefined, undefined]);
      }
    }
  }, [data]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        จัดอันดับประจำเดือน
      </Typography>
      <MonthSelector />
      <Box sx={{ mt: 4 }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          className="mySwiper"
        >
          {userScore.map((item, index) => {
            return (
              <SwiperSlide style={{ width: 300 }} key={index.toString()}>
                <RankCard item={item} index={index} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default RankCardContainer;
