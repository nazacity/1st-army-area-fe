import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import summaryServices from 'services/summary.services';
import numeral from 'numeral';

interface IProps {}

const SummaryContainer: React.FC<IProps> = ({}) => {
  const { data } = summaryServices.useQueryGetAllSummary({
    month: 11,
    year: 2025,
  });

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          my: 4,
          color: '#ffffff',
        }}
      >
        สรุปภาพรวมกิจกรรม
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardContainer style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ยอดกำลัง ทภ.1 เข้าร่วมกิจกรรม
                    </Typography>
                    <Typography variant="h2">
                      {numeral(data?.totalMember || 0).format('0,0')} นาย
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ระยะทางรวมของกำลังพล ทภ.1
                    </Typography>
                    <Typography variant="h2">
                      {numeral(data?.totalDistance || 0).format('0,0')} กม.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      เวลารวมของกำลังพล ทภ.1
                    </Typography>
                    <Typography variant="h2">
                      {data?.totalTime
                        ? `${numeral(Math.floor(data?.totalTime / 60)).format('0,0')} ชม. ${data.totalTime % 60} นาที`
                        : '0 ชม. 0 นาที'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </CardContainer>
      </Box>
    </Box>
  );
};

export default SummaryContainer;
