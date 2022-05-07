import React, { useEffect, useState } from 'react'
import { Badge, Box, Divider, Tab, Tabs, Grid, Alert, AlertTitle, IconButton, ListItem, List, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import DiscoverCard from '../../components/DiscoverCard';
import { a11yProps, TabPanel } from '../../components/MuiTabPanel';
import { getFollowingPostsRequest } from '../../api/controllers/post-controller';
import { getMyFollows } from '../../api/controllers/customer-controller';
import { RemoveCircleRounded } from '@mui/icons-material';


const Page = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [posts, setPosts] = useState([])
    const [myFollows, setMyFollows] = useState([])



    const fetchMyFollows = async () => {
        try {
            let res = await getMyFollows();
            if (res) {
                setMyFollows(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPosts = async () => {
        try {
            let res = await getFollowingPostsRequest();
            if (res) {
                setPosts(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        fetchMyFollows()
        fetchPosts()

    }, [])


    const Discover = () => {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {
                    posts.length > 0 ?
                        posts.map((val, i) =>

                            <DiscoverCard key={i} postData={val} />

                        ) :
                        <Alert severity="warning">
                            <AlertTitle>Henüz paylaşım yapılmamış :(</AlertTitle>
                            Burada içerik görmek istersen daha fazla mağazayı <strong>takip etmelisin!</strong>
                        </Alert>
                }
            </Box>
        )
    }

    return (

        <Box sx={{ textAlign: 'left', padding: '2rem', minHeight: '60vh' }}>
            <h2 className='title'>hoşgeldin, {
                user?.role === "ROLE_CUSTOMER" ?
                    user?.name :
                    user?.role === "ROLE_SELLER" ?
                        user?.storeName : "Kullanıcı"
            }
            </h2>
            <p className='subTitle'>Pazarda sana ait olayları görüntüleyebilir ve aşağıdan pazar ahalisinin paylaştıklarını görebilirsin...</p>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3} >
                <Grid item xs={12} sm={4} md={3}>
                    <Tabs
                        orientation="vertical"
                        value={tabValue}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab sx={{ alignItems: 'flex-start' }} label={<p style={{ textAlign: 'left' }}>Keşfet</p>} {...a11yProps(0)} />
                        <Tab sx={{ alignItems: 'flex-start' }} label={
                            <p style={{ textAlign: 'left' }}>TAKİP ETTİKLERİM</p>
                        } {...a11yProps(3)} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <TabPanel value={tabValue} index={0}>
                        <Discover />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <List>
                            {
                                myFollows.map((val) =>
                                    <ListItem
                                        key={val?.id}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <RemoveCircleRounded />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={'data:image/jpeg;base64,' + val?.profilePhoto} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={val?.storeName}
                                        />
                                    </ListItem>
                                )
                            }
                        </List>
                    </TabPanel>
                </Grid>
            </Grid>
        </Box>

    )
}
export default Page