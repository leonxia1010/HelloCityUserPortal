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

export const fetchUser = async (newUserId: string) => {
  const response = await axios.get(`http://localhost:5000/api/${newUserId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
  })
  return response;
}
