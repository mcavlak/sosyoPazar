import { AddCircleRounded, GroupAddRounded, RemoveCircleOutlineRounded, RemoveCircleRounded } from '@mui/icons-material'
import { Card, Grid, IconButton, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import React from 'react'
import { Link } from 'react-router-dom'
import { updFollowSellerRequest, updUnFollowSellerRequest } from '../api/controllers/seller-controller'

const CustomCard = ({ store, fetchSellers }) => {
    const { enqueueSnackbar } = useSnackbar();
    const user = JSON.parse(localStorage.getItem("user"));

    const followFunc = async () => {
        try {
            if (store?.followed === true) {
                let res = await updUnFollowSellerRequest(store.id);

                if (res) {
                    enqueueSnackbar('Mağazayı takibi bıraktın :(', { variant: 'error' });
                    fetchSellers()

                }
            } else if (store?.followed === false) {
                let res = await updFollowSellerRequest(store.id);

                if (res) {
                    enqueueSnackbar('Mağazayı takip ettin!', { variant: 'success' });
                    fetchSellers()
                }
            } else {
                enqueueSnackbar('Lütfen giriş yapın!', { variant: 'warning' });
            }
        } catch (error) {
            if (error.response.status === 401) {
                enqueueSnackbar('Takip işlemi yapabilmek için kullanıcı girişi yapmalısın!', { variant: 'warning' });
            }
        }
    }

    return (
        <Grid item md={4} sm={6} sx={{ width: '100%' }}>
            <Card sx={{ borderRadius: "20px", boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)" }}>
                <Box
                    className="cardImg"
                    sx={{
                        backgroundImage: store?.coverPhoto ? `url(data:image/jpeg;base64,${store?.coverPhoto})` : "url(https://source.unsplash.com/random)",
                    }}>
                    {
                        user?.role === "ROLE_CUSTOMER" &&
                        <Box
                            className="cardFollow"
                        >
                            <IconButton
                                onClick={() => followFunc()}
                                sx={{
                                    color: "#ffffff"
                                }}>
                                {
                                    store?.followed ?
                                        <RemoveCircleRounded /> :
                                        <AddCircleRounded />
                                }
                            </IconButton>
                        </Box>
                    }
                    <Box className="cardRating">
                        <Rating value={store?.averageScore} readOnly size="small" />
                    </Box>
                </Box>
                <Box
                    className="cardBody">
                    <Box
                        className="cardUserImg"
                        sx={{
                            backgroundImage: store?.profilePhoto ? `url(data:image/jpeg;base64,${store?.profilePhoto})` : "url(https://source.unsplash.com/random)",
                        }}>
                    </Box>
                    <Box
                        className="cardFollowers">
                        <GroupAddRounded color="gray" sx={{ fontSize: 16 }} />
                        <Typography margin={0.5} color="gray" fontSize={12}>Takipçi:</Typography>
                        <Typography fontSize={13} color="gray" fontWeight={600}>{store?.followersCount}</Typography>
                    </Box>
                    <Box
                        className="cardTitle">
                        <Link to={`/store?id=${store?.id}`}>
                            <h3>{store?.storeName}</h3>
                        </Link>
                    </Box>
                    <Box
                        className="cardText">
                        <Grid container spacing={1}>
                            <Grid item md={4} xs={4}>
                                Konum
                            </Grid>
                            <Grid item md={8} xs={8}>
                                {store?.province?.provinceName}
                            </Grid>
                            <Grid item md={4} xs={4}>
                                Sektör
                            </Grid>
                            <Grid item md={8} xs={8}>
                                {store?.industry?.name}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}
export default CustomCard