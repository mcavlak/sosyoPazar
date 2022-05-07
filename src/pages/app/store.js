import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Rating, Tabs, Tab, Dialog, DialogTitle, IconButton, DialogContent, TextField, Alert, AlertTitle, DialogActions, Button } from '@mui/material'
import { getSellerRequest, updFollowSellerRequest, updUnFollowSellerRequest } from '../../api/controllers/seller-controller';
import { getSellerAverageRequest, getSellerCommentsRequest, saveSellerCommentRequest } from '../../api/controllers/seller-comment-controller';
import { a11yProps, TabPanel } from '../../components/MuiTabPanel';
import { CloseRounded, GroupAddRounded, GroupRemoveRounded } from '@mui/icons-material';
import { getPostsBySellerIdRequest, savePostRequest } from '../../api/controllers/post-controller';
import DiscoverCard from '../../components/DiscoverCard';
import { useSnackbar } from 'notistack';
import CommentCard from '../../components/CommentCard';
import SellerProfilePhoto from '../../components/SellerProfilePhoto';
import SellerCoverPhoto from '../../components/SellerCoverPhoto';
import ProductCard from '../../components/ProductCard';
import ImageUploading from 'react-images-uploading';
import { saveProductRequest } from '../../api/controllers/product-controller';


const Page = () => {
    const { enqueueSnackbar } = useSnackbar();

    //MUI TAB
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    //MUI DIALOG
    const [commentDialog, setCommentDialog] = useState(false)
    const [productDialog, setProductDialog] = useState(false)
    const [postDialog, setPostDialog] = useState(false)

    //FIND SELLER ID
    const sellerId = (new URLSearchParams(window.location.search)).get("id")
    const user = JSON.parse(localStorage.getItem("user"));
    const [myProfile, setMyProfile] = useState(user?.role === "ROLE_SELLER" && sellerId == user?.id)

    //GET STORE
    const [storeData, setStoreData] = useState(null)
    const fetchStore = async () => {
        try {
            let res = await getSellerRequest(sellerId);

            if (res) {
                setStoreData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //GET STORE SCORE
    const [storeScore, setStoreScore] = useState(null)
    const fetchStoreScore = async () => {
        try {
            let res = await getSellerAverageRequest(sellerId);
            if (res) {
                setStoreScore(res.data.averageScore)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //GET STORE POST LIST
    const [storePostList, setStorePostList] = useState([])
    const fetchStorePosts = async () => {
        try {
            let res = await getPostsBySellerIdRequest(sellerId);
            if (res) {
                setStorePostList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //ADD STORE POST
    const [post, setPost] = useState({
        content: "",
    })

    const handleAddPost = async () => {
        try {
            let res = await savePostRequest(post);
            if (res) {
                enqueueSnackbar('Başarıyla paylaşım yaptın!', { variant: 'success' });
                setPost({
                    content: "",
                })
                fetchStorePosts()
            }
        } catch (error) {
            console.log(error);
        }
    }


    //GET COMMENTS
    const [commentList, setCommentList] = useState([])
    const fetchCommentList = async () => {
        try {
            let res = await getSellerCommentsRequest(sellerId);
            if (res) {
                setCommentList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //ADD COMMENT
    const [comment, setComment] = useState({
        comment: "",
        score: null,
        sellerId: sellerId,
    })

    const closeCommentDialog = () => {
        setComment({
            comment: "",
            score: null,
            sellerId: sellerId,
        });
        setCommentDialog(false);
    }

    const handleAddComment = async () => {
        try {
            let res = await saveSellerCommentRequest(comment);
            if (res) {
                enqueueSnackbar('Başarıyla yorum yaptın!', { variant: 'success' });
                closeCommentDialog()
                fetchStoreScore()
                fetchCommentList()
            }
        } catch (error) {
            console.log(error);
        }
    }


    //GET PRODUCTS
    const [productList, setProductList] = useState([])
    const fetchProductList = async () => {
        try {
            let res = await getSellerCommentsRequest(sellerId);
            if (res) {
                setProductList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //ADD PRODUCT
    const [selectedImage, setSelectedImage] = useState("")
    const [product, setProduct] = useState({
        file: null, productName: ""
    })
    const productImageUpload = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);

        setSelectedImage(imageList[0].data_url)

        let formData = new FormData();

        formData.append('file', imageList[0].file)

        product.file = (formData)
        setProduct({ ...product })
    };
    const closeProductDialog = () => {
        setProduct({
            file: null,
            productName: "",
        });
        setProductDialog(false);
    }

    const handleAddProduct = async () => {
        try {
            let res = await saveProductRequest(product);
            if (res) {
                enqueueSnackbar('Başarıyla yorum yaptın!', { variant: 'success' });
                fetchProductList()
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(product)


    //FOLLOW FUNC
    const followFunc = async () => {
        try {
            if (storeData?.followed === true) {
                let res = await updUnFollowSellerRequest(sellerId);

                if (res) {
                    enqueueSnackbar('Mağazayı takibi bıraktın :(', { variant: 'error' });
                    fetchStore()

                }
            } else if (storeData?.followed === false) {
                let res = await updFollowSellerRequest(sellerId);

                if (res) {
                    enqueueSnackbar('Mağazayı takip ettin!', { variant: 'success' });
                    fetchStore()
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                enqueueSnackbar('Takip işlemi yapabilmek için kullanıcı girişi yapmalısın!', { variant: 'warning' });
            }
        }
    }


    useEffect(() => {

        fetchStore()
        fetchStoreScore()
        fetchStorePosts()
        fetchCommentList()

    }, [])


    return (
        <>
            {
                myProfile ?
                    <SellerCoverPhoto photoUrl={storeData?.coverPhoto} fetchStore={fetchStore} /> :
                    <Box className='store-cover' sx={{ backgroundImage: storeData?.coverPhoto ? `url(data:image/jpeg;base64,${storeData?.coverPhoto})` : "url(https://source.unsplash.com/random)" }} />
            }
            <Grid container spacing={3} pb={5} >
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '-7.5rem', mb: '1rem' }}>
                        {
                            myProfile ?
                                <SellerProfilePhoto
                                    photoUrl={storeData?.profilePhoto}
                                    fetchStore={fetchStore}
                                /> :
                                <Box
                                    className='store-profile-img'
                                    sx={{ backgroundImage: storeData?.profilePhoto ? `url(data:image/jpeg;base64,${storeData?.profilePhoto})` : "url(https://source.unsplash.com/random)", cursor: 'pointer' }} />
                        }

                        <Typography variant='overline' sx={{ mt: '1rem', mb: '.5rem', lineHeight: 'normal' }} fontSize={18}>{storeData?.storeName}</Typography>
                        <Rating
                            value={storeScore}
                            readOnly
                        />
                        {
                            !myProfile &&
                            <Typography onClick={() => setCommentDialog(true)} sx={{ cursor: 'pointer' }} color='primary' variant='body2'>Dükkanı değerlendir</Typography>
                        }
                    </Box>
                    <Tabs
                        orientation="vertical"
                        value={tabValue}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab sx={{ alignItems: 'flex-start' }} label={<p style={{ paddingLeft: '1rem', textAlign: 'left' }}>GÖNDERİLER</p>} {...a11yProps(0)} />
                        <Tab sx={{ alignItems: 'flex-start' }} label={<p style={{ paddingLeft: '1rem', textAlign: 'left' }}>YORUMLAR</p>
                        } {...a11yProps(1)} />
                        <Tab sx={{ alignItems: 'flex-start' }} label={
                            <p style={{ paddingLeft: '1rem', textAlign: 'left' }}>VİTRİN</p>
                        } {...a11yProps(2)} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mr: '2rem' }}>
                        {
                            !myProfile &&
                            <Button onClick={() => followFunc()} variant='outlined' startIcon={storeData?.followed ? <GroupRemoveRounded /> : <GroupAddRounded />}>
                                {storeData?.followed ? 'TAKİBİ BIRAK' : 'TAKİP ET'} <span style={{ paddingLeft: 5 }}>|  {storeData?.followersCount}</span>
                            </Button>
                        }
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 2rem 2rem 1rem' }}>
                            {
                                myProfile &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', }}>
                                    <TextField fullWidth variant='outlined' label="Paylaşmak istediklerinizi yazın" multiline minRows={2} onChange={(e) => {
                                        post.content = e.target.value
                                        setPost({ ...post })
                                    }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button disabled={!post.content} variant='outlined' onClick={() => handleAddPost()}>Paylaş</Button>
                                    </Box>
                                </Box>
                            }
                            {
                                storePostList.length > 0 ?
                                    storePostList.map((val, i) =>

                                        <DiscoverCard key={i} postData={val} />

                                    ) :
                                    <Alert severity="warning">
                                        <AlertTitle>Henüz paylaşım yapılmamış :(</AlertTitle>
                                        Burada içerik görmek istersen daha fazla mağazayı <strong>takip etmelisin!</strong>
                                    </Alert>
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 2rem 2rem 1rem' }}>
                            {
                                commentList.length > 0 ?
                                    commentList.map((val, i) =>

                                        <CommentCard key={i} commentData={val} />

                                    ) :
                                    <Alert severity="warning">
                                        <AlertTitle>Henüz yorum yapılmamış :(</AlertTitle>
                                        Burada içerik görmek istersen daha fazla mağazayı <strong>takip etmelisin!</strong>
                                    </Alert>
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <Box sx={{ display: 'flex', px: "2rem", justifyContent: 'flex-end' }}>
                            {
                                myProfile &&
                                <Button onClick={() => setProductDialog(true)} variant='outlined'>
                                    YENİ ÜRÜN EKLE
                                </Button>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 2rem 2rem 1rem' }}>
                            <Grid container spacing={2}>
                                {
                                    productList.length > 0 ?
                                        productList.map((val, i) =>
                                            <Grid key={i} item xs={12} md={4}>
                                                <ProductCard commentData={val} />
                                            </Grid>
                                        ) :
                                        <Alert sx={{ width: "100%" }} severity="warning">
                                            <AlertTitle>Henüz ürün eklenmemiş :(</AlertTitle>
                                            Burada içerik görmek istersen daha fazla mağazayı <strong>takip etmelisin!</strong>
                                        </Alert>
                                }
                            </Grid>
                        </Box>
                    </TabPanel>
                </Grid>
            </Grid>

            <Dialog
                fullWidth
                maxWidth='xs'
                open={commentDialog}
                onClose={() => closeCommentDialog()}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
                        <Typography>
                            Puanlayıp yorum yapın!
                        </Typography>
                        <IconButton onClick={() => closeCommentDialog()} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Rating
                            value={comment.score}
                            onChange={(event, newValue) => {
                                comment.score = newValue;
                                setComment({ ...comment })
                            }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Yorumunuzu yazın"
                            onChange={(e) => {
                                comment.comment = e.target.value
                                setComment({ ...comment })
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => handleAddComment()} variant='contained'>Yorum Yap</Button>
                </DialogActions>
            </Dialog>



            <Dialog
                fullWidth
                maxWidth='sm'
                open={productDialog}
                onClose={() => closeProductDialog()}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
                        <Typography>
                            Yeni Ürün Ekleyin!
                        </Typography>
                        <IconButton onClick={() => closeProductDialog()} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <TextField
                            fullWidth
                            label="Ürün Adı"
                            onChange={(e) => {
                                product.productName = e.target.value
                                setProduct({ ...product })
                            }}
                        />
                        <ImageUploading

                            onChange={productImageUpload}
                            dataURLKey="data_url"
                        >
                            {({
                                onImageUpload,
                                onImageUpdate,
                                dragProps,
                            }) => (
                                <Box
                                    onClick={selectedImage ? onImageUpdate : onImageUpload}
                                    sx={{
                                        background: selectedImage ? `url(${selectedImage})` : "#ddd",
                                        cursor: 'pointer',
                                        minWidth: 150,
                                        height: 150,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "12px",
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover"
                                    }}
                                    {...dragProps}
                                >
                                    {
                                        !selectedImage &&
                                        <Typography color="primary" textAlign="center">
                                            Resim Ekle
                                        </Typography>
                                    }
                                </Box>

                            )
                            }
                        </ImageUploading >
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => handleAddProduct()} variant='contained'>Ekle</Button>
                </DialogActions>
            </Dialog >

        </>
    )
}
export default Page