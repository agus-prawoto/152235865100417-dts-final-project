import { Box, Button, Card, CardMedia, CardContent, Grid, Link, TextField, Typography, Skeleton, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const NewsList = () => 
{
    const [queryParams, setQueryParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [newsReady, setNewsReady] = useState(false);
    // const API_KEY = '22ebcc31f7c645b4ab8baa53f7edd22a'
    const API_KEY = '51498d87d8a542a89c42e6eba12b0047'

    useEffect(() => {
        const fetchNews = async () => {
            try {
               const listNews = {};
                const popular = await newsapi.get("top-headlines?country=id&apiKey=" + API_KEY);
                listNews['popular'] = popular.data.articles;
                
                /* const teknologi = await newsapi.get("top-headlines?country=id&pageSize=20&category=technology&apiKey=" + API_KEY);
                const science = await newsapi.get("top-headlines?country=id&pageSize=20&category=science&apiKey=" + API_KEY);
                const business = await newsapi.get("top-headlines?country=id&pageSize=20&category=business&apiKey=" + API_KEY);
                listNews['category'] = {}
                listNews['category']['teknologi'] = teknologi.data.articles;
                listNews['category']['science'] = science.data.articles;
                listNews['category']['business'] = business.data.articles; */
                
                console.log(listNews)
                setNews(listNews);
                setNewsReady(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchNews();
    }, []);

    useEffect(() => {
        if (!newsReady) return;
        const sortMovies = (type) => {
            if (type === 'asc') {
                const sorted = [...news].sort((a, b) => a.vote_average - b.vote_average);
                // setMovies(sorted);
            }
            if (type === 'desc') {
                const sorted = [...news].sort((a, b) => b.vote_average - a.vote_average);
                // setMovies(sorted);
            }
        }

        // sortMovies(queryParams.get('sort'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams, newsReady]);

    const setSortParam = (type) => {
        queryParams.set("sort", type);
        setQueryParams(queryParams);
    }

    const skeletonListNews = [1,2,3];
    return (
    <Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            className: 'box-container',
            mt: 10
        }}>
            {
                !news.popular && 
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Skeleton variant="rectangular" width="100%" height={350} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Skeleton variant="rectangular" width="100%" height={350} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Skeleton variant="rectangular" width="100%" height={350} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Skeleton variant="rectangular" width="100%" height={350} />
                        </Grid>
                    </Grid>
            }

            { news.popular && 
                <Swiper
                    
                    spaceBetween={0}
                
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination = {{
                        el: ".swiper-pagination",
                        clickable: true
                    }}
                    breakpoints = {{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 5
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 5
                        },
                        992: {
                          slidesPerView: 3,
                          spaceBetween: 5
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 5
                        },
                        1400: {
                            slidesPerView: 5,
                            spaceBetween: 5
                        },
                    }}
                    >
                    {
                        news.popular.map((item, index) => {
                            if (item.urlToImage && item.content) {
                                return <SwiperSlide>
                                    <Box>
                                        <Box sx={{position: 'relative', margin:0, padding:0}}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: '100%', height: 360, padding:0}}
                                                image={`${item.urlToImage}`}
                                                alt="News image"
                                            />
                                            <Typography sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                background: 'rgba(255, 0,0,.5)',
                                                color: '#dcddde',
                                                padding: '10px 15px'
                                            }}><Link sx={{color: '#dcddde', textDecoration: 'none'}} href={`http://localhost:3000/detail/popular/${index}`}>{item.title}</Link></Typography>
                                        </Box>
                                                                                
                                    </Box>
                                </SwiperSlide>
                            }
                        })
                    }
                </Swiper>
            }
        </Box>
        <Container>
            <Box
                sx={{
                    
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #CCCCCC',
                    borderRadius: '10px',
                    padding: '40px',
                    maxWidth: '500px',
                    margin: 'auto',
                    mt: 8,
                }}
            >
                <Avatar sx={{ m: 3, bgcolor: 'error.main', width: 72, height: 72 }}>
                    <LockOutlinedIcon sx={{fontSize: 50}} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    MEMBER AREA
                </Typography>
                <Typography>
                    Silakan <Link href="http://localhost:3000/login">login</Link> untuk menampilkan list berita.
                </Typography>
                <Typography>
                    Atau silakan <Link href="http://localhost:3000/register">register</Link> untuk membuat akun baru.
                </Typography>
            </Box>
            <Grid container spacing={3} sx={{mt: 2}}>
                {
                    !news.category &&
                        skeletonListNews.map( num => {
                            return <Grid key={num} item xs={12} md={4}>
                                <Skeleton animation="wave" height={35} sx={{mb: 2}} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <Skeleton variant="rectangular" width="30%" height={100} />
                                    <Box width="65%" sx={{ml: 2}}>
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    mt: 2
                                }}>
                                    <Skeleton variant="rectangular" width="30%" height={100} />
                                    <Box width="65%" sx={{ml: 2}}>
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                        <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    </Box>
                                </Box>
                            </Grid>
                        })
                }

                {
                    news.category && 
                        <>
                            <Grid item xs={12} md={4}>
                                <Box sx={{background: '#bbffc5',
                                        padding: '10px 15px',
                                        fontVariant: 'unicase'
                                }}>Teknologi</Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                }}>
                                {
                                   news.category.teknologi.map(item => {
                                        if (item.urlToImage && item.content) {
                                            return <NewsCard key={item.title} news={item}></NewsCard>
                                        }
                                    })
                                }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>

                                <Box sx={{background: '#ffe1bb',
                                        padding: '10px 15px',
                                        fontVariant: 'unicase'
                                }}>Science</Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                }}>
                                {
                                    news.category.science.map(item => {
                                        if (item.urlToImage && item.content) {
                                            return <NewsCard key={item.title} news={item}></NewsCard>
                                        }
                                    })
                                }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{background: '#bbcbff',
                                        padding: '10px 15px',
                                        fontVariant: 'unicase'
                                }}>Business</Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                }}>
                                {
                                    news.category.business.map(item => {
                                        if (item.urlToImage && item.content) {
                                            return <NewsCard key={item.title} news={item}></NewsCard>
                                        }
                                    })
                                }
                                </Box>
                            </Grid>
                        </>
                }
            </Grid>
        </Container>
    </Box>
    );
}

export default NewsList;
