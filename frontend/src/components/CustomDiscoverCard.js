import { Card, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CustomDiscoverCard = (props) => {

    return (
        <Grid item xs={12} md={12}>
            <Card sx={{ borderRadius: "20px", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)", width: '100%' }}>
                <Box display={'flex'}>
                    <Box
                        className="discoverCardUserImg"
                        sx={{
                            backgroundImage: `url("/assets/baharatci.jpg")`,

                        }}>
                    </Box>
                    <Box sx={{ marginLeft: 2 }}>
                        <Typography variant='h6'>Test 1 2</Typography>
                        <Typography variant='caption'>10 Aralık 2021 20:16</Typography>
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}
export default CustomDiscoverCard