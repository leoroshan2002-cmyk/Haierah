import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProductUpdatePayload } from './productController.js';

test('buildProductUpdatePayload preserves existing values for blank update fields', () => {
  const existingProduct = {
    name: 'Classic Shirt',
    sku: 'ZR-001',
    price: 1999,
    discountPrice: 1499,
    category: 'Men',
    subCategory: 'Shirts',
    stock: 8,
    description: 'Premium cotton shirt',
    images: ['/uploads/products/one.jpg'],
    variants: { sizes: ['M'], colors: [{ name: 'Blue', hex: '#2563EB' }] },
    status: 'Active',
  };

  const result = buildProductUpdatePayload(existingProduct, {
    stock: 12,
    category: '',
    subCategory: '',
    sku: '',
    description: '',
    images: [],
    variants: { sizes: [], colors: [] },
  });

  assert.equal(result.stock, 12);
  assert.equal(result.category, 'Men');
  assert.equal(result.subCategory, 'Shirts');
  assert.equal(result.sku, 'ZR-001');
  assert.equal(result.description, 'Premium cotton shirt');
  assert.deepEqual(result.images, ['/uploads/products/one.jpg']);
  assert.deepEqual(result.variants, { sizes: ['M'], colors: [{ name: 'Blue', hex: '#2563EB' }] });
});

test('buildProductUpdatePayload keeps explicitly provided values', () => {
  const existingProduct = {
    name: 'Classic Shirt',
    sku: 'ZR-001',
    price: 1999,
    discountPrice: 1499,
    category: 'Men',
    subCategory: 'Shirts',
    stock: 8,
    description: 'Premium cotton shirt',
    images: ['/uploads/products/one.jpg'],
    variants: { sizes: ['M'], colors: [] },
    status: 'Active',
  };

  const result = buildProductUpdatePayload(existingProduct, {
    name: 'Updated Shirt',
    stock: 0,
  });

  assert.equal(result.name, 'Updated Shirt');
  assert.equal(result.stock, 0);
  assert.equal(result.category, 'Men');
  assert.equal(result.subCategory, 'Shirts');
});
