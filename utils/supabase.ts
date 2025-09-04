import { createClient } from '@supabase/supabase-js';

// Mock implementation for local development
const supabase = {
  storage: {
    from: () => ({
      upload: async () => ({
        data: { path: 'mock-path' },
        error: null,
      }),
      getPublicUrl: () => ({
        data: {
          publicUrl: '/images/placeholder.jpg',
        },
      }),
      remove: async () => ({
        data: {},
        error: null,
      }),
    }),
  },
};

export { supabase };

export const uploadImage = async (image: File) => {
  // Return a placeholder URL for local development
  return '/images/placeholder.jpg';
};

export const deleteImage = async (url: string) => {
  // Mock successful deletion
  return { data: {}, error: null };
};
