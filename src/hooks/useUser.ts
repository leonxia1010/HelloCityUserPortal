import { useState } from 'react';
import axios from 'axios';
import type { User } from '@/models/User.types';

export function useUser(){
  const [userLogin, setUserLogin] = useState([]); 
  const createUser = async (newUser: User) => {
    const response = await axios.post('http://localhost:5000/api/user-profile', newUser, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
    return response;
  }
  return { createUser }
}
