import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    enum: [
      'new_case_alert',
      'case_update',
      'sighting_report',
      'case_found',
      'case_closed',
      'emergency_alert',
      'system_notification'
    ],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },

  title: {
    type: String,
    required: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  actionUrl: String,

  channels: {
    email: {
      enabled: { type: Boolean, default: false },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      messageId: String,
      error: String
    },
    sms: {
      enabled: { type: Boolean, default: false },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      messageId: String,
      error: String
    },
    push: {
      enabled: { type: Boolean, default: false },
      sent: { type: Boolean, default: false },
      sentAt: Date,
      messageId: String,
      error: String
    }
  },

  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed', 'cancelled'],
    default: 'pending'
  },
  attempts: {
    type: Number,
    default: 0
  },
  lastAttempt: Date,
  deliveredAt: Date,

  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  clicked: {
    type: Boolean,
    default: false
  },
  clickedAt: Date,

  sentBasedOnLocation: {
    type: Boolean,
    default: false
  },
  recipientLocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },
  distanceFromCase: Number,

  metadata: {
    batchId: String,
    campaignId: String,
    templateId: String,
    sourceSystem: String
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ recipientId: 1, createdAt: -1 });
notificationSchema.index({ caseId: 1, createdAt: -1 });
notificationSchema.index({ status: 1, createdAt: -1 });
notificationSchema.index({ type: 1, priority: 1 });
notificationSchema.index({ 'metadata.batchId': 1 });

const Notification = model('Notification', notificationSchema);
export default Notification;
