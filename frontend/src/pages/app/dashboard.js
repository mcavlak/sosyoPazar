import React from 'react'
import Navbar from '../../components/Navbar'
import { Badge, Box, Card, Container, Divider, Tab, Tabs, Typography } from '@mui/material'

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

    return (
        <Container>
            <Navbar />
            <section className='defaultSection'>
                <Box sx={{ textAlign: 'left', padding: '2rem' }}>
                    <h2 className='title'>hoşgeldin, mustafa</h2>
                    <p className='subTitle'>Pazarda sana ait olayları görüntüleyebilir ve aşağıdan pazar ahalisinin paylaştıklarını görebilirsin...</p>
                    <Divider sx={{ my: 3 }} />
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
                    >
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab sx={{ alignItems: 'flex-start' }} label={<p style={{ textAlign: 'left' }}>Keşfet</p>} {...a11yProps(0)} />
                            <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={4} color="primary">
                                <p style={{ width: '100%', paddingRight: '1rem' }}>MESAJLARIM</p>
                            </Badge>} {...a11yProps(1)} />
                            <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={1} color="error">
                                <p style={{ width: '100%', paddingRight: '1rem' }}>TEKLİFLERİM</p>
                            </Badge>} {...a11yProps(2)} />
                            <Tab sx={{ alignItems: 'flex-start' }} label={<Badge badgeContent={2} color="secondary">
                                <p style={{ width: '100%', paddingRight: '1rem' }}>FAVORİLERİM</p>
                            </Badge>} {...a11yProps(3)} />
                        </Tabs>
                        <TabPanel sx={{ width: '100%', height: '100' }} value={value} index={0}>
                            <Box sx={{ width: '100%', height: '100' }}>
                                <Card sx={{ width: '100%', height: '100' }}>
                                    sds
                                </Card>
                            </Box>
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
                    </Box>
                </Box>
            </section >
        </Container >
    )
}
export default Page