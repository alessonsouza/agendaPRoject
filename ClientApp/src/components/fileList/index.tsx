/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink, MdMoodBad } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'
// eslint-disable-next-line import/no-unresolved
import { useFiles, IFile } from '../context/files'
// // import { IFile } from "../context/files.tsx";
import { UploadContext } from '../../lib/context/upload-context'
// import Ale from '../../assets/uploads/'
import endpoint from '../../endpoints.config'

function FileList () {
  const { uploadedFiles: files, deleteFile } = useFiles()
  const { dadosUpload } = useContext(UploadContext)

  // if (!files?.length) {
  //   return (
  //     <span>
  //       <MdMoodBad
  //         style={{ marginLeft: '45%', marginTop: 10 }}
  //         size={24}
  //         color="#d5d2d2"
  //       />
  //     </span>
  //   )
  // }
  return (
    <Container>
      {files.map((uploadedFile: IFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.FileName}</strong>
              <span>
                {uploadedFile.Length}{' '}
                {!!uploadedFile.url && (
                  // eslint-disable-next-line react/button-has-type
                  <button onClick={() => deleteFile(uploadedFile.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' }
                }}
                strokeWidth={10}
                text={String(uploadedFile.progress)}
                value={uploadedFile.progress || 0}
              />
            )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                {/*  eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                {/* <img src="C:\www\AgendaEventos\assets\uploads\pp.jpg"
                className="img" alt="My image" /> */}
              </a>
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}

     {(dadosUpload && !files?.length) && <li>
       <FileInfo>
      <Preview
      src={`${endpoint.UserBaseUrl}/events/image/${dadosUpload}`} />
              <strong>{dadosUpload}</strong>
            </FileInfo>
      </li>}
    </Container>
  )
}

export default FileList
