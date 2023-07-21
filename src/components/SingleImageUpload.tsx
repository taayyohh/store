'use client'

import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'
import { packToBlob } from 'ipfs-car/pack/blob'
import { NFTStorage } from 'nft.storage'
import React, { ChangeEvent } from 'react'
import urlJoin from 'url-join'
import { ProductFormData } from '@/modules/store/components/ProductForm'

// import {
//   defaultUploadStyle,
//   singleImagePreview,
//   singleImageUploadHelperText,
//   singleImageUploadInputLabel,
//   singleImageUploadWrapper,
//   uploadErrorBox,
// } from './styles.css'

interface SingleImageUploadProps {
  handleChange: any //TODO: fix
  name: string
  value: string
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  handleChange,
  name,
  value,
}) => {
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
      ? process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
      : '',
  })
  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [preview, setPreview] = React.useState<string>('')
  const [imageUri, setImageUri] = React.useState<string>(value)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const handleFileUpload = async (
    _input: FileList | null,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!_input) return
    const input = _input[0]

    if (input?.type?.length && !acceptableMIME.includes(input.type)) {
      setUploadArtworkError({
        mime: `${input.type} is an unsupported file type`,
      })
      return
    }

    try {
      setIsUploading(true)
      await packToBlob({ input: [{ content: input, path: input.name }] })
      const car = await packToBlob({
        input: [{ content: input, path: input.name }],
        blockstore: new MemoryBlockStore(),
      })

      const cid = await client.storeCar(car.car)
      const uri = encodeURI(urlJoin('ipfs://', cid, input.name))
      const url = encodeURI(urlJoin('https://ipfs.io/ipfs/', cid, input.name))
      setPreview(url)
      setImageUri(uri)
      handleChange((prevFormData: ProductFormData) => ({
        ...prevFormData,
        ['imageUri']: uri,
      }))


      // formik.setFieldValue(id, car.car)
      // formik.setFieldValue(`${id}_preview`, url)
      // formik.setFieldValue(`${id}_uri`, uri)
      // formik.setFieldValue(`${id}_mimeType`, input.type)

      setIsUploading(false)
      setUploadArtworkError(null)
    } catch (err) {
      setIsUploading(false)
      setUploadArtworkError(err)
    }
  }

  return (
    <div className={'relative mb-8 flex flex-col'}>
      <div className={'relative flex w-full flex-col items-center'}>
        <label
          className={`flex flex-col items-center justify-center round`}
          // htmlFor={`${id}_audio-file-upload`}
        >
          {(isUploading && <div className={'m-0 flex items-center'} />) || (
            <>
              <>
                {(preview && <img src={preview} alt={'preview'} />) || (
                  <>
                    {/*<div className={`flex`}>{inputLabel}</div>*/}
                    {/*<div className={`flex`}>{helperText}</div>*/}
                  </>
                )}
              </>
            </>
          )}
          <input
            // id={`${id}_audio-file-upload`}
            // value={value}
            name={name}
            type="file"
            onChange={(event) => {
              handleFileUpload(event.currentTarget.files, event)
            }}
          />
        </label>
        {uploadArtworkError?.mime && (
          <div className={`p-4 text-sm`}>
            <ul className={'m-0'}>
              <li>{uploadArtworkError.mime}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleImageUpload
