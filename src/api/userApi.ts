import type { User } from '@/types/User.types';
import axios from 'axios';


export const createUser = async (newUser: User) => {
  const response = await axios.post('http://localhost:5000/api/user-profile', newUser, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
  });
  return response;
}

export const fetchUser = async (newUser: User) => {
  const response = await axios.get(`http://localhost:5000/api/${newUser.username}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
  })
  return response;
}
