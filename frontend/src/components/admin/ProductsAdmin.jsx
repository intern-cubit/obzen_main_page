import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, Upload, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { productService, uploadService } from '../../services/contentService';

const ProductsAdmin = () => {
  const defaultProducts = [
    {
      _id: 'default-1',
      title: 'IoT Device',
      subtitle: 'Smart sensor for automation',
      backgroundImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800',
      textColor: 'text-white',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      link: '#',
      description: 'A powerful IoT device for smart automation and monitoring.',
      category: 'Electronics',
      price: 299.99,
      sku: 'ELE-IOT-001',
      stock: 50,
      order: 1,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-2',
      title: 'PCB Design',
      subtitle: 'Custom PCB for your needs',
      backgroundImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800',
      textColor: 'text-white',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      link: '#',
      description: 'Professional PCB design and prototyping services.',
      category: 'Design',
      price: 199.99,
      sku: 'DES-PCB-002',
      stock: 25,
      order: 2,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-3',
      title: 'AI Brain',
      subtitle: 'AI-powered analytics',
      backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      textColor: 'text-white',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      link: '#',
      description: 'Advanced AI analytics for business intelligence.',
      category: 'Software',
      price: 599.99,
      sku: 'SOF-AIB-003',
      stock: 10,
      order: 3,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-4',
      title: 'Automation Suite',
      subtitle: 'End-to-end automation',
      backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      textColor: 'text-white',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      link: '#',
      description: 'Complete automation solutions for industry.',
      category: 'Systems',
      price: 999.99,
      sku: 'SYS-AUT-004',
      stock: 5,
      order: 4,
      isActive: true,
      isDefault: true
    }
  ];
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    textColor: 'text-white',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    link: '#',
    description: '',
    order: 0,
    category: '',
    price: '',
    sku: '',
    stock: 0,
    customPageRoute: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProductsAdmin();
      if (response.success && response.data && response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts(defaultProducts);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.subtitle || !formData.category || !formData.price || !formData.sku) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Ensure price is a number
    const submissionData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0
    };

    try {
      if (editingProduct && !editingProduct.isDefault) {
        await productService.updateProduct(editingProduct._id, submissionData);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(submissionData);
        toast.success('Product created successfully!');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Product save error:', error);
      if (error.response?.data?.message?.includes('sku')) {
        toast.error('SKU must be unique. Please choose a different SKU.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to save product');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image file size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const loadingToast = toast.loading('Uploading image...');

      const response = await uploadService.uploadFile(file, 'images');
      
      if (response.success) {
        const imageUrl = response.data.url;
        setFormData({ ...formData, backgroundImage: imageUrl });
        toast.dismiss(loadingToast);
        toast.success('Image uploaded successfully!');
      } else {
        toast.dismiss(loadingToast);
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (product) => {
    if (product.isDefault) {
      toast.error('Cannot edit default products. Please create a new product instead.');
      return;
    }
    setEditingProduct(product);
    setFormData({
      title: product.title,
      subtitle: product.subtitle,
      backgroundImage: product.backgroundImage,
      textColor: product.textColor,
      buttonColor: product.buttonColor,
      link: product.link,
      description: product.description,
      order: product.order,
      category: product.category || '',
      price: product.price || '',
      sku: product.sku || '',
      stock: product.stock || 0,
      customPageRoute: product.customPageRoute || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // Check if it's a default product
    const product = products.find(p => p._id === id);
    if (product?.isDefault) {
      toast.error('Cannot delete default products');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleToggle = async (id) => {
    // Check if it's a default product
    const product = products.find(p => p._id === id);
    if (product?.isDefault) {
      toast.error('Cannot toggle default products');
      return;
    }

    try {
      await productService.toggleProduct(id);
      toast.success('Product status updated!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product status');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      subtitle: '',
      backgroundImage: '',
      textColor: 'text-white',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      link: '#',
      description: '',
      order: 0,
      category: '',
      price: '',
      sku: '',
      stock: 0,
      customPageRoute: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-generate SKU when title or category changes
    if (name === 'title' || name === 'category') {
      const title = name === 'title' ? value : formData.title;
      const category = name === 'category' ? value : formData.category;
      
      if (title && category && !editingProduct) {
        const sku = generateSKU(category, title);
        setFormData(prev => ({ ...prev, [name]: value, sku }));
      }
    }
  };

  const generateSKU = (category, title) => {
    const categoryPrefix = category.toUpperCase().substring(0, 3);
    const titlePrefix = title.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 3);
    const timestamp = Date.now().toString().slice(-4);
    return `${categoryPrefix}-${titlePrefix}-${timestamp}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${product.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm opacity-90">{product.subtitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {product.isDefault && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Order: {product.order}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Category:</span> {product.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Price:</span> ${product.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">SKU:</span> {product.sku}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Stock:</span> {product.stock}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    disabled={product.isDefault}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded transition-colors ${
                      product.isDefault
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggle(product._id)}
                    disabled={product.isDefault}
                    className={`flex items-center justify-center px-3 py-2 rounded transition-colors ${
                      product.isDefault
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {product.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={product.isDefault}
                    className={`flex items-center justify-center px-3 py-2 rounded transition-colors ${
                      product.isDefault
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No products found. Create your first product!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">
                {editingProduct && !editingProduct.isDefault ? 'Edit Product' : 'Add New Product'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">Fields marked with * are required</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle *
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Electronics, IoT"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU (Stock Keeping Unit) *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    placeholder="e.g., IOT-001, PCB-DEV-100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Image
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    {isUploading && (
                      <div className="flex items-center px-3">
                        <Upload className="h-4 w-4 animate-spin text-blue-500" />
                      </div>
                    )}
                  </div>
                  {formData.backgroundImage && (
                    <div className="mt-2">
                      <img src={formData.backgroundImage} alt="Preview" className="w-full h-32 object-cover rounded-md border" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Color
                    </label>
                    <select
                      name="textColor"
                      value={formData.textColor}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="text-white">White</option>
                      <option value="text-black">Black</option>
                      <option value="text-gray-900">Dark Gray</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Color
                    </label>
                    <select
                      name="buttonColor"
                      value={formData.buttonColor}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="bg-blue-600 hover:bg-blue-700">Blue</option>
                      <option value="bg-green-600 hover:bg-green-700">Green</option>
                      <option value="bg-purple-600 hover:bg-purple-700">Purple</option>
                      <option value="bg-orange-600 hover:bg-orange-700">Orange</option>
                      <option value="bg-indigo-600 hover:bg-indigo-700">Indigo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Page Route
                  </label>
                  <select
                    name="customPageRoute"
                    value={formData.customPageRoute}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Default (ProductDetailPage)</option>
                    <option value="waBombProductPage">WA Bomb Product Page</option>
                    <option value="cubiViewProductPage">CubiView Product Page</option>
                    <option value="productDetailPage">Product Detail Page</option>
                    <option value="mailStormProductPage">Mail Storm Product Page</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select which page should open when this product is clicked. If no custom route is specified, it will open the default ProductDetailPage.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingProduct ? 'Update' : 'Create'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;
