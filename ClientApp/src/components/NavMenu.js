/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-use-before-define */
// import React, { Component } from 'react';
// import { Collapse, Container,
//  Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import './NavMenu.css';

// export class NavMenu extends Component {
//   static displayName = NavMenu.name;

//   constructor (props) {
//     super(props);

//     this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true
//     };
//   }

//   toggleNavbar () {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   }

//   render () {
//     return (
//       <header>
//         <Navbar
//  className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//           <Container>
//             <NavbarBrand tag={Link} to="/">AgendaEventos</NavbarBrand>
//             <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//             <Collapse
//  className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//               <ul className="navbar-nav flex-grow">
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//                 </NavItem>
//               </ul>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </header>
//     );
//   }
// }

// import React from 'react';
// import {
//   makeStyles,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   Button,
//   List,
//   Typography,
//   Divider,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   Box,
//   Grid,
//   Hidden,
//   Switch,
// } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';

// import Apps from '@material-ui/icons/Apps';
// import MoreVert from '@material-ui/icons/MoreVert';
// import VideoCall from '@material-ui/icons/VideoCall';

// import HomeIcon from '@material-ui/icons/Home';
// import Subscriptions from '@material-ui/icons/Subscriptions';
// import Whatshot from '@material-ui/icons/Whatshot';

// import VideoLibrary from '@material-ui/icons/VideoLibrary';
// import History from '@material-ui/icons/History';

// import AddCircle from '@material-ui/icons/AddCircle';
// import { Link } from 'react-router-dom';

