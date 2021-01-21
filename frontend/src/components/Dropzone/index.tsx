import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiUploadCloud } from 'react-icons/fi'

import * as S from './styles'

const Dropzone = () => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <S.Drop{...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      { selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point Thumbnail" />
        : (<p><FiUpload /> Imagem do Estabelecimento</p>)

      }

    </S.Drop>
  )
}

export default Dropzone
