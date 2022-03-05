import { CloseRounded } from '@mui/icons-material'
import { Autocomplete, Box, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProvincesRequest } from '../api/controllers/province-controller'

const Navbar = () => {
    const [chooseProvinceModal, setChooseProvinceModal] = useState(false)
    const [selectedProvince, setSelectedProvince] = useState(null)
    const [provinces, setProvinces] = useState([])

    const fetchProvinces = async () => {
        try {
            let res = await getProvincesRequest();

            if (res) {
                setProvinces(res.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchProvinces()

    }, [])


    return (
        <nav className="navbar">
            <div className="navbarNav">
                <div className="logo">
                    <Link to={'/'}>SosyoPazar</Link >
                    <span style={{ margin: "0 .5rem" }}>|</span>
                    <button style={{ backgroundColor: 'rgba(169, 146, 125, 0.25)' }} onClick={() => setChooseProvinceModal(true)} >
                        {selectedProvince ? selectedProvince : 'Şehir Seçin'}
                    </button>
                </div>
                <div className="nav-buttons">
                    <Link to={'/login'}>
                        <button className="">GİRİŞ YAP</button>
                    </Link>
                    <Link to={'/register'}>
                        <button className="registerButton">ÜYE OL</button>
                    </Link>
                </div>
            </div>

            <Modal
                open={chooseProvinceModal}
                onClose={() => setChooseProvinceModal(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 3,
                }}>
                    <Box sx={{ position: 'absolute', right: 15, top: 15 }}>
                        <IconButton onClick={() => setChooseProvinceModal(false)} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                    <Typography variant="overline">
                        ÖNCELİKLE ŞEHİR SEÇELİM
                    </Typography>
                    <Autocomplete
                        sx={{ mt: 2 }}
                        options={provinces}
                        value={selectedProvince}
                        onChange={(event, newValue) => {
                            setSelectedProvince(newValue);
                        }}
                        getOptionLabel={(option) => option?.provinceName}
                        renderInput={(params) => <TextField {...params} label="Şehir seçiniz" />}
                    />
                </Box>
            </Modal >
        </nav >
    )
}
export default Navbar