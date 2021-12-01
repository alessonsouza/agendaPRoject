/* eslint-disable no-use-before-define */
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import * as dotenv from 'dotenv'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

dotenv.config()
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const rootElement = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement
)
registerServiceWorker()
