'use client';

import React, { useState, useRef } from 'react';

import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Image from 'next/image';

const ProfileImageUploader = ()=>{
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useTheme(); 
  const backgroundGradients = theme.backgroundGradients;

  // Use useRef hook to avoid bug when keep selecting same image from local disk
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null)
    const file = event.target.files?.[0]
    if(!file) return
    if(!file.type.startsWith('image/') || file.size > 5 * 1024 *1024)
      {
        setErrorMessage('Invalid File size or type. Please upload an image file under 5MB')
        return
      }

    setUploading(true)
    setUploadStatus("The image is uploading ... ")

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
    
    setTimeout(()=>{
      setUploading(false)
      setUploadStatus("The image is uploaded")
    },3000)
  }

  const handleRemove = ()=>{
    setPreview(null)
    setUploadStatus(null)
    setErrorMessage(null)
    
    imageInputRef.current!.value = ''
    
  }

  return(
      <div className='flex flex-col items-center justify-center
          border-2 rounded-xl
          max-w-96
          min-w-[30dvw]'>
        <Box sx={{
          bgcolor: 'primary.main',
          background: backgroundGradients.buttonPrimaryActive,
          width: '100%',
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
          height: 80,
          mx: 0,
          px: 0,
          }}
          className='rounded-xl'
          >
          <Typography variant="h4" color='primary.contrastText'>HelloCity Account</Typography>
        </Box>
        <Typography variant="h6" sx={{mt: 4, mb: 2}}>
            Profile Picture
        </Typography>

          {/* Image Preview Section below ↓ */}

        {!preview || uploading
        ? 
        (<Image
          src="/images/default-avatar.jpg"
          alt='Default Avatar'
          width={150}
          height={150}
          className="border-2 border-indigo-600 rounded-xl"
        />)
        :
        (<Image
          src={preview}
          alt='Profile Image Preview'
          width={150}
          height={150}
          className="w-32 h-32 border-2 object-cover border-indigo-600 rounded-xl"
        />)}

        {/* Status information */}
        {uploading && (
          <CircularProgress sx={{ mt: 2}} />
        )}

        {uploadStatus && (
          <Typography variant="body2" sx={{ mt:2 }}>
            {uploadStatus}
          </Typography>
        )}

        {errorMessage && (
          <Typography variant='body2' sx={{ mt:2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Buttons to upload or remove photos */}
          <div className="flex justify-center flex-wrap w-4/5">
            <Button
              variant='secondary'
              component='label'
              sx={{ mt:4, mb:2 }}
            >
              Add Profile Picture
            <input
              type="file"
              hidden
              ref={imageInputRef}
              onChange={handleFileChange}
            />
            </Button>

            {preview && !uploading && (
              <Button
                variant='secondary'
                onClick={handleRemove}
                sx={{ mt:4, mb:2}}
              >
                Remove Photos
              </Button>
            )}
          </div>
        </div>
  )
}

export default ProfileImageUploader;