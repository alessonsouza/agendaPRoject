/* eslint-disable no-use-before-define */
import * as React from 'react'
import { useRef } from 'react'

import {
  Box,
  Card,
  CardContent,
  Paper,
  Divider,
  Typography
} from '@mui/material'
import { makeStyles } from '@material-ui/core'

import dayjs from 'dayjs'
import MailIcon from '@material-ui/icons/Event'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PublicIcon from '@material-ui/icons/Public'
// eslint-disable-next-line import/no-unresolved
import endpoint from '../../endpoints.config'

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const KnowMore = (props) => {
  const classes = useStyles()
  const customerLogo = useRef(null)
  const state = props

  return (
    <div className={classes.root}>
      <Box>
        <Box
          style={{
            padding: '2%'
          }}>
          <Divider style={{ backgroundColor: 'black', marginBottom: '15px' }} />
          <Paper
            elevation={5}
            style={{ display: 'grid', position: 'relative' }}>
            <Card
              key={state.data.title}
              style={{
                backgroundColor: 'rgb(13, 74, 40)',
                minHeight: '600px'
              }}>
              <CardContent>
                <div
                  className="row"
                  style={{
                    width: '100%',
                    height: '100%',
                    // maxHeight: '580px',
                    position: 'relative'
                  }}>
                  <div className="col-md-4">
                    <img
                      alt={state.data.rg_title}
                      src={`${endpoint.UserBaseUrl}/events/image/${state?.data?.rg_document}`}
                      ref={customerLogo}
                      height="450px"
                      width="450px"
                      style={{ textAlign: 'center' }}
                    />
                  </div>
                  <div className="col-md-8 b">
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 600,
                        width: '100%',
                        color: 'white'
                      }}
                      gutterBottom>
                      {state.data.rg_title}
                    </Typography>
                    <Typography
                      display="block"
                      variant="body1"
                      style={{
                        textAlign: 'justify',
                        width: '100%',
                        fontWeight: 600,
                        color: 'white'
                      }}>
                      {state.data.rg_description}
                    </Typography>
                  </div>
                  <div
                    className="col-md-12"
                    style={{
                      position: 'relative',
                      bottom: '15px'
                    }}>
                    <Divider
                      style={{ backgroundColor: 'black', marginTop: '25px' }}
                    />
                  </div>

                  <div
                    className="row"
                    style={{
                      position: 'relative',
                      bottom: '15px'
                    }}>
                    <div className="col-md-1 cor-laranja text-end">
                      <Typography variant="body1">
                        <b>De:</b>
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja text-end">
                      <MailIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body1" style={{ color: 'white' }}>
                        {`• ${dayjs(state.data.rg_date_begin).format(
                          'DD/MM/YYYY HH:mm'
                        )}`}
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja text-end">
                      <Typography variant="body1">
                        <b>Até:</b>
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja text-end">
                      <MailIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body1" style={{ color: 'white' }}>
                        {`• ${dayjs(state.data.rg_date_begin).format(
                          'DD/MM/YYYY HH:mm'
                        )}  `}
                      </Typography>
                    </div>
                    <div className="col-md-1 cor-laranja text-end">
                      <Typography variant="body1">
                        <b>Local:</b>
                      </Typography>
                    </div>

                    <div className="col-md-1 cor-laranja text-end">
                      <LocationOnIcon />
                    </div>
                    <div className="col-md-10 text-left">
                      <Typography variant="body1" style={{ color: 'white' }}>
                        {`• ${state.data.rg_local}`}
                      </Typography>
                    </div>
                    {state.data.rg_site && (
                      <>
                        <div className="col-md-1 cor-laranja text-end">
                          <Typography variant="body1">
                            <b>Url:</b>
                          </Typography>
                        </div>

                        <div className="col-md-1 cor-laranja text-end">
                          <PublicIcon />
                        </div>
                        <div className="col-md-10 text-left">
                          <Typography
                            variant="body1"
                            style={{ color: 'white' }}>
                            <li>
                              <a href={state.data.rg_site}>
                                {state.data.rg_site}
                              </a>
                            </li>
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default KnowMore
