import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Badge, Box, Card, Container, Divider, Tab, Tabs, Grid, Input, Button } from '@mui/material'
import CustomDiscoverCard from '../../components/CustomDiscoverCard';
import ImageUploading from 'react-images-uploading';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Page = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    return (
        <Container>
            <Navbar />
            <section className='defaultSection'>
                <Box sx={{ textAlign: 'left', padding: '2rem' }}>
                    <h2 className='title'>hoşgeldin, mustafa</h2>
                    <p className='subTitle'>Pazarda sana ait olayları görüntüleyebilir ve aşağıdan pazar ahalisinin paylaştıklarını görebilirsin...</p>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={4} md={3}>
                            <Tabs
                                orientation="vertical"
                                value={value}
                                onChange={handleChange}
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab sx={{ alignItems: 'flex-start' }} label={<p style={{ textAlign: 'left' }}>Keşfet</p>} {...a11yProps(0)} />
                                {/*    <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={4} color="primary">
                                    <p style={{ width: '100%', paddingRight: '1rem' }}>MESAJLARIM</p>
                                </Badge>} {...a11yProps(1)} /> */}
                                <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={1} color="error">
                                    <p style={{ width: '100%', paddingRight: '1rem' }}>TEKLİFLERİM</p>
                                </Badge>} {...a11yProps(2)} />
                                <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={2} color="secondary">
                                    <p style={{ width: '100%', paddingRight: '1rem' }}>FAVORİLERİM</p>
                                </Badge>} {...a11yProps(3)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <TabPanel value={value} index={0}>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                            <button
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </button>
                                            &nbsp;
                                            <button onClick={onImageRemoveAll}>Remove all images</button>
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                <CustomDiscoverCard />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                asdfdsafdsfadfadfgafdgdfsgsdfgfdagadfgadfgdfgdfg
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </section >
        </Container >
    )
}
export default Page