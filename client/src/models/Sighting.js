import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sightingSchema = new Schema({
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },

  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  anonymousReporter: {
    name: String,
    phone: String,
    email: String,
    allowContact: { type: Boolean, default: true }
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },

  sightingDate: {
    type: Date,
    required: [true, 'Sighting date is required']
  },
  reportDate: {
    type: Date,
    default: Date.now
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator(coords) {
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
  locationDescription: {
    type: String,
    maxlength: [500, 'Location description cannot exceed 500 characters']
  },

  description: {
    type: String,
    required: [true, 'Sighting description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  confidence: {
    type: String,
    enum: ['very_low', 'low', 'medium', 'high', 'very_high'],
    required: true
  },
  circumstances: {
    type: String,
    maxlength: [1000, 'Circumstances cannot exceed 1000 characters']
  },

  subjectCondition: {
    type: String,
    enum: ['appeared_healthy', 'appeared_distressed', 'appeared_injured', 'unknown'],
    default: 'unknown'
  },
  companionDetails: {
    type: String,
    maxlength: [500, 'Companion details cannot exceed 500 characters']
  },
  behaviorObserved: {
    type: String,
    maxlength: [500, 'Behavior description cannot exceed 500 characters']
  },

  images: [{
    url: { type: String, required: true },
    publicId: String,
    caption: String,
    metadata: {
      timestamp: Date,
      gpsCoordinates: [Number],
      cameraInfo: String
    },
    uploadedAt: { type: Date, default: Date.now }
  }],
  videos: [{
    url: String,
    publicId: String,
    duration: Number,
    thumbnail: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'needs_review', 'spam'],
    default: 'pending'
  },
  moderatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  moderationNotes: {
    type: String,
    maxlength: [1000, 'Moderation notes cannot exceed 1000 characters']
  },

  verificationStatus: {
    type: String,
    enum: ['unverified', 'partially_verified', 'verified', 'false_positive'],
    default: 'unverified'
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationNotes: String,

  followUpActions: [{
    action: {
      type: String,
      enum: ['contacted_reporter', 'visited_location', 'shared_with_law_enforcement', 'investigated']
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String,
    performedAt: { type: Date, default: Date.now }
  }],

  familyNotified: {
    type: Boolean,
    default: false
  },
  familyNotifiedAt: Date,
  lawEnforcementNotified: {
    type: Boolean,
    default: false
  },
  lawEnforcementNotifiedAt: Date,

  reliability: {
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    factors: {
      reporterHistory: Number,
      evidenceQuality: Number,
      locationAccuracy: Number,
      timelineConsistency: Number,
      detailReliability: Number
    }
  },

  reporterFeedback: {
    contacted: { type: Boolean, default: false },
    contactedAt: Date,
    satisfied: Boolean,
    comments: String,
    allowPublicSharing: { type: Boolean, default: false }
  },

  flags: [{
    type: {
      type: String,
      enum: ['duplicate', 'suspicious', 'low_quality', 'potential_spam', 'outdated']
    },
    reason: String,
    flaggedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    flaggedAt: { type: Date, default: Date.now }
  }],

  externalReferences: [{
    system: String,
    referenceId: String,
    url: String,
    syncedAt: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
sightingSchema.index({ location: '2dsphere' });
sightingSchema.index({ caseId: 1, sightingDate: -1 });
sightingSchema.index({ moderationStatus: 1, createdAt: -1 });
sightingSchema.index({ reportedBy: 1 });
sightingSchema.index({ verificationStatus: 1 });
sightingSchema.index({ sightingDate: -1 });

sightingSchema.index({
  caseId: 1,
  moderationStatus: 1,
  sightingDate: -1
});
sightingSchema.index({
  location: '2dsphere',
  moderationStatus: 1,
  sightingDate: -1
});

// Virtuals
sightingSchema.virtual('daysSinceSighting').get(function () {
  return Math.floor((Date.now() - this.sightingDate) / (1000 * 60 * 60 * 24));
});

sightingSchema.virtual('responseTime').get(function () {
  if (this.familyNotifiedAt) {
    return this.familyNotifiedAt - this.createdAt;
  }
  return null;
});

const Sighting = model('Sighting', sightingSchema);
export default Sighting;
