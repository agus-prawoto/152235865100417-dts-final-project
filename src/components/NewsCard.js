import { Box, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NewsCard = ({ news, category, search, index }) => {
  let queryParam=''
  if (search) {
    queryParam = `?q=${search}`
  }
  let date = news.publishedAt.split('T')
  date = date[0].split('-')
  return (
    <Box sx={{ display: 'flex', width: 350, margin: 0, padding: '10px 15px', borderBottom: '1px solid #CCCCCC' }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, borderRadius: 2 }}
        image={`${news.urlToImage}`}
        alt="News image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2}}>
        <Box sx={{ flex: '1 0 auto', padding: 0 }}>
          <Typography component="div" variant="h6" sx={{lineHeight: 1, ms: 1}}>
            <Link component={RouterLink} to={`/detail/${category}/${index}${queryParam}`}>{news.title}</Link>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {date[2] + '-' + date[1] + '-' + date[0]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default NewsCard;