
'use client';

import React from 'react'
import { useState , useEffect} from 'react';
import Image from 'next/image';

// 定义类型


interface UserData {
  Username: string;
  Nickname: string;
  Avatar: string;
  LastJoinDate: string;
}

const UserProfileCard = ({Username, Nickname, Avatar, LastJoinDate} : UserData) => {
   const defaultUserData: UserData = {
    Username: 'UnknownUser',
    Nickname: 'UnknownNickname',
    Avatar: '/avatar.jpg',
    LastJoinDate: '2023-01-01'
  };

  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    // 创建合并后的数据对象
    const mergedData = {
      Username: Username || defaultUserData.Username,
      Nickname: Nickname || defaultUserData.Nickname,
      Avatar: Avatar || defaultUserData.Avatar,
      LastJoinDate: LastJoinDate || defaultUserData.LastJoinDate
    };
    
    setUserData(mergedData);
  }, [Username, Nickname, Avatar, LastJoinDate]);


  // 状态指示器颜色
  // const statusColors = {
  //   'online': 'bg-green-500',
  //   'offline': 'bg-gray-400',
  //   'busy': 'bg-red-500',
  //   'away': 'bg-yellow-500'
  // };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* 顶部用户信息区域 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-white">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-indigo-600">
                  {/* 绘制默认头像 */}
                  {userData.Avatar === '/avatar.jpg' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <Image src={userData.Avatar} alt="User Avatar" width={64} height={64} className="rounded-full" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="ml-4">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">{userData.Username}</h1>
              </div>
              <p className="text-indigo-200">@{userData.Nickname}</p>
              <p className="text-sm mt-1 flex items-center">
                {/* 绘制钟表图像 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                last login: {userData.LastJoinDate}
              </p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default UserProfileCard;