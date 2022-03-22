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
import DatePicker from '../datePicker'
import SelectField from '../selectField'
import APIEventos from '../../lib/api/eventos'
import Upload from '../uploads'
import FileList from '../fileList/index.tsx'
import { FileProvider } from '../context/files.tsx'
import { UploadContext } from '../../lib/context/upload-context'

import { Container, Content } from './styles.ts'
// const label = { inputProps: { 'aria-label': 'Exibir por horário' } };
const Register = (props) => {
  // const { handleUpload } = useFiles()
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const start = dayjs().startOf('month').format()
  const end = dayjs().endOf('month').format()
  const [success, setSuccess] = useState(false)
  const filesElement = useRef(null)
  const { dadosUpload, setDadosUpload } = useContext(UploadContext)
  // const [dialogTerm, setDialogTerm] = useState(false);
  const vertical = 'top'
  const horizontal = 'center'

  const status = [
    { id: 'concluido', descricao: 'Concluido' },
    { id: 'andamento', descricao: 'Em Andamento' },
    { id: 'cancelado', descricao: 'Cancelado' }
  ]
  // eslint-disable-next-line react/destructuring-assignment
  if (props?.data?.rg_document && props?.data?.rg_id_events && !dadosUpload) {
    setDadosUpload(props.data.rg_document)
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
    rg_title: '',
    rg_date_begin: start,
    rg_date_end: end,
    rg_date_begin_show: start,
    rg_date_end_visu: end,
    rg_site: '',
    rg_description: '',
    rg_document: '',
    rg_show_by_time: false,
    rg_status: '',
    rg_local: ''
  }

  const [filtros, setFiltros] = useState(
    (state) => (state = props?.data ? props.data : initialProps)
  )

  const onChange = (name, value) => {
    const campos = { ...filtros }
    console.log(name, value)
    if (value === 'Invalid Date') {
      campos[name] = null
    } else {
      campos[name] = value
    }
    setFiltros(campos)
  }

  const onCancel = () => {
    setDadosUpload(null)
    // props.HandleRender(false)
    props.handleClose(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const campos = {}
    if (filtros.rg_date_begin_show !== null) {
      campos.rg_date_begin_show = dayjs(filtros.rg_date_begin_show)
        .tz('America/Sao_Paulo')
        .format()
    }
    if (filtros.rg_date_end_visu !== null) {
      campos.rg_date_end_visu = dayjs(filtros.rg_date_end_visu)
        .tz('America/Sao_Paulo')
        .format()
    }

    campos.rg_title = filtros.rg_title
    campos.rg_date_begin = filtros.rg_date_begin
    campos.rg_date_end = filtros.rg_date_end
    campos.rg_site = filtros.rg_site
    campos.rg_description = filtros.rg_description
    campos.rg_document = filtros.rg_document
    campos.rg_show_by_time = filtros.rg_show_by_time
    campos.rg_status = filtros.rg_status
    campos.rg_local = filtros.rg_local
    campos.rg_document = dadosUpload
    let resp = {}
    if (filtros.rg_id_events) {
      campos.rg_id_events = filtros.rg_id_events
      resp = await APIEventos.updateEvent(campos)
    } else {
      resp = await APIEventos.saveEvent(campos)
    }

    if (resp?.success) {
      setDadosUpload(null)
      // props.handleClose(true)
      props.HandleRender(false)
    }
  }

  const dataInicio = {
    name: 'rg_date_begin',
    label: 'Data Início',
    value: filtros?.rg_date_begin || '',
    format: 'YYYY-MM-DDTHH:mm-03:00'
  }
  const dataInicioVisu = {
    name: 'rg_date_begin_show',
    label: 'Data Início Visualização',
    value: filtros?.rg_date_begin_show || '',
    format: 'YYYY-MM-DDTHH:mm-03:00'
  }
  const dataFim = {
    name: 'rg_date_end',
    label: 'Data Fim',
    value: filtros?.rg_date_end || '',
    format: 'YYYY-MM-DDTHH:mm-03:00'
  }
  const dataFimVisu = {
    name: 'rg_date_end_visu',
    label: 'Data Fim Visualização',
    value: filtros?.rg_date_end_visu || '',
    format: 'YYYY-MM-DDTHH:mm-03:00'
  }
  const titulo = {
    name: 'rg_title',
    label: 'Título',
    value: filtros?.rg_title || ''
  }
  const descricao = {
    name: 'rg_description',
    label: 'Descrição',
    value: filtros?.rg_description || ''
  }
  const anexos = {
    name: 'rg_documents',
    label: 'Anexos',
    value: filtros?.rg_document || ''
  }
  const site = {
    name: 'rg_site',
    label: 'Site (URL)',
    value: filtros?.rg_site || ''
  }
  const local = {
    name: 'rg_local',
    label: 'Local',
    value: filtros?.rg_local || ''
  }
  const exibir = {
    name: 'rg_show_by_time',
    label: 'Exibir por horário',
    value: filtros?.rg_show_by_time || ''
  }

  const statusField = {
    type: 'select',
    name: 'rg_status',
    label: 'Status',
    items: status || [],
    value: filtros?.rg_status,
    config: { text: 'descricao', value: 'id' }
  }

  const action = (
    <Message color="success" severity="success">
      Evento cadastra com sucesso!
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
            <Box style={{ padding: '1.3%' }}>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}>
                {action}
              </Snackbar>
              <Card>
                <Paper elevation={3} style={{ margin: '15px', padding: '2%' }}>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-10">
                        <TextField
                          htmlfor="rg_title"
                          required
                          value={titulo.value || ''}
                          className="w-100"
                          variant="filled"
                          label={titulo.label}
                          onChange={(v) =>
                            onChange(titulo.name, v.target.value)
                          }>
                          {' '}
                          {propsE.errors.rg_title && (
                            <div className="input-feedback">
                              {propsE.errors.rg_title}
                            </div>
                          )}
                        </TextField>
                      </div>
                      <div className="col-md-2">
                        <SelectField data={statusField} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataInicio} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataFim} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className="w-100"
                          variant="filled"
                          value={site.value || ''}
                          label={site.label}
                          onChange={(v) => onChange(site.name, v.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className="w-100"
                          variant="filled"
                          value={local.value || ''}
                          label={local.label}
                          onChange={(v) => onChange(local.name, v.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
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
                      </div>
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
                      <div
                        className="col-md-4"
                        // style={{
                        //   marginTop: '2%',
                        // }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exibir.value}
                              onClick={(v) =>
                                onChange(exibir.name, v.target.checked)
                              }
                            />
                          }
                          label={exibir.label}
                        />
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

export default Register
