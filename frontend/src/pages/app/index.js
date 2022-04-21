import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Box, Grid, Container, IconButton, Divider } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { SearchRounded } from '@mui/icons-material'
import Footer from '../../components/Footer'
import { getSellersRequest } from '../../api/controllers/seller-controller'
const Page = () => {

    const [sellers, setSellers] = useState([])

    const fetchSellers = async () => {
        try {
            let res = await getSellersRequest();

            if (res) {
                setSellers(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchSellers()

    }, [])


    return (
        <Container>
            <Navbar />
            <section className='defaultSection' style={{ textAlign: 'center' }}>
                <Box sx={{ margin: '2rem 0' }}>
                    <h2 className='title'>SosyoPazar'a Hoşgeldin!</h2>
                    <p className='subTitle'>Bugün çevrende ne arıyorsun?</p>
                </Box>
                <input className='searchInput' type="search" />
                <IconButton sx={{ marginLeft: "-1.75rem", width: "1.5rem", height: "1.5rem" }}><SearchRounded fontSize='small' /></IconButton>
                <img style={{ width: "100%", height: "auto", marginTop: "2rem" }} src='/assets/searchImage.svg' alt='' />
                <Box style={{ width: "100%", height: "5rem", marginTop: "-4rem", backgroundColor: "rgba(169, 146, 125, 0.5)" }}></Box>
            </section>
            {/* <Paper sx={{ margin: "2rem 0", borderRadius: "20px", padding: "1rem", textAlign: "center", boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)" }}>
                <h4>Ne aradığını bilmiyor musun? Keşfet!</h4>
            </Paper> */}
            <section
                className="defaultSection" >
                <Box padding={4} sx={{ textAlign: 'left' }}>
                    <h3 className='title'>Bulunduğun konuma yakın mekanlar</h3>
                    <p className='subTitle'>Belki lazım olur :)</p>
                    <Divider sx={{ my: "1rem" }} />
                    <Grid container spacing={2}>
                        {
                            sellers.map((val, i) =>
                                <CustomCard key={i} store={val} fetchSellers={fetchSellers} />
                            )
                        }
                    </Grid>
                </Box>
            </section >
            <Footer />
        </Container >

    )
}
export default Page