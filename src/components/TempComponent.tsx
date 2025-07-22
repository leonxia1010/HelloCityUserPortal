// 'use client';

// import React, { useState, useRef } from 'react';
// import { Box, Button, Typography, CircularProgress, Snackbar } from '@mui/material';
// import Image from 'next/image';

// const TempComponent = () => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for the file input element

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file format and size
//     if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
//       setError('Invalid file type or size. Please upload an image file under 5MB.');
//       return;
//     }

//     // Show loading state
//     setLoading(true);
//     setUploadStatus('Uploading...');

//     const objectUrl = URL.createObjectURL(file);
//     setPreview(objectUrl);
//     setSelectedImage(objectUrl); // Set the selected image as the new preview

//     // Simulate upload process
//     setTimeout(() => {
//       setLoading(false);
//       setUploadStatus('Upload successful!');
//     }, 2000);
//   };

//   const handleRemove = () => {
//     setPreview(null);
//     setSelectedImage(null); // Ensure the selected image is also cleared
//     setUploadStatus(null);
//     setError(null);

//     // Reset the file input value to allow re-selection of the same image
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // This forces the input to recognize file changes again
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setError(null);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: 2,
//         p: 4,
//         maxWidth: 400,
//         margin: 'auto',
//       }}
//     >
//       <Typography variant="h5">HelloCity Account</Typography>
//       <Typography variant="h6">Profile Picture</Typography>

//       {/* Show default avatar or selected image */}
//       {!preview ? (
//         <Image
//           src="/images/default-avatar.jpg" // Default avatar image if no image is uploaded
//           alt="Default Avatar"
//           width={400}
//           height={400}
//           className="w-32 h-32 object-cover border border-black rounded-xl"
//         />
//       ) : (
//         <img
//           src={preview}
//           alt="Preview"
//           width={400}
//           height={400}
//           className="w-32 h-32 object-cover border border-black rounded-xl"
//         />
//       )}

//       {/* Choose File Button */}
//       <Button
//         variant="contained"
//         component="label"
//         color="primary"
//         sx={{ mt: 2 }}
//       >
//         Choose File
//         <input
//           type="file"
//           hidden
//           ref={fileInputRef} // Attach the file input reference
//           onChange={handleFileChange}
//         />
//       </Button>

//       {/* Remove Button if Image Exists */}
//       {preview && !loading && (
//         <Button
//           onClick={handleRemove}
//           variant="outlined"
//           color="secondary"
//           sx={{ mt: 2 }}
//         >
//           Remove
//         </Button>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <CircularProgress sx={{ mt: 2 }} />
//       )}

//       {/* Upload Status */}
//       {uploadStatus && (
//         <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
//           {uploadStatus}
//         </Typography>
//       )}

//       {/* Error Message */}
//       {error && (
//         <Typography variant="body2" sx={{ mt: 2, color: 'red' }}>
//           {error}
//         </Typography>
//       )}

//       {/* Snackbar for Errors */}
//       <Snackbar
//         open={!!error}
//         message={error}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//       />
//     </Box>
//   );
// };

// export default TempComponent;