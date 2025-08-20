import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../../services/ecommerceAPI';

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, variant }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addToCart(productId, { quantity, variant });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCartItem(itemId, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      await cartAPI.removeFromCart(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    subtotal: 0,
    itemCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.subtotal = 0;
      state.itemCount = 0;
    },
    updateCartStatus: (state, action) => {
      const { productId, isInCart } = action.payload;
      // Update local cart status without API call
      const existingItem = state.items.find(item => 
        (item.product?._id || item.product) === productId
      );
      
      if (isInCart && !existingItem) {
        // Add placeholder item for immediate UI update
        state.items.push({
          _id: `temp-${productId}`,
          product: productId,
          quantity: 1,
          temp: true
        });
      } else if (!isInCart && existingItem) {
        state.items = state.items.filter(item => 
          (item.product?._id || item.product) !== productId
        );
      }
      
      // Recalculate counts
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data?.cart || [];
        state.total = action.payload.data?.totals?.total || 0;
        state.subtotal = action.payload.data?.totals?.subtotal || 0;
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data?.cart || [];
        state.total = action.payload.data?.totals?.total || 0;
        state.subtotal = action.payload.data?.totals?.subtotal || 0;
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.data?.cart || [];
        state.total = action.payload.data?.totals?.total || 0;
        state.subtotal = action.payload.data?.totals?.subtotal || 0;
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      });
  },
});

export const { clearCart, updateCartStatus } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartLoading = (state) => state.cart.loading;
export const selectIsInCart = (productId) => (state) => 
  state.cart.items.some(item => (item.product?._id || item.product) === productId);

export default cartSlice.reducer;
