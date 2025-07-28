'use client';

import React from 'react'
import Image from 'next/image';
interface UserData {
  UserName?: string;
  PreferredName?: string;
  Avatar?: string;
  LastJoinDate?: string;
}

const UserProfileCard: React.FC<UserData> = ({UserName, PreferredName, Avatar, LastJoinDate}) => {
  
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-2">
      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-white" data-testid="avatar-container">
        {!Avatar ? (
          <span className="material-icons text-7xl text-gray-400">
            account_circle
          </span>
          ) : (
          <Image src={Avatar} alt="User Avatar" width={64} height={64} className="rounded-full" />
        )}
      </div>     
      <div>
        <span className="text-xl font-bold flex">{UserName || "Unknown User"}</span>
        <span className="text-indigo-200 flex">@{PreferredName || "UnknownNickname"}</span>
        <div className="text-sm mt-1 flex items-center gap-1">
          <span className="material-icons text-indigo-200 text-base">
            access_time
          </span>
            last login: {LastJoinDate || "Unknown"}
        </div>
      </div>
    </div> 
  );
};

export default UserProfileCard;