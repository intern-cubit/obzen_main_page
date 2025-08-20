import Product from '../models/Product.js';
import User from '../models/User.js';

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 30,
      category,
      minPrice,
      maxPrice,
      rating,
      sort = 'createdAt',
      order = 'desc',
      search,
      inStock,
      featured
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query['rating.average'] = { $gte: Number(rating) };
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (inStock === 'true') {
      query.inStock = true;
      query.stock = { $gt: 0 };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Build sort object
    const sortObj = {};
    if (search) {
      sortObj.score = { $meta: 'textScore' };
    } else {
      sortObj[sort] = order === 'desc' ? -1 : 1;
    }

    // Execute query with pagination
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortObj,
      populate: {
        path: 'reviews.user',
        select: 'firstName lastName avatar'
      }
    };

    const products = await Product.paginate(query, options);

    res.json({
      success: true,
      data: {
        products: products.docs,
        pagination: {
          current: products.page,
          pages: products.totalPages,
          total: products.totalDocs,
          hasNext: products.hasNextPage,
          hasPrev: products.hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      $or: [{ _id: id }, { seoUrl: id }],
      isActive: true
    }).populate({
      path: 'reviews.user',
      select: 'firstName lastName avatar'
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    }).limit(6).select('title subtitle price originalPrice backgroundImage rating badge');

    res.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({
      isFeatured: true,
      isActive: true
    })
    .limit(parseInt(limit))
    .sort({ 'rating.average': -1, createdAt: -1 })
    .select('title subtitle price originalPrice backgroundImage rating badge discountPercentage');

    res.json({
      success: true,
      data: { products }
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const products = await Product.find({
      $text: { $search: q },
      isActive: true
    })
    .limit(parseInt(limit))
    .sort({ score: { $meta: 'textScore' } })
    .select('title subtitle price backgroundImage rating');

    res.json({
      success: true,
      data: { products }
    });

  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Initialize wishlist if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }

    const isInWishlist = user.wishlist.includes(productId);

    if (isInWishlist) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
      await user.save();

      return res.json({
        success: true,
        message: 'Product removed from wishlist',
        data: { inWishlist: false }
      });
    } else {
      user.wishlist.push(productId);
      await user.save();

      return res.json({
        success: true,
        message: 'Product added to wishlist',
        data: { inWishlist: true }
      });
    }

  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate({
      path: 'wishlist',
      select: 'title subtitle price originalPrice backgroundImage rating badge discountPercentage stock inStock'
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { wishlist: user.wishlist || [] }
    });

  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity = 1, variant } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.inStock || product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock or insufficient quantity'
      });
    }

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    // Check if product already in cart
    const cartItemIndex = user.cart.findIndex(item => 
      item.product.toString() === productId &&
      JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (cartItemIndex > -1) {
      // Update quantity
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        product: productId,
        quantity,
        variant,
        addedAt: new Date()
      });
    }

    await user.save();

    // Populate cart for response
    await user.populate({
      path: 'cart.product',
      select: 'title price backgroundImage stock inStock'
    });

    res.json({
      success: true,
      message: 'Product added to cart',
      data: { cart: user.cart }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    const cartItemIndex = user.cart.findIndex(item => item._id.toString() === itemId);

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    if (quantity <= 0) {
      // Remove item
      user.cart.splice(cartItemIndex, 1);
    } else {
      // Update quantity
      user.cart[cartItemIndex].quantity = quantity;
    }

    await user.save();

    // Populate cart for response
    await user.populate({
      path: 'cart.product',
      select: 'title price backgroundImage stock inStock'
    });

    res.json({
      success: true,
      message: quantity <= 0 ? 'Item removed from cart' : 'Cart updated',
      data: { cart: user.cart }
    });

  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate({
      path: 'cart.product',
      select: 'title subtitle price originalPrice backgroundImage stock inStock discountPercentage'
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate cart totals
    const cartTotals = (user.cart || []).reduce((totals, item) => {
      if (item.product && item.product.inStock) {
        const itemTotal = item.product.price * item.quantity;
        totals.subtotal += itemTotal;
        totals.items += item.quantity;
      }
      return totals;
    }, { subtotal: 0, items: 0 });

    res.json({
      success: true,
      data: {
        cart: user.cart || [],
        totals: cartTotals
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(review => 
      review.user.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Add review
    product.reviews.push({
      user: userId,
      rating,
      comment
    });

    // Update product rating
    product.updateRating();
    await product.save();

    // Populate the new review
    await product.populate({
      path: 'reviews.user',
      select: 'firstName lastName avatar'
    });

    const newReview = product.reviews[product.reviews.length - 1];

    res.json({
      success: true,
      message: 'Review added successfully',
      data: { review: newReview }
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Buy Now functionality - creates temporary cart and redirects to checkout
export const buyNow = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity = 1, variant } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.inStock || product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock or insufficient quantity'
      });
    }

    // Create a temporary cart item for buy now
    const buyNowItem = {
      product: productId,
      quantity: Number(quantity),
      variant: variant || {},
      addedAt: new Date()
    };

    // Calculate totals for buy now
    const price = product.price;
    const total = price * quantity;

    res.json({
      success: true,
      message: 'Product ready for immediate purchase',
      data: {
        buyNowItem,
        product: {
          _id: product._id,
          title: product.title,
          subtitle: product.subtitle,
          price: product.price,
          originalPrice: product.originalPrice,
          backgroundImage: product.backgroundImage,
          stock: product.stock,
          inStock: product.inStock,
          discountPercentage: product.discountPercentage
        },
        totals: {
          subtotal: total,
          items: quantity,
          total: total
        }
      }
    });

  } catch (error) {
    console.error('Buy now error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
