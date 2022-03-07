import React, { useEffect, useState } from 'react'
import { Badge, Box, Divider, Tab, Tabs, Grid, Alert, AlertTitle } from '@mui/material'
import DiscoverCard from '../../components/DiscoverCard';
import { a11yProps, TabPanel } from '../../components/MuiTabPanel';
import { getFollowingPostsRequest } from '../../api/controllers/post-controller';


const Page = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const Discover = () => {

        const [posts, setPosts] = useState([])

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

            fetchPosts()

        }, [])

        return (
            posts.length > 0 ?
                posts.map((val, i) =>
                    <DiscoverCard key={i} postData={val} />
                ) :
                <Alert severity="warning">
                    <AlertTitle>Henüz paylaşım yapılmamış :(</AlertTitle>
                    Burada içerik görmek istersen daha fazla mağazayı <strong>takip etmelisin!</strong>
                </Alert>
        )
    }

    return (

        <Box sx={{ textAlign: 'left', padding: '2rem' }}>
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
                        <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={1} color="secondary">
                            <p style={{ width: '100%', paddingRight: '1rem' }}>TEKLİFLERİM</p>
                        </Badge>} {...a11yProps(2)} />
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
                        asdfdsafdsfadfadfgafdgdfsgsdfgfdagadfgadfgdfgdfg
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        Item Four
                    </TabPanel>
                </Grid>
            </Grid>
        </Box>

    )
}
export default Page