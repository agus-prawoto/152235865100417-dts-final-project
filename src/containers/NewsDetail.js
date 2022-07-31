import { Box, Button, Card, CardMedia, CardContent, Grid, Link, TextField, Typography, Skeleton, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const NewsDetail = () => 
{
	let { id } = useParams();
	let { kategori } = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [newsReady, setNewsReady] = useState(false);
	const [artikel, setArtikel] = useState({process: false, content: ''});
    // const API_KEY = '22ebcc31f7c645b4ab8baa53f7edd22a'
    const API_KEY = '51498d87d8a542a89c42e6eba12b0047'

    useEffect(() => {
		console.log(id)
		console.log(kategori)
		const listKategori = ['popular', 'technology', 'science', 'business'];
		
		if ( listKategori.includes(kategori) ) {
			const fetchNews = async () => {
				try {
					let detail = ''
					if (kategori == 'popular') {
						detail = await newsapi.get("top-headlines?country=id&apiKey=" + API_KEY);
					} else {
						const detail = await newsapi.get("top-headlines?country=id&pageSize=20&category=" + kategori + "&apiKey=" + API_KEY);
					}

					setArtikel({process: true, content: detail.data.articles[id]})
				} catch (error) {
					console.log(error);
				}
			}
			fetchNews();
		} else {

		}
    }, []);

    return (
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
                {
					artikel.process &&
						<Skeleton variant="rectangular" width="100%" height={350} />
				}
            </Box>
        </Container>
    );
}

export default NewsDetail;
