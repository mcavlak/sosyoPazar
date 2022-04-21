import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ProductCard = ({ productData }) => {

    return (
        <Box className="product-card" sx={{ backgroundImage: `url(data:image/jpeg;base64,${productData})` }}>
            <Typography sx={{ p: 1 }}>
                Test
            </Typography>
        </Box >
    )
}
export default ProductCard;