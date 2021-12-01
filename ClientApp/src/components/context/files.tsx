/* eslint-disable no-use-before-define */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react'
import { v4 as uuidv4 } from 'uuid'
// eslint-disable-next-line import/no-extraneous-dependencies
import filesize from 'filesize'
// import api from './api.tsx'
import api from '../../lib/api/eventos'
import { UploadContext } from '../../lib/context/upload-context'

export interface IPost {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
  }
export interface IFile {
    id: string;
    FileName: string;
    Length: number;
    uploaded?: boolean;
    preview: string;
    file: File | null;
    progress?: number;
    error?: boolean;
    url: string;
  }
  interface IFileContextData {
    uploadedFiles: IFile[];
    deleteFile(id: string): void;
    handleUpload(file: any): void;
  }
  interface IResponse {
    data: string
  }
const FileContext = createContext<IFileContextData>({} as IFileContextData)

const FileProvider: React.FC = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([])
  const { setDadosUpload } = useContext(UploadContext)

  useEffect(() => {
    api.saveDocument((response) => {
      const postFormatted: IFile[] = response.data && response.data?.map((post) => {
        return {
          ...post,
          // eslint-disable-next-line no-underscore-dangle
          id: post._id,
          preview: post.url,
          readableSize: filesize(post.size),
          file: null,
          error: false,
          uploaded: true
        }
      })

      setUploadedFiles(postFormatted)
    })
  }, [])

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  })

  const updateFile = useCallback((id, data) => {
    setUploadedFiles((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    )
  }, [])

  const processUpload = useCallback(
    async (uploadedFile: IFile) => {
      const data = new FormData()
      if (uploadedFile.file) {
        data.append('files', uploadedFile.file, uploadedFile.FileName)
      }

      const resp = await api.saveDocument(data)
      if (resp) {
        setDadosUpload(resp)
      }
      // .then((response: any) => {
      //   const postFormatted: IFile[] =
      //      {
      //        ...response,
      //        // eslint-disable-next-line no-underscore-dangle
      //        //  id: response._id,
      //        preview: response.data,
      //        //  readableSize: filesize(response.size),
      //        file: null,
      //        error: false,
      //        uploaded: true
      //      }

      //   setUploadedFiles(postFormatted)
      // })
      console.log(resp)

      // api
      //   .saveDocument({
      //     onUploadProgress: (progressEvent) => {
      //       const progress: number = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       )

      //       console.log(
      //           `A imagem ${uploadedFile.name} está ${progress}% carregada... `
      //       )

      //       updateFile(uploadedFile.id, { progress })
      //     }
      //   })
      //   .then((response) => {
      //     console.log(
      //         `A imagem ${uploadedFile.name} já foi enviada para o servidor!`
      //     )

      //     updateFile(uploadedFile.id, {
      //       uploaded: true
      //       // id: response.id,
      //       // url: response.url
      //     })
      //   })
      //   .catch((err) => {
      //     console.error(
      //         `Houve um problema para fazer upload da imagem ${uploadedFile.name}
      // no servidor AWS`
      //     )
      //     console.log(err)

      //     updateFile(uploadedFile.id, {
      //       error: true
      //     })
      //   })
    },
    [updateFile]
  )

  const handleUpload = useCallback(
    (files: File[]) => {
      const newUploadedFiles: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        FileName: file.name,
        Length: file.size,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: ''
      }))

      // concat é mais performático que ...spread
      // https://www.malgol.com/how-to-merge-two-arrays-in-javascript/
      setUploadedFiles((state) => state.concat(newUploadedFiles))
      newUploadedFiles.forEach(processUpload)
    },
    [processUpload]
  )

  const deleteFile = useCallback((id: string) => {
    api.delete(`posts/${id}`)
    setUploadedFiles((state) => state.filter((file) => file.id !== id))
  }, [])

  return (
      <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload }}>
        {children}
      </FileContext.Provider>
  )
}

function useFiles (): IFileContextData {
  const context = useContext(FileContext)

  if (!context) {
    throw new Error('useFiles must be used within FileProvider')
  }

  return context
}

export { FileProvider, useFiles }
