import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Box, Grid, Container, Divider, Autocomplete } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import Footer from '../../components/Footer'
import { getSellersRequest, searchSellerRequest } from '../../api/controllers/seller-controller'
import { useHistory } from 'react-router-dom'
const Page = () => {
    const localProvince = JSON.parse(localStorage.getItem("localProvince"));
    const history = useHistory();
    const [sellers, setSellers] = useState([])

    const fetchSellers = async () => {
        try {
            let res = await getSellersRequest(localProvince && localProvince.id);

            if (res) {
                setSellers(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [searchResult, setSearchResult] = useState(sellers)

    const handleChangeSearch = async (searchText) => {
        try {
            let res = await searchSellerRequest({ searchText: searchText, provinceId: localProvince?.id })

            if (res) {
                setSearchResult(res.data)
            }
        } catch (error) {

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
                <Autocomplete
                    options={searchResult}
                    onInputChange={(e) => handleChangeSearch(e.target.value)}
                    getOptionLabel={(option) => option.storeName}
                    onChange={(event, newValue) => {
                        history.push('/store?id=' + newValue?.id)
                    }}
                    sx={{
                        width: "40%",
                        display: 'inline-block',
                        marginBottom: "2rem",
                        '& input': {
                            height: "2rem",
                            width: "100%",
                            borderRadius: "1rem",
                            border: "1px solid #777777",
                            padding: "0 2rem 0 1rem"
                        }
                    }}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input placeholder='Mağaza adı veya sektör yazın' type="text" {...params.inputProps} />
                        </div>
                    )}
                />
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