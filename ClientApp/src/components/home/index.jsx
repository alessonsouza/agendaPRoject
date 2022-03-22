/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
import React, { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Fab,
  Card,
  Divider,
  Paper
} from '@material-ui/core'
import MailIcon from '@material-ui/icons/Event'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import Carousel from 'react-multi-carousel'
import APIEventos from '../../lib/api/eventos'
import KnowMore from '../saibaMais'
import AllEvents from '../todosEventos'
import 'react-multi-carousel/lib/styles.css'
import '../../assets/css/unimed.css'
import '../../index.css'
// eslint-disable-next-line import/no-unresolved
import endpoint from '../../endpoints.config'
// eslint-disable-next-line no-multi-assign
// window.$ = window.jQuery = require('jquery')

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    backgroundColor: theme.palette.background.dark,
    backgroundImage: theme.palette.backgroundImage
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  },
  listItemText: {
    marginLeft: theme.spacing(-2)
  },
  listItem: {
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(-1)
  }
}))

const Home = () => {
  const classes = useStyles()
  const customerLogo = useRef(null)
  const [events, setEvents] = useState([])
  const [showType, setShowType] = useState('dashboard')
  const [event, setEvent] = useState()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const HandleShow = (type, dados) => {
    setShowType(type)
    setEvent(dados)
  }

  const HandleEvents = async () => {
    dayjs.extend(timezone)
    // const campos = {}

    // campos.rg_date_begin_show = dayjs().startOf('month')
    // campos.rg_date_end_visu = dayjs().endOf('month')
    const resp = await APIEventos.getEventsShow()
    if (resp?.success) {
      console.log(resp)
      setEvents(resp.data)
    }
  }

  const HandleTypeRender = () => {
    let html
    switch (showType) {
      case 'dashboard':
        html = (
          <Box style={{ width: '100%', height: '100%' }}>
            <div className="col-md-12">
              <Divider
                style={{ backgroundColor: 'black', marginBottom: '25px' }}
              />
            </div>
            {events.length > 0
              ? (
              <>
                <div style={{ marginLeft: '25px' }}>
                  <Carousel responsive={responsive}>{Events}</Carousel> :
                </div>
                <div className="col-md-12">
                  <Divider
                    style={{ backgroundColor: 'black', marginTop: '25px' }}
                  />
                </div>
              </>
                )
              : (
              <div>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 600,
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '10%'
                  }}>
                  Ainda não há eventos :(
                </Typography>
              </div>
                )}
          </Box>
        )
        break
      case 'saibamais':
        // $('alesson').addClass('position-relative')
        html = <KnowMore data={event} HandleShow={HandleShow} />
        break
      case 'todos':
        html = <AllEvents data={event} HandleShow={HandleShow} />
        break

      default:
        break
    }
    return html
  }

  useEffect(() => {
    HandleEvents()
  }, [])
  const Events = events.map((item) => (
    <div>
      <div className="col-md-12">
        <Grid item lg={11} md={5} sm={8} xs={11}>
          <Box
            style={{
              backgroundColor: '#7fffd43b',
              width: '100%'
            }}>
            <Paper elevation={5} style={{ height: '100%', display: 'grid' }}>
              <Card
                key={item.title}
                style={{
                  backgroundColor: 'rgb(13, 74, 40)',
                  minHeight: '580px',
                  padding: '1%'
                }}>
                <div className="row">
                  <img
                    alt={item.rg_title}
                    src={`${process.env.REACT_APP_API_URL}/events/image/${item?.rg_document}`}
                    ref={customerLogo}
                    height="380px"
                  />

                  <div className="col-md-12 b">
                    <Typography
                      style={{
                        fontWeight: 600,
                        color: 'white',
                        padding: '3%'
                      }}
                      gutterBottom
                      variant="h6">
                      {item.rg_title}
                    </Typography>
                  </div>
                  <div
                    className="row datas"
                    // style={{
                    //   position: 'absolute',
                    //   marginLeft: '-80px',
                    //   bottom: '8%',
                    //   left: '15%'
                    // }}
                  >
                    <div className="col-md-1 cor-laranja text-end">
                      <Typography variant="body1">
                        <b>De:</b>
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja">
                      <MailIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body2" style={{ color: 'white' }}>
                        {` ${dayjs(item.rg_date_begin).format(
                          'DD/MM/YYYY HH:mm'
                        )}`}
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja text-end">
                      <Typography variant="body1">
                        <b>Até:</b>
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja">
                      <MailIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body2" style={{ color: 'white' }}>
                        {`${dayjs(item.rg_date_end).format(
                          'DD/MM/YYYY HH:mm'
                        )}`}
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja">
                      <LocationOnIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body2" style={{ color: 'white' }}>
                        {`${item.rg_local}`}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-md-12 text-center">
                    <Fab
                      variant="extended"
                      size="small"
                      style={{
                        backgroundColor: '#b9d300',
                        position: 'absolute',
                        marginLeft: '-80px',
                        bottom: '5px',
                        left: '50%'
                      }}
                      onClick={() => HandleShow('saibamais', item)}>
                      <Typography style={{ fontSize: '10px' }}>
                        saiba mais
                      </Typography>
                      <ChevronRightIcon className={classes.listItem} />
                    </Fab>
                  </div>
                </div>
              </Card>
            </Paper>
          </Box>
        </Grid>
      </div>
    </div>
  ))

  return (
    <div className={classes.root}>
      <Box>
        <Box p={2}>
          <div className="text-center">
            <img
              width="100px"
              alt="Unimed Chapecó"
              src="https://unimedchapeco.coop.br/assets/img/logo_110_51.png"
            />
          </div>
          <div>
            <Typography
              variant="h4"
              style={{
                fontWeight: 600,
                color: 'white',
                textAlign: 'center'
              }}>
              Eventos Unimed Chapecó
            </Typography>
          </div>
          <div className="col-md-12 text-end">
            {showType !== 'dashboard' && (
              <Fab
                variant="extended"
                size="medium"
                onClick={() => HandleShow('dashboard')}
                style={{ backgroundColor: '#f5781e' }}>
                <ChevronLeftIcon className={classes.listItemText} />
                <Typography style={{ fontSize: '12px' }}>
                  <b>Home</b>
                </Typography>
              </Fab>
            )}
            {showType !== 'todos' && (
              <Fab
                variant="extended"
                size="medium"
                onClick={() => HandleShow('todos')}
                style={{ backgroundColor: '#f5781e', textAlign: 'end' }}>
                <Typography style={{ fontSize: '12px' }}>
                  <b>ver todos os eventos</b>
                </Typography>
                <ChevronRightIcon className={classes.extendedIcon} />
              </Fab>
            )}
          </div>
        </Box>
        {HandleTypeRender()}
      </Box>
    </div>
  )
}

export default Home
