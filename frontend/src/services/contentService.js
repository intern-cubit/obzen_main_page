import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentAdmin: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export const heroService = {
  getHero: async () => {
    const response = await api.get('/hero');
    return response.data;
  },

  updateHero: async (data) => {
    const response = await api.put('/hero', data);
    return response.data;
  },

  createOrUpdateHero: async (data) => {
    try {
      // Try to update first
      const response = await api.put('/hero', data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // If no hero exists, create one
        const response = await api.post('/hero', data);
        return response.data;
      }
      throw error;
    }
  },
};

export const aboutService = {
  getAbout: async () => {
    const response = await api.get('/about');
    return response.data;
  },

  updateAbout: async (data) => {
    const response = await api.put('/about', data);
    return response.data;
  },

  createOrUpdateAbout: async (data) => {
    try {
      // Try to update first
      const response = await api.put('/about', data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // If no about exists, create one
        const response = await api.post('/about', data);
        return response.data;
      }
      throw error;
    }
  },
};

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductsAdmin: async () => {
    const response = await api.get('/products/admin');
    return response.data;
  },

  createProduct: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  toggleProduct: async (id) => {
    const response = await api.put(`/products/${id}/toggle`);
    return response.data;
  },
};

export const serviceService = {
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getServicesAdmin: async () => {
    const response = await api.get('/services/admin');
    return response.data;
  },

  createService: async (data) => {
    const response = await api.post('/services', data);
    return response.data;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  toggleService: async (id) => {
    const response = await api.put(`/services/${id}/toggle`);
    return response.data;
  },
};

export const reviewService = {
  getReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },

  getReviewsAdmin: async () => {
    const response = await api.get('/reviews/admin');
    return response.data;
  },

  createReview: async (data) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  updateReview: async (id, data) => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  toggleReview: async (id) => {
    const response = await api.put(`/reviews/${id}/toggle`);
    return response.data;
  },
};

export const contactService = {
  getContact: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  updateContact: async (data) => {
    const response = await api.put('/contact', data);
    return response.data;
  },

  createContact: async (data) => {
    const response = await api.put('/contact', data);
    return response.data;
  },
};

export const uploadService = {
  uploadFile: async (file, type = 'images') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await api.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },
};
