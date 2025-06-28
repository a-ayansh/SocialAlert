import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: {
      values: ['family', 'volunteer', 'moderator', 'admin', 'superadmin'],
      message: 'Role must be one of: family, volunteer, moderator, admin, superadmin'
    },
    default: 'volunteer'
  },
  permissions: [{
    type: String,
    enum: [
      'create_case', 'edit_own_case', 'edit_any_case', 'delete_case',
      'view_private_cases', 'moderate_sightings', 'manage_users',
      'send_notifications', 'access_admin_panel', 'manage_permissions'
    ]
  }],
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      validate: {
        validator: function(coords) {
          return coords.length === 2 && 
                 coords[0] >= -180 && coords[0] <= 180 &&
                 coords[1] >= -90 && coords[1] <= 90;
        },
        message: 'Invalid coordinates format'
      }
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    formatted: String
  },
  locationRadius: {
    type: Number,
    default: 25,
    min: [1, 'Radius must be at least 1km'],
    max: [100, 'Radius cannot exceed 100km']
  },
  notificationPreferences: {
    email: {
      enabled: { type: Boolean, default: true },
      newCases: { type: Boolean, default: true },
      caseUpdates: { type: Boolean, default: true },
      sightingReports: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false }
    },
    sms: {
      enabled: { type: Boolean, default: false },
      newCases: { type: Boolean, default: false },
      caseUpdates: { type: Boolean, default: false },
      emergencyOnly: { type: Boolean, default: true }
    },
    push: {
      enabled: { type: Boolean, default: true },
      newCases: { type: Boolean, default: true },
      caseUpdates: { type: Boolean, default: true },
      sightingReports: { type: Boolean, default: true }
    }
  },
  pushTokens: [{
    token: String,
    platform: {
      type: String,
      enum: ['web', 'android', 'ios']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },
  casesCreated: { type: Number, default: 0 },
  sightingsReported: { type: Number, default: 0 },
  avatar: {
    url: String,
    publicId: String
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  website: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.index({ location: '2dsphere' });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission) || this.role === 'superadmin';
};

const User = mongoose.model('User', userSchema);
export default User;
