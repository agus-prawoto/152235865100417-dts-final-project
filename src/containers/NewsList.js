import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import newsapi from '../apis/newsapi';
import NewsCard from '../components/NewsCard';

const NewsList = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [moviesReady, setMoviesReady] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedNews = await newsapi.get("top-headlines?country=id&category=technology&apiKey=22ebcc31f7c645b4ab8baa53f7edd22a");
                setMovies(fetchedNews.data.results);
                setMoviesReady(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies();
    }, []);

    useEffect(() => {
        if (!moviesReady) return;
        const sortMovies = (type) => {
            if (type === 'asc') {
                const sorted = [...movies].sort((a, b) => a.vote_average - b.vote_average);
                setMovies(sorted);
            }
            if (type === 'desc') {
                const sorted = [...movies].sort((a, b) => b.vote_average - a.vote_average);
                setMovies(sorted);
            }
        }

        sortMovies(queryParams.get('sort'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams, moviesReady]);

    const setSortParam = (type) => {
        queryParams.set("sort", type);
        setQueryParams(queryParams);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 5,
        }}>
            <Box sx={{
                mt: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
                {
                    movies.map(movie => (
                        <NewsCard key={movie.title} movie={movie}></NewsCard>
                    ))
                }
            </Box>
        </Box>
    );
}

export default NewsList;
