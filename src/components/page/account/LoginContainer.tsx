import React, { useEffect } from 'react';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import queryString from 'query-string';
import { useAppDispatch } from 'store';
import { setLineInfo, setUser } from 'store/slices/userSlice';
import authServices from 'services/auth.services';

interface IProps {}

const LoginContainer: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const client_id = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_LINE_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI;
  const scope = 'openid%20profile%20email';
  const state = process.env.NEXT_PUBLIC_LINE_STATE;
  const lineloginlink = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

  const { mutate: signinByLine } = authServices.useMutationSigninByLine(
    (data) => {
      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        router.push('/register');
      }
    },
    (err) => {
      console.log(err);
    }
  );

  const _HandleLineLogin = async () => {
    if (router.query.code) {
      try {
        const lineRequest = {
          grant_type: 'authorization_code',
          code: router.query.code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          client_secret: client_secret,
        };
        const res1 = await axios.post(
          'https://api.line.me/oauth2/v2.1/token',
          queryString.stringify(lineRequest),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const res2 = await axios.get('https://api.line.me/v2/profile', {
          headers: {
            Authorization: `Bearer ${res1.data.access_token}`,
          },
        });

        dispatch(
          setLineInfo({
            displayName: res2.data.displayName,
            lineId: res2.data.userId,
            profileImageUrl: res2.data.pictureUrl || '',
          })
        );

        signinByLine({
          displayName: res2.data.displayName,
          lineId: res2.data.userId,
          profileImageUrl: res2.data.pictureUrl,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    _HandleLineLogin();
  }, [router]);
  return (
    <Box>
      <CardContainer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 1,
        }}
      >
        <img
          src="/logo/logo.png"
          alt="Army Area Logo"
          style={{ width: '60%' }}
        />
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#06c755',
            '&:hover': {
              bgcolor: '#06c755',
            },
            width: '100%',
          }}
          onClick={() => {
            router.push(lineloginlink);
          }}
        >
          <img src="./images/line_logo.png" alt="line" />
          Log in with LINE
        </Button>
      </CardContainer>
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default LoginContainer;
