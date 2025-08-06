// src/store/sagas/userSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../slices/user';
import { UserProfileCard } from '@/components';

// mock API call
// function fetchUserApi() {
//   return new Promise(resolve =>
//     setTimeout(() => {
//       resolve({
//         UserName: 'Jiujiu HOU',
//         PreferredName: 'Jiu',
//         Avatar: 'https://i.pravatar.cc/150?img=3',
//         LastJoinDate: '2025-08-06',
//         isloading: false,
//         error: null,
//       });
//     }, 1000)
//   );
// }

// import axios from 'axios';

// async function fetchUserApi() {
//   const response = await axios.get('/api/user/profile');
//   return response.data;
// }

async function fetchUserApi() {
  const res = await fetch('/api/user/profile');
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
}

function* handleFetchUser(): Generator {
  try {
    const data = yield call(fetchUserApi);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserFailure('Failed to fetch user'));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserRequest.type, handleFetchUser);
}
