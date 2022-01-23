import React from 'react'
import Navbar from '../../components/Navbar'
import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Page = () => {

    const test = ["test", "text"]

    return (
        <Container>
            <Navbar />
            <section className='defaultSection'>
                <Grid container padding={0}>
                    <Grid item xs={12} md={6}>
                        <img src='/assets/loginImg.svg' width='100%' />
                    </Grid>
                    <Grid item xs={12} md={6} display='flex' justifyContent='center' alignItems='center'>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 3rem", textAlign: "left" }}>
                            <h1 style={{ marginBottom: "2rem" }}>Pazar seni özlemişti hoşgeldin :)</h1>
                            <input type='text' className='customInput' placeholder="Kullanıcı Adın" />
                            <input type='password' className='customInput' placeholder="Şifren" />
                            <Link style={{ width: "100%" }} to={'/dashboard'}>
                                <button style={{ width: "100%" }} className='loginRegisterBtn'>Giriş Yap</button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box style={{ marginTop: "5rem", padding: "2rem", textAlign: "center", backgroundColor: "rgba(169, 146, 125, 0.5)" }}>
                    <Typography>Nasıl yanii! Henüz hesabın yok mu? <Link to={'/register'}><b>Buradan</b></Link> hemen oluşturabilirsin :)</Typography>
                </Box>
            </section >
        </Container >
    )
}
export default Page