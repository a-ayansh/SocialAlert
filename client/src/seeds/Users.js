import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@missingalert.com',
    phone: '+1234567890',
    password: 'SuperAdmin123!',
    role: 'superadmin',
    permissions: [
      'create_case', 'edit_own_case', 'edit_any_case', 'delete_case',
      'view_private_cases', 'moderate_sightings', 'manage_users',
      'send_notifications', 'access_admin_panel', 'manage_permissions'
    ],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749]
    },
    address: {
      street: '123 Admin Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94102',
      formatted: '123 Admin Street, San Francisco, CA 94102, USA'
    },
    locationRadius: 50,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        emergencyOnly: false
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(),
    loginCount: 25,
    casesCreated: 0,
    sightingsReported: 0,
    bio: 'System administrator for the Missing Alert Platform.',
    avatar: {
      url: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/admin.jpg',
      publicId: 'avatars/admin'
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1555123456',
    password: 'Family123!',
    role: 'family',
    permissions: ['create_case', 'edit_own_case'],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-118.2437, 34.0522]
    },
    address: {
      street: '456 Maple Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90210',
      formatted: '456 Maple Avenue, Los Angeles, CA 90210, USA'
    },
    locationRadius: 25,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        emergencyOnly: true
      },
      push: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    loginCount: 15,
    casesCreated: 1,
    sightingsReported: 0,
    bio: 'Mother of Emily Johnson. Please help us find our daughter.',
    socialMedia: {
      facebook: 'https://facebook.com/sarah.johnson'
    }
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1555234567',
    password: 'Volunteer123!',
    role: 'volunteer',
    permissions: ['create_case', 'edit_own_case'],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-118.2500, 34.0600]
    },
    address: {
      street: '789 Oak Street',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
      zipCode: '90210',
      formatted: '789 Oak Street, Beverly Hills, CA 90210, USA'
    },
    locationRadius: 30,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true,
        marketing: true
      },
      sms: {
        enabled: false,
        newCases: false,
        caseUpdates: false,
        emergencyOnly: true
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: false,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    loginCount: 45,
    casesCreated: 0,
    sightingsReported: 3,
    bio: 'Community volunteer dedicated to helping find missing persons and pets.',
    avatar: {
      url: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/volunteer1.jpg',
      publicId: 'avatars/volunteer1'
    }
  },
  {
    firstName: 'Lisa',
    lastName: 'Rodriguez',
    email: 'lisa.rodriguez@missingalert.com',
    phone: '+1555345678',
    password: 'Moderator123!',
    role: 'moderator',
    permissions: [
      'create_case', 'edit_own_case', 'edit_any_case',
      'view_private_cases', 'moderate_sightings', 'send_notifications'
    ],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-87.6298, 41.8781]
    },
    address: {
      street: '321 Pine Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
      formatted: '321 Pine Street, Chicago, IL 60601, USA'
    },
    locationRadius: 40,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        emergencyOnly: false
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(),
    loginCount: 67,
    casesCreated: 2,
    sightingsReported: 8,
    bio: 'Platform moderator with 5 years of experience in missing person cases.'
  },
  {
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '+1555456789',
    password: 'PetOwner123!',
    role: 'family',
    permissions: ['create_case', 'edit_own_case'],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-73.9857, 40.7484]
    },
    address: {
      street: '654 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10012',
      formatted: '654 Broadway, New York, NY 10012, USA'
    },
    locationRadius: 15,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        emergencyOnly: true
      },
      push: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
    loginCount: 12,
    casesCreated: 1,
    sightingsReported: 1,
    bio: 'Looking for my beloved dog Max. He means everything to me.'
  },
  {
    firstName: 'Jennifer',
    lastName: 'Williams',
    email: 'jennifer.williams@missingalert.com',
    phone: '+1555567890',
    password: 'Admin123!',
    role: 'admin',
    permissions: [
      'create_case', 'edit_own_case', 'edit_any_case', 'delete_case',
      'view_private_cases', 'moderate_sightings', 'manage_users',
      'send_notifications', 'access_admin_panel'
    ],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-95.3698, 29.7604]
    },
    address: {
      street: '987 Cedar Lane',
      city: 'Houston',
      state: 'TX',
      country: 'USA',
      zipCode: '77002',
      formatted: '987 Cedar Lane, Houston, TX 77002, USA'
    },
    locationRadius: 35,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        emergencyOnly: false
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
    loginCount: 89,
    casesCreated: 5,
    sightingsReported: 12,
    bio: 'Platform administrator specializing in case management and user support.'
  },
  {
    firstName: 'Robert',
    lastName: 'Davis',
    email: 'robert.davis@email.com',
    phone: '+1555678901',
    password: 'Volunteer456!',
    role: 'volunteer',
    permissions: ['create_case', 'edit_own_case'],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-122.3321, 47.6062]
    },
    address: {
      street: '147 Elm Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      zipCode: '98101',
      formatted: '147 Elm Street, Seattle, WA 98101, USA'
    },
    locationRadius: 20,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: false,
        sightingReports: true,
        marketing: false
      },
      sms: {
        enabled: false,
        newCases: false,
        caseUpdates: false,
        emergencyOnly: true
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: false,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
    loginCount: 23,
    casesCreated: 0,
    sightingsReported: 5,
    bio: 'Retired police officer volunteering to help find missing persons.'
  },
  {
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.garcia@email.com',
    phone: '+1555789012',
    password: 'Volunteer789!',
    role: 'volunteer',
    permissions: ['create_case', 'edit_own_case'],
    isActive: true,
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [-80.1918, 25.7617]
    },
    address: {
      street: '258 Palm Avenue',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33101',
      formatted: '258 Palm Avenue, Miami, FL 33101, USA'
    },
    locationRadius: 25,
    notificationPreferences: {
      email: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true,
        marketing: true
      },
      sms: {
        enabled: true,
        newCases: false,
        caseUpdates: true,
        emergencyOnly: true
      },
      push: {
        enabled: true,
        newCases: true,
        caseUpdates: true,
        sightingReports: true
      }
    },
    lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
    loginCount: 31,
    casesCreated: 1,
    sightingsReported: 7,
    bio: 'Social worker passionate about community safety and helping families.'
  }
];

export default users;
