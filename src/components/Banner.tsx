'use client'
import React, { useEffect, useState } from 'react'
import { Typography, Button, Box } from '@mui/material';
import axios from 'axios'
import { useTheme } from '@mui/material/styles';

const Banner = () => {
  const [userData, setUserData] = useState<any>(null);
  const theme = useTheme();
  const fetchUser = async(id: string | null) => {
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/user-profile/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      setUserData(response.data);
      console.log(response.data)
      console.log('User get submitted')
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }
  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    fetchUser(userId);
  
  }, [])
  return (
    <div className="relative w-screen h-[57vh] bg-[url('/images/banner-image.jpeg')] bg-cover bg-center bg-no-repeat text-left">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative text-white pt-24 w-[70%] ml-[20vw]">
        <Typography variant="h2" sx={{ marginTop: '10vh'}}>
          Navigate your new city with  <br/>
          <Typography variant="inherit" component="span" sx={{ color: 'primary.main' }}>
            confidence
          </Typography>
        </Typography> 
        <Typography variant="body1">
          Get personalized guidance step by step checklists, and timeline <br/>
          planning for setting into any city. Whether you're a tourist, student or <br/>
          migrant
        </Typography>
        <Button variant='primary' sx={{marginTop: "6px"}}>
          Try HelloCity
        </Button>
      </div>
      <div className='absolute top-[110%] ml-[40%]'>
        {userData &&
          <Box p={3} 
            color="primary"
            sx={{background: theme.backgroundGradients.buttonPrimaryActive, borderRadius: '40px'}}
          >
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>

            <Typography variant='body1'><strong>Username:</strong> {userData.username}</Typography>
            <Typography variant='body1'><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant='body1'><strong>Gender:</strong> {userData.gender}</Typography>
            <Typography variant='body1'><strong>City:</strong> {userData.city || 'N/A'}</Typography>
            <Typography variant='body1'><strong>Nationality:</strong> {userData.nationality || 'N/A'}</Typography>
            <Typography variant='body1'><strong>Preferred Language:</strong> {userData.preferredLanguage}</Typography>
            <Typography variant='body1'><strong>University:</strong> {userData.university || 'N/A'}</Typography>
            <Typography variant='body1'><strong>Major:</strong> {userData.major || 'N/A'}</Typography>
            <Typography variant='body1'><strong>Last Join Date:</strong> {new Date(userData.lastJoinDate).toLocaleString()}</Typography>
            <Typography variant='body1'><strong>User ID:</strong> {userData.userId}</Typography>
          </Box>
        }
      </div>
    </div>
  )
}

export default Banner