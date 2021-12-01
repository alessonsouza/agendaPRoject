/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
import * as React from 'react'
import { useState, useRef, useContext } from 'react'
// import Box from '@mui/material/Box';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';

import {
  Box,
  Checkbox,
  Card,
  CardContent,
  Button,
  TextField,
  FormControlLabel,
  Paper
} from '@mui/material'
import MuiAlert from '@material-ui/lab/Alert'

import { Snackbar } from '@material-ui/core'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Formik } from 'formik'
// import * as Yup from 'yup';
import CryptoJS from 'crypto-js'
import DatePicker from '../datePicker'
import SelectField from '../selectField'
import APIUsers from '../../lib/api/users'
import Upload from '../uploads'
import FileList from '../fileList/index.tsx'
import TokenAPI from '../../lib/api/token'
import { FileProvider, useFiles } from '../context/files.tsx'
import { UploadContext } from '../../lib/context/upload-context'

import { Container, Content } from './styles.ts'
// const label = { inputProps: { 'aria-label': 'Exibir por horário' } };
const User = (props) => {
  // const { handleUpload } = useFiles()
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const start = dayjs().startOf('month')
  const end = dayjs().endOf('month')
  const [success, setSuccess] = useState(false)
  const storage = TokenAPI.getToken()

  const filesElement = useRef(null)
  const { dadosUpload, setDadosUpload } = useContext(UploadContext)
  // const [dialogTerm, setDialogTerm] = useState(false);
  const vertical = 'top'
  const horizontal = 'center'

  const status = [
    { id: 0, descricao: 'Inativo' },
    { id: 1, descricao: 'Ativo' }
  ]
  // eslint-disable-next-line react/destructuring-assignment
  if (props?.data?.auth_image && props?.data?.idauth && !dadosUpload) {
    setDadosUpload(props.data.auth_image)
  }
  const sendFile = async () => {
    const dataForm = new FormData()
    // eslint-disable-next-line no-restricted-syntax
    for (const file of filesElement.current.files) {
      dataForm.append('file', file)
    }
    const res = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: dataForm
    })
    const data = await res.json()
    console.log(data)
  }

  const Message = (state) => {
    return <MuiAlert elevation={6} variant="filled" {...state} />
  }

  const handleClose = () => {
    // setDialogTerm(false);
    setSuccess(false)
  }
  const initialProps = {
    idauth: 0,
    auth_name: '',
    auth_login: '',
    auth_password: '',
    auth_data_created: '',
    auth_data_updated: '',
    auth_active: 0,
    alterar: false
  }

  const [filtros, setFiltros] = useState(
    (state) => (state = props?.data ? props.data : initialProps)
  )
  const [enabledPassword, setEnabledPassword] = useState(filtros.idauth === 0)

  // if (filtros?.idauth) {
  //   setEnabledPassword(true)
  // }

  const onChange = (name, value) => {
    const campos = { ...filtros }
    console.log(name, value)
    if (value === 'Invalid Date') {
      campos[name] = null
    } else {
      campos[name] = value
    }

    if (name === 'alterar') {
      setEnabledPassword(value)
    }
    setFiltros(campos)
  }

  const onCancel = () => {
    setDadosUpload(null)
    // props.HandleRender(false)
    props.handleClose(false)
  }

  const EnabledPassword = (value) => {
    setEnabledPassword(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const campos = {}
    // if (filtros.rg_date_begin_show !== null) {
    //   campos.rg_date_begin_show = dayjs(filtros.rg_date_begin_show).tz(
    //     'America/Sao_Paulo'
    //   )
    // }
    // if (filtros.rg_date_end_visu !== null) {
    //   campos.rg_date_end_visu = dayjs(filtros.rg_date_end_visu).tz(
    //     'America/Sao_Paulo'
    //   )
    // }
    const senhaMd5 = CryptoJS.MD5(
      `{uni${filtros.auth_password}med}`
    ).toString()
    campos.auth_name = filtros.auth_name
    campos.auth_data_updated = dayjs().tz('America/Sao_Paulo').format()
    campos.auth_login = filtros.auth_login
    campos.auth_active = filtros.auth_active
    campos.auth_image = dadosUpload

    let resp = {}
    if (filtros.idauth) {
      campos.idauth = filtros.idauth
      resp = await APIUsers.updateUser(campos)
    } else {
      campos.auth_password = senhaMd5
      campos.auth_data_created = dayjs().tz('America/Sao_Paulo').format()
      resp = await APIUsers.saveUser(campos)
    }

    if (resp?.data?.success) {
      storage.image = dadosUpload
      TokenAPI.setToken(storage)
      setDadosUpload(null)
      // props.handleClose(true)
      props.HandleRender(false)
    }
  }

  const FullName = {
    name: 'auth_name',
    label: 'Nome Completo',
    value: filtros?.auth_name || ''
  }
  const Username = {
    name: 'auth_login',
    label: 'Login',
    value: filtros?.auth_login || ''
  }
  const Senha = {
    name: 'auth_password',
    label: 'Password',
    value: filtros?.auth_password || ''
  }
  const Active = {
    name: 'alterar',
    label: 'Alterar senha',
    value: filtros?.alterar || ''
  }

  const statusField = {
    type: 'select',
    name: 'auth_active',
    label: 'Status',
    items: status || [],
    value: filtros?.auth_active,
    config: { text: 'descricao', value: 'id' }
  }

  const action = (
    <Message color="success" severity="success">
      Usuário cadastrado com sucesso!
    </Message>
  )
  return (
    <Formik
      initialValues={filtros}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}>
      {(propsE) => {
        return (
          <form onSubmit={onSubmit}>
            <Box
              style={{
                padding: '1.3%'
              }}>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}>
                {action}
              </Snackbar>
              <Card style={{ height: '200%' }}>
                <Paper elevation={3} style={{ margin: '15px', padding: '2%' }}>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-10 mb-4">
                        <TextField
                          htmlfor="auth_name"
                          required
                          value={FullName.value || ''}
                          className="w-100"
                          variant="filled"
                          label={FullName.label}
                          onChange={(v) =>
                            onChange(FullName.name, v.target.value)
                          }>
                          {' '}
                          {propsE.errors.auth_name && (
                            <div className="input-feedback">
                              {propsE.errors.auth_name}
                            </div>
                          )}
                        </TextField>
                      </div>
                      <div className="col-md-2">
                        <SelectField data={statusField} onChange={onChange} />
                      </div>
                      {/*
                      <div className="col-md-6">
                        <DatePicker data={dataInicio} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataFim} onChange={onChange} />
                      </div> */}
                      <div className="col-md-6">
                        <TextField
                          className="w-100"
                          variant="filled"
                          value={Username.value || ''}
                          label={Username.label}
                          onChange={(v) =>
                            onChange(Username.name, v.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className="w-100"
                          variant="filled"
                          disabled={!enabledPassword}
                          value={Senha.value || ''}
                          label={Senha.label}
                          onChange={(v) => onChange(Senha.name, v.target.value)}
                        />
                      </div>
                      {filtros?.idauth ? (
                        <div
                          className="col-md-12 text-end"
                          // style={{
                          //   marginTop: '2%',
                          // }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Active.value}
                                onClick={(v) =>
                                  onChange(Active.name, v.target.checked)
                                }
                              />
                            }
                            label={Active.label}
                          />
                        </div>
                      ) : null}
                      {/* <div className="col-md-6">
                        <DatePicker data={dataInicioVisu} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataFimVisu} onChange={onChange} />
                      </div>
                      <div className="col-md-12 mt-5">
                        <TextField
                          required
                          className="w-100"
                          value={descricao.value || ''}
                          label={descricao.label}
                          onChange={(v) =>
                            onChange(descricao.name, v.target.value)
                          }
                        />
                      </div> */}
                      {/* <div className="col-md-12 mt-5">
                        <TextField
                          required
                          className="w-100"
                          label={anexos.label}
                          onChange={(v) =>
                            onChange(anexos.name, v.target.value)
                          }
                        />
                      </div> */}
                      <div>
                        {/* <input type="file" multiple ref={filesElement} />
                        {/* eslint-disable-next-line react/button-has-type */}
                        {/* <button onClick={sendFile}>Send file</button> */}
                        <FileProvider>
                          <Container>
                            <Content>
                              <Upload />
                              <FileList />
                            </Content>
                            {/* <GlobalStyle /> */}
                          </Container>
                        </FileProvider>
                      </div>
                    </div>
                  </CardContent>
                  <div className="row">
                    <div className="col-md-12" style={{ textAlign: 'end' }}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#ea0f63'
                        }}
                        onClick={() => onCancel()}>
                        Cancelar
                      </Button>

                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#006600'
                        }}
                        type="submit">
                        Salvar
                      </Button>
                    </div>
                  </div>
                </Paper>
                {/* <CardActions
          style={{
            position: 'absolute',
            width: '100%',
          }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: '#ea0f63',
              position: 'absolute',
              marginLeft: '-80px',

              left: '5%',
            }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#006600',
              position: 'absolute',
              marginLeft: '-80px',

              right: '10%',
            }}>
            Salvar
          </Button>
        </CardActions> */}
              </Card>
            </Box>
          </form>
        )
      }}
    </Formik>
  )
}

export default User
