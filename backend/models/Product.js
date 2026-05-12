const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters']
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: ''
    },

    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    images: [
      {
        type: String,
        trim: true
      }
    ],

    image: {
      type: String,
      default: '',
      trim: true
    },

    price: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Discontinued'],
      default: 'Active'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// SEARCH INDEXES
productSchema.index({
  name: 'text',
  description: 'text'
});

productSchema.index({
  category: 1
});

productSchema.index({
  status: 1
});

// VIRTUAL ID
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model(
  'Product',
  productSchema
);