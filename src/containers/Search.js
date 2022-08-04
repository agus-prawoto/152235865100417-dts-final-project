import { Box, Button, TextField, Container, Typography, Skeleton, Alert  } from '@mui/material';
import { useEffect, useState } from 'react';
import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';
import { useSearchParams } from 'react-router-dom';
import appConfig from '../config/app';

const Search = () => {

    const [queryParams, setQueryParams] = useSearchParams()

    const searchKeyword = queryParams.get('q')
    const [keyword, setKeyword] = useState(searchKeyword || '');
    const [search, setSearch] = useState({initial: true, process: false, result: ''})
    
	const handleFormSubmit = async (e) => {
		e.preventDefault()
        setSearch(o => ({initial:false, process: true, result: '' }))
        const searchValue = e.target[0].value;
        setQueryParams({'q' : searchValue})
        searchNews(searchValue)
  	}

    useEffect(() => {
        if (!searchKeyword) return
        setKeyword(searchKeyword)
        setSearch(o => ({initial:false, process: true, result: '' }))
        searchNews(keyword)
    },[searchKeyword])

    const searchNews = async (searchValue) => {
        const result = await newsapi.get("top-headlines?q=" + searchValue + "&country=id&apiKey=" + appConfig.API_KEY);
		setSearch(o => ({initial:false, process: false, result: result.data.articles }))
    }

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    }
    
 	return (
		<Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mt: 8,
            }}>
				<form onSubmit={(e) => handleFormSubmit(e)}>
                	<TextField hiddenLabel id="standard-basic" onChange={handleInputChange} value={keyword} placeholder="Search news.." variant="standard" helperText="Note: coba masukkan keyword huruf 'a' atau 'axx'"/>
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
                justifyContent: 'flex-start',
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
                
                { !search.initial && !search.process && search.result && search.result.map( (item, index) => {
                        if (item.urlToImage && item.content) {
                            return  <NewsCard key={item.title} news={item} category="popular" search={keyword} index={index}></NewsCard> 
                        } 
                    })
                }
             </Box>
		</Container>
  	)
}

export default Search;