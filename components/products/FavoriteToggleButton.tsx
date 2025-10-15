'use client';

import React, { useEffect, useState } from 'react'
import {FaHeart} from 'react-icons/fa'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

function FavoriteToggleButton({productId}:{productId:string}) {
    const {userId} = useAuth();
    const [favoriteId, setFavoriteId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadFavorite = async () => {
        if (userId) {
          try {
            const id = await fetchFavoriteId({productId});
            setFavoriteId(id);
          } catch (error) {
            console.error('Error loading favorite:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      };
      loadFavorite();
    }, [userId, productId]);

    if(!userId) return <CardSignInButton/>
    if(isLoading) return null;
    
    return (
      <FavoriteToggleForm productId={productId} favoriteId={favoriteId}/>
    )
}

export default FavoriteToggleButton
