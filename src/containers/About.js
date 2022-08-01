import { Typography, Link, Container, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const About = () => {
    return (
        <Container maxWidth="lg">
            <Typography component="div" variant="h4" align="center" sx={{ margin: 5 }}>
               Tentang Aplikasi
            </Typography>
            <Typography sx={{mb:2}}>
                Aplikasi News Portal berisi daftar berita terbaru dari berbagai kategori. Berita diambil dari API Newsapi (<Link href="https:newsapi.org">https://newsapi.org</Link>) untuk dokumentasinya dapat diakses di <Link href="">dokumentasi newsapi.org</Link>. Sedangkan untuk authenticationnya, menggunakan Firebase.
            </Typography>
            <Typography sx={{mb:2}}>
                Pada aplikasi ini Authorization di berlakukan di dua tempat yaitu:
                
            </Typography>
            <ol sx={{ listStyle: 'circle' }}>
                    <li>Pada halaman depan pada list artikel: jika user belum login maka daftar artikel tidak muncul dan akan muncul notifikasi untuk login.</li>
                    <li>berikutnya adalah halaman detail artikel, jika ingin melihat detail artikel maka diharuskan login terlebih dahulu.</li> 
                </ol>
            <Typography sx={{mb:2}}>
                Akhir kata semoga aplikasi ini bermanfaat, salam.
            </Typography>
            <Outlet/>
        </Container>
    )
}

export default About;