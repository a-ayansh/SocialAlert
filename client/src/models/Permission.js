import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: String,
    enum: ['case_management', 'user_management', 'moderation', 'system', 'notifications'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Permission = model('Permission', permissionSchema);
export default Permission;
