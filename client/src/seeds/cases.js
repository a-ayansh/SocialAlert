import { ObjectId } from 'mongoose';

const cases = [
  // Full content of all six cases in ES module format without comments
  // Due to space constraints, only a portion is displayed here. Full code continues below.

  {
    title: 'Missing 8-Year-Old Girl - Emily Johnson',
    type: 'missing_person',
    status: 'active',
    priority: 'critical',
    subject: {
      name: 'Emily Johnson',
      age: 8,
      gender: 'female',
      description: 'Emily is an 8-year-old girl with blonde hair and blue eyes. She was last seen wearing a pink t-shirt with a unicorn design, blue jeans, and white sneakers. She is approximately 4 feet tall and weighs about 60 pounds. Emily is shy around strangers but very friendly once she gets to know someone.',
      physicalCharacteristics: {
        height: "4'0\"",
        weight: '60 lbs',
        eyeColor: 'Blue',
        hairColor: 'Blonde',
        skinTone: 'Fair',
        distinguishingMarks: 'Small scar on left knee from bicycle accident',
        clothing: 'Pink unicorn t-shirt, blue jeans, white sneakers',
        medicalConditions: 'Mild asthma - carries inhaler'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-118.2437, 34.0522]
    },
    lastSeenAddress: {
      street: '456 Maple Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90210',
      formatted: '456 Maple Avenue, Los Angeles, CA 90210, USA'
    },
    searchRadius: 15,
    lastSeenDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    reportedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/emily_primary.jpg',
        publicId: 'missing/emily_primary',
        caption: 'Recent school photo of Emily',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/emily_full_body.jpg',
        publicId: 'missing/emily_full_body',
        caption: 'Full body photo showing clothing style',
        isPrimary: false,
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'Sarah Johnson',
        relationship: 'Mother',
        phone: '+1555123456',
        email: 'sarah.johnson@email.com',
        alternatePhone: '+1555123457'
      },
      emergencyContact: {
        name: 'Mark Johnson',
        phone: '+1555123458',
        email: 'mark.johnson@email.com'
      },
      lawEnforcement: {
        reportFiled: true,
        caseNumber: 'LAPD-2024-001234',
        department: 'Los Angeles Police Department',
        officerName: 'Officer Martinez',
        officerContact: '+1555999001'
      }
    },
    createdBy: new ObjectId(),
    visibility: 'public',
    tags: ['child', 'critical', 'amber_alert_eligible', 'los_angeles'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    socialMediaPosts: [
      {
        platform: 'facebook',
        postId: 'fb_post_12345',
        url: 'https://facebook.com/posts/12345',
        postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        status: 'posted'
      }
    ],
    stats: {
      views: 1247,
      shares: 89,
      sightingsReceived: 3,
      verifiedSightings: 1
    },
    updates: [
      {
        content: 'Emily was last seen at Maple Elementary School playground around 3:30 PM. She was playing with friends after school.',
        author: new ObjectId(),
        isPublic: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000)
      },
      {
        content: 'Search teams have covered the immediate neighborhood. Expanding search radius to nearby parks.',
        author: new ObjectId(),
        isPublic: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]
  },

  // Missing Pet Case - Dog
  {
    title: 'Missing Golden Retriever - Max',
    type: 'missing_pet',
    status: 'active',
    priority: 'high',
    subject: {
      name: 'Max',
      age: 3,
      gender: 'male',
      description: 'Max is a 3-year-old Golden Retriever with a friendly and gentle temperament. He loves people and other dogs. Max is very well-trained and responds to his name. He was wearing a blue collar with tags when he went missing.',
      petDetails: {
        species: 'Dog',
        breed: 'Golden Retriever',
        color: 'Golden/Cream',
        size: 'Large',
        microchipped: true,
        chipId: 'ABC123456789',
        collar: 'Blue nylon collar with metal tags'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-73.9857, 40.7484] // New York
    },
    lastSeenAddress: {
      street: '654 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10012',
      formatted: '654 Broadway, New York, NY 10012, USA'
    },
    searchRadius: 5,
    lastSeenDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    reportedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 1 day ago + 1 hour
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/max_primary.jpg',
        publicId: 'missing/max_primary',
        caption: 'Max in his favorite park',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/max_collar.jpg',
        publicId: 'missing/max_collar',
        caption: 'Close-up of Max wearing his blue collar',
        isPrimary: false,
        uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'David Thompson',
        relationship: 'Owner',
        phone: '+1555456789',
        email: 'david.thompson@email.com'
      }
    },
    createdBy: new ObjectId(), // Will be assigned during seeding
    visibility: 'public',
    tags: ['dog', 'golden_retriever', 'microchipped', 'friendly', 'new_york'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    stats: {
      views: 456,
      shares: 32,
      sightingsReceived: 2,
      verifiedSightings: 0
    },
    updates: [
      {
        content: 'Max escaped from the backyard during a thunderstorm. He is likely scared and hiding.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000)
      }
    ]
  },

  // Missing Person Case - Adult
  {
    title: 'Missing Adult - Robert Miller (Alzheimer\'s)',
    type: 'missing_person',
    status: 'active',
    priority: 'high',
    subject: {
      name: 'Robert Miller',
      age: 72,
      gender: 'male',
      description: 'Robert is a 72-year-old man with Alzheimer\'s disease. He may appear confused and disoriented. He was last seen wearing a red plaid shirt, khaki pants, and brown walking shoes. Robert is generally friendly but may not remember his name or address.',
      physicalCharacteristics: {
        height: '5\'8"',
        weight: '165 lbs',
        eyeColor: 'Brown',
        hairColor: 'Gray/White',
        skinTone: 'Fair',
        distinguishingMarks: 'Scar on forehead from childhood accident',
        clothing: 'Red plaid shirt, khaki pants, brown walking shoes',
        medicalConditions: 'Alzheimer\'s disease, takes medication for blood pressure'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-87.6298, 41.8781] // Chicago
    },
    lastSeenAddress: {
      street: '321 Pine Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
      formatted: '321 Pine Street, Chicago, IL 60601, USA'
    },
    searchRadius: 8,
    lastSeenDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    reportedDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/robert_primary.jpg',
        publicId: 'missing/robert_primary',
        caption: 'Recent photo of Robert',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'Margaret Miller',
        relationship: 'Daughter',
        phone: '+1555789123',
        email: 'margaret.miller@email.com'
      },
      lawEnforcement: {
        reportFiled: true,
        caseNumber: 'CPD-2024-005678',
        department: 'Chicago Police Department',
        officerName: 'Officer Johnson',
        officerContact: '+1555999002'
      }
    },
    createdBy: new ObjectId(), // Will be assigned during seeding
    visibility: 'public',
    tags: ['elderly', 'alzheimers', 'medical_condition', 'urgent', 'chicago'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 3 * 60 * 60 * 1000),
    stats: {
      views: 287,
      shares: 45,
      sightingsReceived: 1,
      verifiedSightings: 0
    },
    updates: [
      {
        content: 'Robert was last seen walking east on Pine Street around 9 AM. Family is very concerned due to his condition.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
      }
    ]
  },

  // Found Case - Pet
  {
    title: 'FOUND - Tabby Cat "Whiskers"',
    type: 'missing_pet',
    status: 'found',
    priority: 'medium',
    subject: {
      name: 'Whiskers',
      age: 2,
      gender: 'female',
      description: 'Whiskers is a 2-year-old tabby cat with distinctive white paws and chest. She is very friendly and loves to be petted. She was wearing a pink collar when she went missing.',
      petDetails: {
        species: 'Cat',
        breed: 'Domestic Shorthair',
        color: 'Brown Tabby with White',
        size: 'Medium',
        microchipped: false,
        collar: 'Pink collar with bell'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-122.3321, 47.6062] // Seattle
    },
    lastSeenAddress: {
      street: '147 Elm Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      zipCode: '98101',
      formatted: '147 Elm Street, Seattle, WA 98101, USA'
    },
    searchRadius: 3,
    lastSeenDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    reportedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    foundDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Found 1 day ago
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/whiskers_primary.jpg',
        publicId: 'missing/whiskers_primary',
        caption: 'Whiskers sunbathing by the window',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'Emma Wilson',
        relationship: 'Owner',
        phone: '+1555321654',
        email: 'emma.wilson@email.com'
      }
    },
    createdBy: new ObjectId(), // Will be assigned during seeding
    visibility: 'public',
    tags: ['cat', 'tabby', 'found', 'seattle'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    stats: {
      views: 234,
      shares: 18,
      sightingsReceived: 4,
      verifiedSightings: 1
    },
    updates: [
      {
        content: 'Whiskers was found safe and sound in a neighbor\'s garage. She was scared but unharmed.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    resolution: {
      status: 'returned_home',
      description: 'Whiskers was found hiding in a neighbor\'s garage about 3 blocks from home. She was scared but in good health.',
      location: {
        type: 'Point',
        coordinates: [-122.3305, 47.6075]
      },
      resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  },

  // Missing Person Case - Teenager
  {
    title: 'Missing Teenager - Jake Rodriguez',
    type: 'missing_person',
    status: 'active',
    priority: 'high',
    subject: {
      name: 'Jake Rodriguez',
      age: 16,
      gender: 'male',
      description: 'Jake is a 16-year-old high school student. He was last seen wearing a black hoodie with "Skate or Die" text, dark jeans, and red high-top sneakers. Jake has been going through a difficult time lately and may be intentionally avoiding contact.',
      physicalCharacteristics: {
        height: '5\'10"',
        weight: '150 lbs',
        eyeColor: 'Brown',
        hairColor: 'Black',
        skinTone: 'Hispanic/Latino',
        distinguishingMarks: 'Small tattoo of a skateboard on left wrist',
        clothing: 'Black "Skate or Die" hoodie, dark jeans, red high-top sneakers',
        medicalConditions: 'Takes medication for ADHD'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-104.9903, 39.7392] // Denver
    },
    lastSeenAddress: {
      street: '891 Cedar Drive',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      zipCode: '80202',
      formatted: '891 Cedar Drive, Denver, CO 80202, USA'
    },
    searchRadius: 20,
    lastSeenDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    reportedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/jake_primary.jpg',
        publicId: 'missing/jake_primary',
        caption: 'Jake\'s most recent school photo',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/jake_skateboard.jpg',
        publicId: 'missing/jake_skateboard',
        caption: 'Jake with his skateboard at the local skate park',
        isPrimary: false,
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'Maria Rodriguez',
        relationship: 'Mother',
        phone: '+1555987654',
        email: 'maria.rodriguez@email.com'
      },
      emergencyContact: {
        name: 'Carlos Rodriguez',
        phone: '+1555987655',
        email: 'carlos.rodriguez@email.com'
      },
      lawEnforcement: {
        reportFiled: true,
        caseNumber: 'DPD-2024-009876',
        department: 'Denver Police Department',
        officerName: 'Detective Smith',
        officerContact: '+1555999003'
      }
    },
    createdBy: new ObjectId(), // Will be assigned during seeding
    visibility: 'public',
    tags: ['teenager', 'runaway_risk', 'skateboard', 'denver', 'adhd'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
    socialMediaPosts: [
      {
        platform: 'instagram',
        postId: 'ig_post_67890',
        url: 'https://instagram.com/p/67890',
        postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        status: 'posted'
      }
    ],
    stats: {
      views: 567,
      shares: 43,
      sightingsReceived: 2,
      verifiedSightings: 0
    },
    updates: [
      {
        content: 'Jake left home after an argument with his parents. He may be staying with friends or at the local skate park.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000)
      },
      {
        content: 'Police have checked with known friends and regular hangout spots. Expanding search to nearby cities.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]
  },

  // Missing Pet Case - Cat
  {
    title: 'Missing Indoor Cat - Princess',
    type: 'missing_pet',
    status: 'active',
    priority: 'medium',
    subject: {
      name: 'Princess',
      age: 5,
      gender: 'female',
      description: 'Princess is a 5-year-old Persian cat who has never been outside before. She is completely white with blue eyes and very fluffy fur. She is extremely timid and will likely hide if approached by strangers.',
      petDetails: {
        species: 'Cat',
        breed: 'Persian',
        color: 'Pure White',
        size: 'Medium',
        microchipped: true,
        chipId: 'DEF987654321',
        collar: 'Purple velvet collar with rhinestones'
      }
    },
    lastSeenLocation: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749] // San Francisco
    },
    lastSeenAddress: {
      street: '123 Victorian Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94110',
      formatted: '123 Victorian Street, San Francisco, CA 94110, USA'
    },
    searchRadius: 2, // Indoor cats typically don't go far
    lastSeenDate: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    reportedDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    images: [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/princess_primary.jpg',
        publicId: 'missing/princess_primary',
        caption: 'Princess in her favorite sunny spot',
        isPrimary: true,
        uploadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/v1/missing/princess_collar.jpg',
        publicId: 'missing/princess_collar',
        caption: 'Close-up showing Princess\'s distinctive collar',
        isPrimary: false,
        uploadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ],
    contactInfo: {
      primaryContact: {
        name: 'Jennifer Chen',
        relationship: 'Owner',
        phone: '+1555147258',
        email: 'jennifer.chen@email.com'
      }
    },
    createdBy: new ObjectId(), // Will be assigned during seeding
    visibility: 'public',
    tags: ['cat', 'persian', 'indoor_cat', 'timid', 'microchipped', 'san_francisco'],
    alertSent: true,
    alertSentAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalAlertsSent: 1,
    lastAlertSent: new Date(Date.now() - 5 * 60 * 60 * 1000),
    stats: {
      views: 189,
      shares: 24,
      sightingsReceived: 1,
      verifiedSightings: 0
    },
    updates: [
      {
        content: 'Princess escaped when a delivery person left the front door open. She has never been outside and is likely very scared.',
        author: new ObjectId(), // Will be assigned during seeding
        isPublic: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      }
    ]
  }
];

export default cases;