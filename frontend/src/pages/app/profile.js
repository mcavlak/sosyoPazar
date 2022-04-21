import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Rating, Tabs, Tab, Dialog, DialogTitle, IconButton, DialogContent, TextField, Alert, AlertTitle, DialogActions, Button } from '@mui/material'
import { getSellerRequest, updFollowSellerRequest, updUnFollowSellerRequest } from '../../api/controllers/seller-controller';
import { getSellerAverageRequest, getSellerCommentsRequest, saveSellerCommentRequest } from '../../api/controllers/seller-comment-controller';
import { a11yProps, TabPanel } from '../../components/MuiTabPanel';
import { AddPhotoAlternateRounded, CloseRounded, GroupAddRounded, GroupRemoveRounded } from '@mui/icons-material';
import { getPostsBySellerIdRequest } from '../../api/controllers/post-controller';
import DiscoverCard from '../../components/DiscoverCard';
import { useSnackbar } from 'notistack';
import CommentCard from '../../components/CommentCard';


const Page = () => {
    const { enqueueSnackbar } = useSnackbar();

    //MUI TAB
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    //MUI DIALOG
    const [commentDialog, setCommentDialog] = useState(false)


    //FIND SELLER ID
    let sellerId = (new URLSearchParams(window.location.search)).get("id")


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
            <Box className='store-cover' sx={{ backgroundImage: "url(/assets/baharatci.jpg)" }} />
            <Grid container spacing={3} >
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '-5rem', mb: '1rem' }}>
                        <Box className='store-profile-img' sx={{ backgroundImage: "url(/assets/baharatci.jpg)" }} />
                        <Typography variant='overline' sx={{ mt: '1rem', mb: '.5rem', lineHeight: 'normal' }} fontSize={18}>{storeData?.storeName}</Typography>
                        <Rating
                            value={storeScore}
                            readOnly
                        />
                        <Typography onClick={() => setCommentDialog(true)} sx={{ cursor: 'pointer' }} color='primary' variant='body2'>Dükkanı değerlendir</Typography>
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
                        <Button variant='outlined' startIcon={<AddPhotoAlternateRounded />}>
                            {storeData?.followed ? 'TAKİBİ BIRAK' : 'TAKİP ET'} <span style={{ paddingLeft: 5 }}>|  {storeData?.followersCount}</span>
                        </Button>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 2rem 2rem 1rem' }}>
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
                        Item Three
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
        </>
    )
}
export default Page