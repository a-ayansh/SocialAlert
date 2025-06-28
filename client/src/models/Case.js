import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const caseSchema = new Schema({
  // Basic Case Information
  caseNumber: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Case title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  type: {
    type: String,
    enum: {
      values: ['missing_person', 'missing_pet'],
      message: 'Type must be either missing_person or missing_pet'
    },
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'found', 'closed', 'suspended'],
      message: 'Status must be one of: active, found, closed, suspended'
    },
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },

  // Missing Person/Pet Details
  subject: {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true
    },
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'unknown']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    physicalCharacteristics: {
      height: String,
      weight: String,
      eyeColor: String,
      hairColor: String,
      skinTone: String,
      distinguishingMarks: String,
      clothing: String,
      medicalConditions: String
    },
    petDetails: {
      species: String,
      breed: String,
      color: String,
      size: String,
      microchipped: Boolean,
      chipId: String,
      collar: String
    }
  },

  // Location Information (GeoJSON)
  lastSeenLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
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
  lastSeenAddress: {
    street: String,
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
    zipCode: String,
    formatted: { type: String, required: true }
  },
  searchRadius: {
    type: Number,
    default: 10,
    min: [1, 'Search radius must be at least 1km'],
    max: [500, 'Search radius cannot exceed 500km']
  },

  // Timeline
  lastSeenDate: {
    type: Date,
    required: [true, 'Last seen date is required']
  },
  reportedDate: {
    type: Date,
    default: Date.now
  },
  foundDate: Date,
  closedDate: Date,

  // Media
  images: [{
    url: { type: String, required: true },
    publicId: String,
    caption: String,
    isPrimary: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now }
  }],
  documents: [{
    url: String,
    filename: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  // Contact Information
  contactInfo: {
    primaryContact: {
      name: { type: String, required: true },
      relationship: String,
      phone: { type: String, required: true },
      email: String,
      alternatePhone: String
    },
    emergencyContact: {
      name: String,
      phone: String,
      email: String
    },
    lawEnforcement: {
      reportFiled: { type: Boolean, default: false },
      caseNumber: String,
      department: String,
      officerName: String,
      officerContact: String
    }
  },

  // Case Management
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  visibility: {
    type: String,
    enum: ['public', 'private', 'law_enforcement_only'],
    default: 'public'
  },
  tags: [String],

  // Alert Information
  alertSent: {
    type: Boolean,
    default: false
  },
  alertSentAt: Date,
  totalAlertsSent: {
    type: Number,
    default: 0
  },
  lastAlertSent: Date,

  // Social Media Integration
  socialMediaPosts: [{
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'instagram', 'telegram']
    },
    postId: String,
    url: String,
    postedAt: Date,
    status: {
      type: String,
      enum: ['posted', 'failed', 'deleted'],
      default: 'posted'
    }
  }],

  // Statistics
  stats: {
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    sightingsReceived: { type: Number, default: 0 },
    verifiedSightings: { type: Number, default: 0 }
  },

  // Case Notes and Updates
  updates: [{
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublic: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  }],

  // Resolution Information
  resolution: {
    status: {
      type: String,
      enum: ['found_alive', 'found_deceased', 'returned_home', 'false_alarm', 'other']
    },
    description: String,
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
caseSchema.index({ lastSeenLocation: '2dsphere' });
caseSchema.index({ status: 1, createdAt: -1 });
caseSchema.index({ type: 1, status: 1 });
caseSchema.index({ createdBy: 1 });
caseSchema.index({ lastSeenDate: -1 });
caseSchema.index({ caseNumber: 1 });
caseSchema.index({ tags: 1 });
caseSchema.index({ visibility: 1, status: 1 });
caseSchema.index({ lastSeenLocation: '2dsphere', status: 1, visibility: 1 });

// Virtuals
caseSchema.virtual('caseAge').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

caseSchema.virtual('daysSinceLastSeen').get(function () {
  return Math.floor((Date.now() - this.lastSeenDate) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware for case number generation
caseSchema.pre('save', async function (next) {
  if (this.isNew) {
    const year = new Date().getFullYear();
    const prefix = this.type === 'missing_person' ? 'MP' : 'PET';
    const count = await this.constructor.countDocuments({
      createdAt: { $gte: new Date(year, 0, 1) }
    });
    this.caseNumber = `${prefix}-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Case = model('Case', caseSchema);
export default Case;
