import { Box, Button, Card, Alert, CardMedia, CardContent, Grid, Link, TextField, Typography, Skeleton, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import appConfig from '../config/app';

const NewsDetail = () => 
{
	let { id } = useParams();
	let { kategori } = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [newsReady, setNewsReady] = useState(false);
	const [user, loading] = useAuthState(auth);
	const [errorMessage, setErrorMessage] = useState('');
	
    useEffect(() => 
	{
		if (loading) return;

		if (!user) {
			const element = 
			
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
						Silakan <NavLink to='/login' key='Login'>login</NavLink> untuk menampilkan isi berita.
					</Typography>
					<Typography>
						Atau silakan <NavLink key='register' to="/register">register</NavLink> untuk membuat akun baru.
					</Typography>
				</Box>
			
			setErrorMessage(element)
			setArtikel('')
			setSidebar('')
			return
		}
		const listKategori = ['popular', 'technology', 'science', 'business'];
		
		if ( listKategori.includes(kategori) ) {
			const fetchNews = async () => {
				try {
					let detail = ''
					if (kategori == 'popular') {
						detail = await newsapi.get("top-headlines?country=id&apiKey=" + appConfig.API_KEY);
					} else {
						detail = await newsapi.get("top-headlines?country=id&pageSize=20&category=" + kategori + "&apiKey=" + appConfig.API_KEY);
					}

					let result = detail.data.articles[id];
					if (!result) {
						setErrorMessage(<Alert sx={{mt:12}} severity="error">Artikel tidak ditemukan</Alert>)
						setArtikel('')
						setSidebar('')
						return
					}
					const artikelResult = 
							<Box>
								<CardMedia
									component="img"
									sx={{ width: '100%', height: 360, padding:0}}
									image={`${result.urlToImage}`}
									alt="News image"
								/>
								<Typography variant="h5" component="h5" sx={{mt:2}}>{result.title}</Typography>
								<Typography sx={{fontWeight: 'bold', mt:1, mb: 1}}>Deskripsi</Typography>
								<Typography sx={{
									
								}}>{result.description}</Typography>
								<Typography sx={{fontWeight: 'bold', mt:1, mb: 1}}>Content</Typography>
								<Typography>{result.content}</Typography>
								<Typography sx={{mt:2}}>Full artikel: <Link href={result.url}>{result.url}</Link></Typography>
							</Box>
						
					setArtikel(artikelResult)

					detail = await newsapi.get("top-headlines?country=id&pageSize=20&apiKey=" + appConfig.API_KEY);
					result = detail.data.articles
					let num  = 1
					const sidebarResult =
						<>
							<Box sx={{background: '#bbffc5',
									padding: '10px 15px',
									fontVariant: 'unicase'
							}}>Popular</Box>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
							}}>
							{
								
							result.map(item => {
									if (item.urlToImage && item.content && num <= 5) {
										num++;
										return <NewsCard key={item.title} news={item}></NewsCard>
									}
									
								})
							}
							</Box>
						</>
					setSidebar(sidebarResult)

				} catch (error) {
					console.log(error);
				}
			}
			fetchNews();
		} else {
			setErrorMessage(<Alert sx={{mt:12}} severity="error">Kategori tidak ditemukan</Alert>)
			setArtikel('')
			setSidebar('')
		}
    }, [user, loading]);

	const artikelInit = <Box
							sx={{
								
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Skeleton variant="rectangular" width="100%" height={350} />
							<Skeleton width="100%" height={35} sx={{mt:2}} />
							<Skeleton width="100%" height={35} />
							<Skeleton width="100%" height={35} />
						</Box>
	
	const [artikel, setArtikel] = useState(artikelInit);

	const sidebarInit = 
				<>
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
				</>

	const [sidebar, setSidebar] = useState(sidebarInit);
    return (
        <Container>
			{errorMessage}
			<Grid container spacing={3}>
				<Grid item key={1} xs={12} md={8}>
					{ artikel }
				</Grid>
				<Grid item key={2} xs={12} md={4}>
					{ sidebar }
				</Grid>
			</Grid>	
        </Container>
    );
}

export default NewsDetail;
