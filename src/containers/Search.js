import { Box, Button, TextField, Container, Typography, Skeleton, Alert  } from '@mui/material';
import { useEffect, useState } from 'react';
import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';

const Search = () => {

    const[search, setSearch] = useState({initial: true, process: false, result: ''});
    const API_KEY = '51498d87d8a542a89c42e6eba12b0047'
    
	const searchNews = async (e) => {
		e.preventDefault()
        setSearch(o => ({initial:false, process: true, result: '' }))
        const searchValue = e.target[0].value;
        const result = await newsapi.get("top-headlines?q=" + searchValue + "&country=id&apiKey=" + API_KEY);
		setSearch(o => ({initial:false, process: false, result: result.data.articles }))
		console.log(result.data.articles)
  	}

    /* useEffect(() => {

        if (!searchResult) return



    }, [searchResult]) */

 	return (
		<Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mt: 15,
            }}>
				<form onSubmit={(e) => searchNews(e)}>
                	<TextField hiddenLabel id="standard-basic" placeholder="Search news.." variant="standard" helperText="Note: coba masukkan keyword huruf 'a' atau 'axx'"/>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ ml: 2 }}
                    >
                        Search
                    </Button>
                </form>
                
			</Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mt: 5
            }}>
                {
                    search.process && <>
                            <Box sx={{ display: 'flex', width: 350, margin: 2, borderRadius: 0, boxShadow: 'none' }}>
                                <Skeleton variant="rectangular" width={100} height={100} />
                                <Box width={250} sx={{ml: 2}}>
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: 350, margin: 2, borderRadius: 0, boxShadow: 'none' }}>
                                <Skeleton variant="rectangular" width={100} height={100} />
                                <Box width={250} sx={{ml: 2}}>
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: 350, margin: 2, borderRadius: 0, boxShadow: 'none' }}>
                                <Skeleton variant="rectangular" width={100} height={100} />
                                <Box width={250} sx={{ml: 2}}>
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                    <Skeleton animation="wave" height={20} sx={{mb: 1}} />
                                </Box>
                            </Box>
                        </>
                }
            
                { 
                    !search.initial && !search.process && !search.result.length && <Alert sx={{width: '100%'}} severity="error">Data Artikel Tidak Ditemukan</Alert>
                }
                
                { !search.initial && !search.process && search.result && search.result.map(item => {
                    return  <NewsCard key={item.title} news={item}></NewsCard>   
                    })
                }
             </Box>
		</Container>
  	)
}

export default Search;