// import  FetchData  from './data';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//     backgroundColor: theme.palette.background.dark,
//   },
//   appBar: {
//     boxShadow: 'none',
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   logo: {
//     height: 25,
//   },
//   drawer: {
//     width: 240,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: 240,
//     borderRight: 'none',
//   },
//   menuIcon: {
//     paddingRight: theme.spacing(5),
//     paddingLeft: theme.spacing(6),
//   },
//   icons: {
//     paddingRight: theme.spacing(5),
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   listItemText: {
//     fontSize: 14,
//   },
//   listItem: {
//     paddingTop: 4,
//     paddingBottom: 4,
//   },
//   subheader: {
//     textTransform: 'uppercase',
//   },
// }));

// const videos = [
//   {
//     id: 1,
//     title:
//       'FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29',
//     channel: 'Lucas Nhimi',
//     views: '11 mi de visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb1.png',
//   },
//   {
//     id: 2,
//     title:
//       'COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG)
//    | Dicas e Truques #02',
//     channel: 'Lucas Nhimi',
//     views: '957 mil visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb2.png',
//   },
//   {
//     id: 3,
//     title:
//       'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
//     channel: 'Lucas Nhimi',
//     views: '106 mil visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb3.png',
//   },
//   {
//     id: 4,
//     title:
//       'CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27',
//     channel: 'Lucas Nhimi',
//     views: '5,6 mi de visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb4.png',
//   },
//   {
//     id: 5,
//     title:
//       'EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26',
//     channel: 'Lucas Nhimi',
//     views: '2,2 mi de visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb5.png',
//   },
//   {
//     id: 6,
//     title: 'COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01',
//     channel: 'Lucas Nhimi',
//     views: '233 mil visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb6.png',
//   },
//   {
//     id: 7,
//     title:
//       'PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01',
//     channel: 'Lucas Nhimi',
//     views: '118 mil visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb7.png',
//   },
//   {
//     id: 8,
//     title:
//       'GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04',
//     channel: 'Lucas Nhimi',
//     views: '1,9 mi de visualizações',
//     date: 'há 1 semana',
//     avatar: '/images/avatar.jpeg',
//     thumb: '/images/thumb8.png',
//   },
// ];

// const NavMenu = ({ darkMode, setDarkMode }) => {
//   const classes = useStyles();
//   const theme = useTheme();

//   return (
//     <div >
//       <AppBar color='inherit' className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             edge='start'
//             className={classes.menuIcon}
//             aria-label='menu'
//           >
//             <MenuIcon />
//           </IconButton>
//           <img
//             src={
//               theme.palette.type === 'dark'
//                 ? '/images/branco.png'
//                 : '/images/preto.png'
//             }
//             alt='logo'
//             className={classes.logo}
//           />
//           <div className={classes.grow} />
//           <Switch
//             value={darkMode}
//             onChange={() => setDarkMode(!darkMode)}
//             className={classes.icons}
//           />
//           <IconButton className={classes.icons}>
//             <VideoCall />
//           </IconButton>
//           <IconButton className={classes.icons}>
//             <Apps />
//           </IconButton>
//           <IconButton className={classes.icons}>
//             <MoreVert />
//           </IconButton>
//           <Button
//             startIcon={<AccountCircle />}
//             variant='outlined'
//             color='secondary'
//           >
//             Fazer Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Box display='flex'>

//           <Drawer
//             className={classes.drawer}
//             variant='permanent'
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//           >
//             <Toolbar />
//             <div className={classes.drawerContainer}>
//               <List>
//                 <ListItem component={Link} to="/" button classes={{ root: classes.listItem }}>
//                   <ListItemIcon onClick={() => <Link to="/"/>}>{<HomeIcon />}</ListItemIcon>

//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Início'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>{<Whatshot />}</ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Em alta'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>{<Subscriptions />}</ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Inscrições'}
//                   />
//                 </ListItem>
//               </List>
//               <Divider />
//               <List>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <VideoLibrary />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Biblioteca'}
//                   />
//                 </ListItem>

//               </List>
//               <Divider />
//               <Box p={7}>
//                 <Typography variant='body2'>
//                   Faça login para curtur vídeos, comentar e se inscrever.
//                 </Typography>
//                 <Box mt={2}>
//                   <Button
//                     variant='outlined'
//                     color='secondary'
//                     startIcon={<AccountCircle />}
//                   >
//                     Fazer login
//                   </Button>
//                 </Box>
//               </Box>
//               <Divider />
//               <List
//                 component='nav'
//                 aria-labelledby='nested-list-subheader'
//                 subheader={
//                   <ListSubheader
//                     component='div'
//                     id='nested-list-subheader'
//                     className={classes.subheader}
//                   >
//                     O Melhor do youtube
//                   </ListSubheader>
//                 }
//               >
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Música'}
//                   />
//                 </ListItem>
//                 <ListItem component={Link} to="/data" button
//                classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     {/* <FetchData /> */}
//                       {/* </Link> */}

//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Esportes'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Jogos'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Filmes'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Notícias'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Ao vivo'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Destaques'}
//                   />
//                 </ListItem>
//                 <ListItem button classes={{ root: classes.listItem }}>
//                   <ListItemIcon>
//                     <AddCircle />
//                   </ListItemIcon>
//                   <ListItemText
//                     classes={{
//                       primary: classes.listItemText,
//                     }}
//                     primary={'Videos 360'}
//                   />
//                 </ListItem>
//               </List>
//               <Divider />
//               <ListItem button classes={{ root: classes.listItem }}>
//                 <ListItemIcon>
//                   <AddCircle />
//                 </ListItemIcon>
//                 <ListItemText
//                   classes={{
//                     primary: classes.listItemText,
//                   }}
//                   primary={'Procurar mais'}
//                 />
//               </ListItem>
//               <Divider />
//             </div>
//           </Drawer>

//       </Box>
//     </div>
//   );
// }

// export default NavMenu;
import React, { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { Link, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import {
  Popper,
  Button,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  ClickAwayListener,
  Avatar
} from '@mui/material'
import { AuthContext } from '../lib/context/auth-context'
import TokenAPI from '../lib/api/token'
import { UploadContext } from '../lib/context/upload-context'
// import Ale from '../../assets/uploads/'
// eslint-disable-next-line import/no-unresolved
import endpoint from '../endpoints.config'
import Rotas from './rotas'

import '../assets/css/colors.css'

const drawerWidth = 160

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#006600',
    backgroundImage: 'linear-gradient(45deg, #006600 30%, #048604  95%)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 10
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#006600'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#00995d'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(3.5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(5) + 1
    },
    backgroundColor: '#006600'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    color: 'secondary'
  },
  main: {
    paddingLeft: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(1),
    backgroundColor: '#fff'
  },
  nested2: {
    paddingLeft: theme.spacing(4),
    backgroundColor: '#fff'
  }
}))

