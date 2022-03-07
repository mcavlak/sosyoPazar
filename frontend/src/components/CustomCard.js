import { AddCircleRounded, GroupAddRounded } from '@mui/icons-material'
import { Card, Grid, IconButton, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CustomCard = ({ store }) => {

    return (
        <Grid item md={3} sm={6} sx={{ width: '100%' }}>
            <Card sx={{ borderRadius: "20px", boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)" }}>
                <Box
                    className="cardImg"
                    sx={{
                        backgroundImage: `url("/assets/baharatci.jpg")`,

                    }}>
                    <Box
                        className="cardFollow"
                    >
                        <IconButton
                            sx={{
                                color: "#ffffff"
                            }}>
                            <AddCircleRounded />
                        </IconButton>
                    </Box>
                    <Box className="cardRating">
                        <Rating value={5} readOnly size="small" />
                    </Box>
                </Box>
                <Box
                    className="cardBody">
                    <Box
                        className="cardUserImg"
                        sx={{
                            backgroundImage: `url("/assets/baharatci.jpg")`,

                        }}>
                    </Box>
                    <Box
                        className="cardFollowers">
                        <GroupAddRounded color="gray" sx={{ fontSize: 16 }} />
                        <Typography margin={0.5} color="gray" fontSize={12}>Takipçi:</Typography>
                        <Typography fontSize={13} color="gray" fontWeight={600}>{20}</Typography>
                    </Box>
                    <Box
                        className="cardTitle">
                        <h3>{store?.storeName}</h3>
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