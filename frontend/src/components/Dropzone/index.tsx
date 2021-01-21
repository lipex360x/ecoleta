import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import * as S from './styles'

interface DropzoneProps {
  onFileUploaded: (file: File) => void
}

const Dropzone = ({ onFileUploaded }:DropzoneProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({
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