export default function MiniDrawer(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)
  const [openCad, setOpenCad] = React.useState(false)
  const { dadosUser } = useContext(AuthContext)
  const anchorRef = React.useRef(null)
  const storage = TokenAPI.getToken()
  const { dadosUpload } = useContext(UploadContext)

  const Login = storage?.name ? 'Logout' : 'Login'

  const handleToggle = () => {
    setOpenUser((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpenUser(false)
  }

  const handleStorage = () => {
    TokenAPI.removeToken()
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleClick = () => {
    setOpenCad(!openCad)
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openUser)
  React.useEffect(() => {
    if (prevOpen.current === true && openUser === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = openUser
  }, [openUser])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const HandleRoutes = () => {
    const rotas = Rotas.map((text, index) => {
      // eslint-disable-next-line multiline-ternary
      return text.children ? (
        <>
          <ListItem key={text.title} className={classes.main} button onClick={handleClick}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
          {/* <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem> */}
          <Collapse in={openCad} key={text.path} timeout="auto" unmountOnExit>
            {text.children.map((child) => (
              <>
                {/* <List component="div" disablePadding key={child.label}> */}
                <ListItem
                  key={child.path}
                  button
                  component={Link}
                  to={child.path}
                  className={open ? classes.nested2 : classes.nested}>
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItem>
              </>
              // </List>
            ))}
          </Collapse>
        </>
      ) : (
        <ListItem component={Link} className={classes.main} to={text.path} button key={text.title}>
          <ListItemIcon>{text.icon}</ListItemIcon>
          <ListItemText primary={text.title} />
        </ListItem>
      )
    })
    return rotas
  }

  return (
    <div className={` ${classes.root}`}>
      <CssBaseline />
      <AppBar

        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: open
          },
          'bg-verde-agenda'
        )}>
        <div className="row">
          <Toolbar>
            <div className="col-md-6" style={{ marginLeft: '10px' }}>
              {(dadosUser || storage?.name) && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open
                  })}>
                  <MenuIcon />
                </IconButton>
              )}
            </div>
            <div className="col-md-6 text-end">
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={openUser ? 'composition-menu' : undefined}
                aria-expanded={openUser ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <Avatar
                  // alt="Remy Sharp"
                  src={`${endpoint.UserBaseUrl}/events/image/${storage?.image}`}
                  sx={{ width: 38, height: 38 }}
                />
              </Button>
              <Popper
                open={openUser}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start'
                          ? 'left top'
                          : 'left bottom'
                    }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openUser}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          // eslint-disable-next-line react/jsx-no-bind
                          onKeyDown={handleListKeyDown}>
                          <MenuItem
                            component={Link}
                            to="/login"
                            onClick={() => handleStorage()}>
                            {Login}
                          </MenuItem>
                          {/* <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                          <MenuItem onClick={handleClose}>Sair</MenuItem> */}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl'
              ? (
                <ChevronRightIcon />
              )
              : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {(dadosUser || storage) && HandleRoutes()}
          {/* {Rotas.map((text, index) => (
            <ListItem component={Link} to={text.path} button key={text.path}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItem>
          ))}
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Collapse in={openCad} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse> */}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  )
}
