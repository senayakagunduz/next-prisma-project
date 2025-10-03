'use client'
import { toggleFavoriteAction } from '@/utils/actions';
import { usePathname } from 'next/navigation';
import React from 'react'
import FormContainer from '../form/FormContainer';

type FavoriteToggleFormProps = {
  productId: string,
  favoriteId: string | null
}
function FavoriteToggleForm({ productId, favoriteId }: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, { productId, favoriteId, pathname })
  return <FormContainer>Favorite Toggle Form</FormContainer>
  
}

export default FavoriteToggleForm
