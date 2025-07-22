'use client'
import React from 'react';
import { TextField, Button, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
//import countries from 'world-countries';
import axios from 'axios';
const page = () => {
  type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    nationality: string;
    city: string;
    language: string;
  };
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '',  confirmPassword: '',  gender: '', nationality: '', city: '', language: ''});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword){
      alert("Password doesn't match with Confirm Password")
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format");
      return;
    }
    // send data to API here
    try {
      console.log('Form Sent: ', formData);

      const response = await axios.post('http://localhost:5000/api/user-profile', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });

      console.log('Success:', response.data);
      // optionally show success alert or redirect
      if (response.data.data?.userId) {
        localStorage.setItem('userId', response.data.data?.userId);
      } else {
        console.warn('userId not found in response');
      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred while submitting the form');
    }
  };
  const genders = ['Male', 'Female', 'Other', 'Prefer Not To Say'];
  const city = ['Sydney', 'Melbourne', 'Adelaide', 'Perth'];
  const nationalities = ['China', 'Korea', 'Japan']
  const languages = ['en', 'cn'];
  
  return (
    <form onSubmit={handleSubmit} className="relative w-[100vw] h-[100vh] bg-[url('/images/auth-image.jpeg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative w-[25%] min-w-[400px] h-[50%] bg-[#ffffff] rounded-3xl flex justify-around flex-col items-center">
        <div>
          <Typography variant="h3">
            Hello City
          </Typography>
        </div>

        { pageNumber === 1 &&
        <div className="flex justify-around flex-col gap-2 w-[50%]">
          <TextField 
            label="UserName" 
            name="username" 
            variant="outlined" 
            required 
            value={formData.username} 
            onChange={handleChange}
          />
          <TextField 
            label="Email" 
            name="email" 
            variant="outlined" 
            required 
            value={formData.email} 
            onChange={handleChange}
            />
          <TextField 
            label="Password" 
            name="password" 
            variant="outlined" 
            required 
            type='password' 
            value={formData.password} 
            onChange={handleChange}
          />
          <TextField 
            label="Confirm Password" 
            name="confirmPassword" 
            variant="outlined" 
            required 
            type='password' 
            value={formData.confirmPassword} 
            onChange={handleChange}
          />
        </div> }

        { pageNumber === 2 &&
        <div className="flex flex-col gap-2 w-[50%]">
          <TextField
            select
            label="Gender"
            name="gender"
            variant="outlined"
            required
            value={formData.gender} 
            onChange={handleChange}
          >
            {genders.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            select
            label="Nationality" 
            name="nationality"
            variant="outlined"
            value={formData.nationality} 
            onChange={handleChange}
          >
            {nationalities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="City"
            name="city"
            variant="outlined"
            value={formData.city} 
            onChange={handleChange}
          >
            {city.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            fullWidth
            select
            label="Language" 
            name="language"
            variant="outlined"
            value={formData.language} 
            onChange={handleChange}
          >
            {languages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div> }

        <div>
        { pageNumber === 1 &&
          <Button variant="contained" color="primary" sx={{ml: "auto" }} onClick={()=>{setPageNumber(pageNumber+1)}}>
            Next
          </Button> 
        }

        { pageNumber === 2 &&
          <div className='flex gap-2'>
            <Button variant="contained" color="primary" sx={{mr: "auto" }} onClick={()=>{setPageNumber(pageNumber-1)}}>
              Prev
            </Button>

            <Button variant="contained" color="primary" sx={{mr: "auto" }} type="submit">
              I'm all set
            </Button>
          </div>
        }
        </div>
      </div>
    </form>
  )
  
}

export default page