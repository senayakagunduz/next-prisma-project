"use client";

import { LuUser2 } from 'react-icons/lu';
import { useUser } from '@clerk/nextjs';

function UserIcon() {
  const { user } = useUser();
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img 
        src={profileImage} 
        alt="User profile" 
        className='w-6 h-6 rounded-full object-cover' 
      />
    );
  }

  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}

export default UserIcon;