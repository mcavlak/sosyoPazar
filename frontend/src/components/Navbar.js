import { CloseRounded, PersonOutlineRounded, Logout } from '@mui/icons-material'
import { Autocomplete, Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography, Avatar, Menu, MenuItem, Divider, Tooltip, ListItemIcon, DialogActions, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProvincesRequest } from '../api/controllers/province-controller'
import { savePostRequest } from '../api/controllers/post-controller'


const Navbar = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));
    const { enqueueSnackbar } = useSnackbar();


    const [chooseProvinceModal, setChooseProvinceModal] = useState(false)
    const [createPostModal, setCreatePostModal] = useState(false)


    const [selectedProvince, setSelectedProvince] = useState(null)
    const [provinces, setProvinces] = useState([])
    const [postContent, setPostContent] = useState("")


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

    const handleCreatePost = async () => {
        try {
            let res = await savePostRequest({ content: postContent });
            if (res) {
                enqueueSnackbar('Paylaşımın başarıyla yapıldı!', { variant: 'success' });
                setPostContent("")
                setCreatePostModal(false)
            }
        } catch (error) {
            enqueueSnackbar('Hata! Lütfen tekrar dener misin?', { variant: 'error' });

        }
    }

    useEffect(() => {

        fetchProvinces()

    }, [])


    const logout = async () => {
        await localStorage.removeItem("token");
        await localStorage.removeItem("user");
        history.push('/')
    }


    const CustomerNavItems = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <div className="nav-buttons">
                {
                    user?.role === "ROLE_CUSTOMER" ?
                        <button className="navButton" onClick={() => history.push('/dashboard')}>Keşfet</button> :
                        user?.role === "ROLE_SELLER" ?
                            <button className="navButton" onClick={() => setCreatePostModal(true)}>Paylaşım Yap</button> : ""
                }
                <Tooltip title="Hesabım">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 30, height: 30 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem disabled>
                        {
                            user?.role === "ROLE_CUSTOMER" ?
                                user?.name :
                                user?.role === "ROLE_SELLER" ?
                                    user?.storeName : "Kullanıcı"
                        }
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonOutlineRounded fontSize="small" />
                        </ListItemIcon>
                        Hesabım
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Çıkış yap
                    </MenuItem>
                </Menu>
            </div>
        );
    }

    return (
        <nav className="navbar">
            <div className="navbarNav">
                <div className="logo">
                    <Link to={'/'}>SosyoPazar</Link >
                    <span style={{ margin: "0 .5rem" }}>|</span>
                    <button className="navButton" style={{ backgroundColor: 'rgba(169, 146, 125, 0.25)' }} onClick={() => setChooseProvinceModal(true)} >
                        {selectedProvince ? selectedProvince : 'Şehir Seçin'}
                    </button>
                </div>
                {
                    user ?
                        <CustomerNavItems /> :
                        <div className="nav-buttons">
                            <button className="navButton" onClick={() => history.push('/login')} >GİRİŞ YAP</button>
                            <button className="navButton registerButton" onClick={() => history.push('/register')} >ÜYE OL</button>
                        </div>
                }
            </div>

            <Dialog
                fullWidth
                maxWidth='xs'
                open={chooseProvinceModal}
                onClose={() => setChooseProvinceModal(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
                        <Typography>
                            Öncelikle şehir seçelim!
                        </Typography>
                        <IconButton onClick={() => setChooseProvinceModal(false)} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={provinces}
                        value={selectedProvince}
                        onChange={(event, newValue) => {
                            setSelectedProvince(newValue);
                        }}
                        getOptionLabel={(option) => option?.provinceName}
                        renderInput={(params) => <TextField {...params} label="Şehir seçin" />}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth='sm'
                open={createPostModal}
                onClose={() => setCreatePostModal(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
                        <Typography>
                            Bir şeyler paylaşın!
                        </Typography>
                        <IconButton onClick={() => setCreatePostModal(false)} fontSize='small'>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 3, py: 0 }}>
                    <TextField
                        fullWidth
                        rows={3}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Paylaşmak istediğinizi yazın"
                        required
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button disabled={!postContent} onClick={() => handleCreatePost()} variant="contained" disableElevation>Paylaş</Button>
                </DialogActions>
            </Dialog>
        </nav >
    )
}
export default Navbar