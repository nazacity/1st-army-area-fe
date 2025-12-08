import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import scoreServices from 'services/score.services';
import { IUserScoreInfo } from 'models/user.model';
import RankCard from './RankCard';

interface IProps {}

const RankContainer: React.FC<IProps> = ({}) => {
  const [userScore, setUserScore] = useState<(IUserScoreInfo | undefined)[]>(
    []
  );
  const { data } = scoreServices.useQueryGetUserScoreByPublic({
    take: 3,
    page: 1,
    month: dayjs().month(),
    year: dayjs().year(),
  });

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const filtedData = data.data.filter((item) => item.sumDistance > 0);
      if (filtedData.length > 3) {
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
    <Box>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          my: 4,
          color: '#ffffff',
        }}
      >
        จัดอันดับประจำเดือน {dayjs().format('MMM BBBB')}
      </Typography>
      <Box>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
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

export default RankContainer;
