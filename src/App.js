import React, { useState, useEffect } from 'react';


function ProductForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    quantity: '',
    price: '',
    dateAdded: '',
    description: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from db.json
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:5000/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const idRegex = /^PROD-\d{4}$/; // Regex for PROD-XXXX format

    if (!idRegex.test(formData.id)) {
      newErrors.id = "ID must be in the format 'PROD-XXXX' where X is a digit.";
    }

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be a positive integer.";
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!formData.dateAdded) {
      newErrors.dateAdded = "Date added is required.";
    } else if (new Date(formData.dateAdded) > new Date()) {
      newErrors.dateAdded = "Date added cannot be in the future.";
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate saving to db.json (for demo, usually you would POST to the server)
      const newProduct = { ...formData };
      setSubmittedData(newProduct);

      // Reset form data
      setFormData({
        id: '',
        name: '',
        category: '',
        quantity: '',
        price: '',
        dateAdded: '',
        description: '',
      });

      // Clear errors
      setErrors({});

      // Display success message
      alert('Product added successfully!');
    }
  };

  return (
    <div className="container">
      <h2>Thêm Mới Sản Phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mã sản phẩm :(PROD-XXXX)</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
          {errors.id && <p className="error">{errors.id}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Tên sản phẩm :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Thể Loại:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Số lượng:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Giá sản phẩm:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Ngày nhập sản phẩm:</label>
          <input
            type="date"
            name="dateAdded"
            value={formData.dateAdded}
            onChange={handleInputChange}
            required
          />
          {errors.dateAdded && <p className="error">{errors.dateAdded}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Mô tả sản phẩm :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>} {/* Display error message */}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-info">
          <h3>Thêm Mới Sản phẩm </h3>
          <p><strong>Mã sản phẩm:</strong> {submittedData.id}</p>
          <p><strong>Tên sản phẩm:</strong> {submittedData.name}</p>
          <p><strong>Thể loại:</strong> {submittedData.category}</p>
          <p><strong>Số lượng:</strong> {submittedData.quantity}</p>
          <p><strong>GIá:</strong> {submittedData.price}</p>
          <p><strong>Ngày nhập sản phẩm :</strong> {new Date(submittedData.dateAdded).toLocaleDateString('en-GB')}</p>
          <p><strong>Mô tả sản phẩm :</strong> {submittedData.description}</p>
        </div>
      )}
    </div>
  );
}

export default ProductForm;
