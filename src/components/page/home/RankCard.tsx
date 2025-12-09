import React, { useState } from 'react';
import { IUserScoreInfo } from 'models/user.model';
import { SwiperSlide } from 'swiper/react';
import { HiUserCircle } from 'react-icons/hi2';
import Image from 'next/image';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import { Box, Typography } from '@mui/material';
import { COLORS } from 'theme';

interface IProps {
  item: IUserScoreInfo | undefined;
  index: number;
}

const RankCard: React.FC<IProps> = ({ item, index }) => {
  const [imageError, setImageError] = useState(false);

  if (!item) {
    return (
      <CardContainer style={{ width: 300, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={`/images/${index + 1}.png`}
            alt="Army Area Logo"
            style={{ width: '100px' }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        >
          <img
            src="/logo/logo.png"
            alt="Army Area Logo"
            style={{ width: '10%' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mt: 6,
          }}
        >
          <Box
            sx={{
              width: 250,
              height: 250,
              borderRadius: 10,
            }}
          >
            <HiUserCircle
              style={{
                width: '100%',
                height: '100%',
                color: '#cccccc',
              }}
            />
          </Box>
          <Box sx={{ height: 16, mt: 2 }}></Box>
        </Box>
      </CardContainer>
    );
  }
  return (
    <CardContainer style={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={`/images/${index + 1}.png`}
          alt="Army Area Logo"
          style={{ width: '100px' }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <img
          src="/logo/logo.png"
          alt="Army Area Logo"
          style={{ width: '10%' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 6,
        }}
      >
        {imageError ? (
          <Box
            sx={{
              width: 250,
              height: 250,
              borderRadius: 10,
            }}
          >
            <HiUserCircle
              style={{
                width: '100%',
                height: '100%',
                color: '#cccccc',
              }}
            />
          </Box>
        ) : (
          <Image
            src={item.user.profileImageUrl}
            alt="Army Area Logo"
            width={250}
            height={250}
            style={{
              width: 250,
              height: 250,
              borderRadius: 10,
              objectFit: 'cover',
            }}
            onError={() => setImageError(true)}
          />
        )}
        <Typography
          sx={{ mt: 2, color: COLORS.orange[3], fontWeight: 600, fontSize: 20 }}
        >{`${item.user.rank} ${item.user.firstName} ${item.user.lastName}`}</Typography>
      </Box>
    </CardContainer>
  );
};

export default RankCard;
