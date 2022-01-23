import { CloseRounded } from '@mui/icons-material'
import { Autocomplete, Box, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [chooseCityModal, setChooseCityModal] = useState(false)
    const [city, setCity] = useState()

    const citys = [
        {
            label: 'DENİZLİ',
            value: 'denizli',
        },
        {
            label: 'İZMİR',
            value: 'izmir'
        }
    ]

    return (
        <nav className="navbar">
            <div className="navbarNav">
                <div className="logo">
                    <Link to={'/'}>SosyoPazar</Link >
                    <span style={{ margin: "0 .5rem" }}>|</span>
                    <button style={{ backgroundColor: 'rgba(169, 146, 125, 0.25)' }} onClick={() => setChooseCityModal(true)} >
                        {city === undefined ? 'Şehir Seçin' : city}
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
                open={chooseCityModal}
                onClose={() => setChooseCityModal(false)}
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
                        <IconButton onClick={() => setChooseCityModal(false)} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Öncelikle şehir seçelim
                    </Typography>
                    <Autocomplete
                        disablePortal
                        options={citys}
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.outerText) & setChooseCityModal(false)}
                        sx={{ marginTop: '1.5rem' }}
                        renderInput={(params) => <TextField {...params} label="Şehir seçiniz" />}
                    />
                </Box>
            </Modal >
        </nav >
    )
}
export default Navbar