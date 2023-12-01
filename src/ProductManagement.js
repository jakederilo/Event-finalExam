import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Product from './Product';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [lastProductId, setLastProductId] = useState(0);
  const [lastCategoryId, setLastCategoryId] = useState(0);
  

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: lastProductId + 1 }]);
    setLastProductId(lastProductId + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: e.target.name.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      category: e.target.category.value,
    });

    // Reset the form
    e.target.reset();
  };
  const updateProduct = (productId, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setEditingProduct(null);
  };

  const startEditingProduct = (id) => {
    setEditingProduct(id);
  };

  const addCategory = (categoryName) => {
    setCategories([...categories, { name: categoryName, id: lastCategoryId + 1 }]);
    setLastCategoryId(lastCategoryId + 1);
  };


  const handleProductSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: e.target.name.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      category: e.target.category.value,
    });

    
    e.target.reset();
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const categoryName = e.target.categoryName.value;
    addCategory(categoryName);

    e.target.reset();
  };

  const startEditingCategory = (categoryId) => {
    setEditingCategory(categoryId);
    setUpdatedCategoryName(
      categories.find((category) => category.id === categoryId).name
    );
  };

  const cancelEditingCategory = () => {
    setEditingCategory(null);
    setUpdatedCategoryName('');
  };

  const updateCategory = (categoryId) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, name: updatedCategoryName }
          : category
      )
    );
    setEditingCategory(null);
    setUpdatedCategoryName('');
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    setEditingCategory(null);
    setUpdatedCategoryName('');
  };



  return (
    <div>
      <form onSubmit={handleProductSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Product Stock"
          required
        />
        <select name="category" required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>

      <form onSubmit={handleCategorySubmit}>
        <input
          type="text"
          name="categoryName"
          placeholder="Category Name"
          required
          
        />
        <button type="submit">Add Category</button>
      </form>
      {/* Render categories with delete and update buttons */}
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {editingCategory === category.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                  />
                  <button onClick={() => updateCategory(category.id)}>
                    Save
                  </button>
                  <button onClick={cancelEditingCategory}>Cancel</button>
                </div>
              ) : (
                <div>
                  {category.name}
                  <button onClick={() => startEditingCategory(category.id)}>
                    Update
                  </button>
                  <button onClick={() => deleteCategory(category.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {editingProduct && (
        <Product
          product={products.find((product) => product.id === editingProduct)}
          categories={categories}
          onSubmit={(updatedProduct) =>
            updateProduct(editingProduct, updatedProduct)
          }
        />
      )}




      
<div>
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => startEditingProduct(product.id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       
      

    </div>

  );
};

export default ProductManagement;