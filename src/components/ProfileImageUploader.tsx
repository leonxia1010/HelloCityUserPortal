'use client';

import React, { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Trans } from '@lingui/react';
import type { ReactElement } from 'react';

const ProfileImageUploader = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'none' | 'uploading' | 'uploaded' | 'error'>('none');
  const [message, setMessage] = useState<ReactElement<typeof Trans> | null>(null);
  const theme = useTheme();
  const backgroundGradients = theme.backgroundGradients;

  // Use useRef hook to avoid bug when keep selecting same image from local disk
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      setStatus('error');
      setMessage(
        <Trans id="file.upload.error">
          Invalid File size or type. Please upload an image file under 5MB
        </Trans>,
      );
      return;
    }

    setStatus('uploading');
    setMessage(<Trans id="file.upload.progress">The image is uploading ...</Trans>);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setTimeout(() => {
      setStatus('uploaded');
      setMessage(<Trans id="file.upload.success">The image is uploaded</Trans>);
    }, 3000);
  };

  const handleRemove = () => {
    setPreview(null);
    setStatus('none');
    setMessage(null);

    imageInputRef.current!.value = '';
  };

  const renderStatus = () => {
    switch (status) {
      case 'uploading':
        return (
          <>
            <CircularProgress sx={{ mt: 2 }} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              {' '}
              {message}{' '}
            </Typography>
          </>
        );
      case 'uploaded':
      case 'error':
        return (
          <Typography variant="body2" sx={{ mt: 2 }}>
            {' '}
            {message}{' '}
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-w-[40dvw] max-w-96 flex-col items-center justify-center rounded-xl border-2">
      <Box
        sx={{
          bgcolor: 'primary.main',
          background: backgroundGradients.buttonPrimaryActive,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          mx: 0,
          px: 0,
        }}
        className="rounded-xl"
      >
        <Typography variant="h4" color="primary.contrastText">
          <Trans id="account.title">HelloCity Account</Trans>
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        <Trans id="profile.avatar.title">Profile Picture</Trans>
      </Typography>

      {/* Image Preview Section below ↓ */}

      {!preview || status === 'uploading' ? (
        <Image
          src="/images/default-avatar.jpg"
          alt="Default Avatar"
          width={150}
          height={150}
          className="rounded-xl border-2 border-indigo-600"
        />
      ) : (
        <Image
          src={preview}
          alt="Profile Image Preview"
          width={150}
          height={150}
          className="h-32 w-32 rounded-xl border-2 border-indigo-600 object-cover"
        />
      )}

      {renderStatus()}

      {/* Buttons to upload or remove photos */}
      <div className="flex w-4/5 flex-wrap justify-center">
        <Button variant="secondary" component="label" sx={{ mt: 4, mb: 2 }}>
          <Trans id="profile.avatar.add">Add Profile Picture</Trans>
          <input type="file" hidden ref={imageInputRef} onChange={handleFileChange} />
        </Button>

        {preview && status !== 'uploading' && (
          <Button variant="secondary" onClick={handleRemove} sx={{ mt: 4, mb: 2 }}>
            <Trans id="profile.avatar.remove">Remove Photos</Trans>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
