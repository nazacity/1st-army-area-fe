import { Box, Button, Dialog, Drawer, Hidden } from '@mui/material';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import authServices from 'services/auth.services';
import { useAppDispatch, useAppSelector } from 'store';
import { handleLoginModal } from 'store/slices/layoutSlice';
import { setUser } from 'store/slices/userSlice';

export const LoginModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.layout.loginModalOpen);
  const client_id = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_LINE_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI;
  const scope = 'openid%20profile%20email';
  const state = process.env.NEXT_PUBLIC_LINE_STATE;
  const lineloginlink = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

  const _HandleClose = () => {
    dispatch(handleLoginModal(false));
  };

  const router = useRouter();

  const { mutate: signinByLine } = authServices.useMutationSigninByLine(
    (data) => {
      dispatch(setUser(data.user));
      _HandleClose();
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
      <Hidden mdDown>
        <Dialog
          open={open}
          onClose={_HandleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
            },
          }}
        >
          <Box
            sx={{
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: '#06c755',
                '&:hover': {
                  bgcolor: '#06c755',
                },
              }}
              onClick={() => {
                Router.push(lineloginlink);
              }}
            >
              <img src="/public/images/line_logo.png" alt="line" />
              Log in with LINE
            </Button>
          </Box>
        </Dialog>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={_HandleClose}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
          }}
        >
          <Box
            sx={{
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: '#06c755',
                '&:hover': {
                  bgcolor: '#06c755',
                },
              }}
              onClick={() => {
                Router.push(lineloginlink);
              }}
            >
              <img src="images/line_logo.png" alt="line" />
              Log in with LINE
            </Button>
          </Box>
        </Drawer>
      </Hidden>
    </Box>
  );
};
