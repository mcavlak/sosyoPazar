import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import RUG from 'react-upload-gallery';
import ImageGallery from 'react-image-gallery';

const ProductCard = ({ product, myprofile }) => {

    const [productDetailDialog, setProductDetailDialog] = useState(false);
    const base_url = "http://localhost:8080"

    const [productImages, setProductImages] = useState(
        product.photoIdList && product.photoIdList.length > 0 &&
        product.photoIdList.map(v => ({
            original: `${base_url}/api/product/${product.id}/photo/${v}`,
            thumbnail: `${base_url}/api/product/${product.id}/photo/${v}`,
            originalHeight: 300,
            thumbnailHeight: 50,
            originalClass: "product-card-image-list",
            thumbnailClass: "product-card-image-list",
        }))
    )

    return (
        <Grid key={product.id} item xs={12} sm={6} md={4} >
            <Card onClick={() => setProductDetailDialog(true)} sx={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)", borderRadius: "20px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={product.photoIdList && product.photoIdList.length > 0 ? `${base_url}/api/product/${product.id}/photo/${product.photoIdList[0]}` : "/assets/no-image.svg"}
                        alt={product.productName}
                        height="200"
                    />
                    <CardContent>
                        <Tooltip title={product.productName}>
                            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} gutterBottom variant="body1" component="div">
                                {product.productName}
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </CardActionArea>
            </Card >

            <Dialog
                fullWidth
                maxWidth="sm"
                open={productDetailDialog}
                onClose={() => setProductDetailDialog(false)}
            >
                <DialogTitle>Ürün detayları</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            {
                                productImages && productImages.length > 0 &&
                                < ImageGallery items={productImages} showFullscreenButton={false} showPlayButton={false} />
                            }
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="caption">Ürün Adı</Typography>
                                <Typography variant="body1">{product.productName ? product.productName : "Belirtilmemiş"}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="caption">Ürün Fiyatı</Typography>
                                <Typography variant="body1">{product.price ? product.price + "₺" : "Belirtilmemiş"}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="caption">Ürün Açıklaması</Typography>
                                <Typography variant="body1">{product.description ? product.description : "Belirtilmemiş"}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={12} >
                            {
                                myprofile &&
                                <RUG
                                    headers={{ Authorization: `Bearer ${localStorage.getItem("token")}` }}
                                    inOrder={true}
                                    autoUpload={false}
                                    action={`http://localhost:8080/api/product/${product.id}/savePhoto/`}// upload route
                                    source={response => response.source} // response image source
                                    sorting={false}
                                    accept={['jpg', 'jpeg', 'png', 'gif']}
                                />
                            }
                        </Grid >
                    </Grid>
                </DialogContent>
                {
                    myprofile &&
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={() => setProductDetailDialog(false)} variant='contained'>Ekle</Button>
                    </DialogActions>
                }
            </Dialog>
        </Grid >
    )
}

export default ProductCard;