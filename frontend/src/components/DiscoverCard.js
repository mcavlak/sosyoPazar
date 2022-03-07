import { Card, Avatar, Typography, Divider, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DiscoverCard = (props) => {

    return (
        <Card sx={{ p: 3, boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)", borderRadius: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 56, height: 56 }} />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant='h6' sx={{ margin: 0 }}>Test</Typography>
                        <Typography variant='p' sx={{ margin: 0, fontWeight: 300 }}>14.12.2021 21.46</Typography>
                    </Box>
                </Box>
                <Button sx={{ justifySelf: "end" }}>TEKLİF VER</Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant='p'>
                Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.
            </Typography>
        </Card >
    )
}
export default DiscoverCard;