import React from 'react'
import {FaHeart} from 'react-icons/fa'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

  async function FavoriteToggleButton({productId}:{productId:string}) {
    const {userId}=useAuth();

    if(!userId) return <CardSignInButton/>
    const favoriteId=await fetchFavoriteId({productId})
    return (
      <FavoriteToggleForm productId={productId} favoriteId={favoriteId}/>
    )
 
}

export default FavoriteToggleButton
