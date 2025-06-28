const geoConfig = {
  defaultRadiuses: {
    missing_person: {
      child: 5,
      adult: 25,
      elderly: 10,
      default: 15
    },
    missing_pet: {
      cat: 2,
      dog: 10,
      other: 5,
      default: 5
    }
  },

  maxRadius: {
    volunteer: 100,
    moderator: 200,
    admin: 500,
    default: 50
  },

  validateGeoJSON: {
    Point: (coordinates) => {
      return Array.isArray(coordinates) && 
             coordinates.length === 2 && 
             typeof coordinates[0] === 'number' && 
             typeof coordinates[1] === 'number' &&
             coordinates[0] >= -180 && coordinates[0] <= 180 &&
             coordinates[1] >= -90 && coordinates[1] <= 90;
    }
  },

  queries: {
    usersWithinRadius: (longitude, latitude, radiusKm) => ({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusKm * 1000
        }
      }
    }),

    casesWithinRadius: (longitude, latitude, radiusKm) => ({
      lastSeenLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusKm * 1000
        }
      }
    }),

    sightingsWithinRadius: (longitude, latitude, radiusKm) => ({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusKm * 1000
        }
      }
    }),

    casesInPolygon: (coordinates) => ({
      lastSeenLocation: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          }
        }
      }
    }),

    casesForUserNotification: (userLong, userLat, userRadius) => ({
      $and: [
        {
          lastSeenLocation: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [userLong, userLat]
              },
              $maxDistance: userRadius * 1000
            }
          }
        },
        { status: 'active' },
        { visibility: { $in: ['public'] } }
      ]
    })
  },

  aggregations: {
    caseDensityByRegion: (radiusKm = 10) => [
      {
        $match: {
          status: 'active',
          visibility: 'public'
        }
      },
      {
        $group: {
          _id: {
            $geoNear: {
              near: "$lastSeenLocation",
              distanceField: "distance",
              maxDistance: radiusKm * 1000,
              spherical: true
            }
          },
          count: { $sum: 1 },
          avgDistance: { $avg: "$distance" }
        }
      }
    ],

    userActivityByLocation: [
      {
        $lookup: {
          from: 'cases',
          localField: '_id',
          foreignField: 'createdBy',
          as: 'cases'
        }
      },
      {
        $lookup: {
          from: 'sightings',
          localField: '_id',
          foreignField: 'reportedBy',
          as: 'sightings'
        }
      },
      {
        $project: {
          location: 1,
          caseCount: { $size: '$cases' },
          sightingCount: { $size: '$sightings' },
          totalActivity: { $add: [{ $size: '$cases' }, { $size: '$sightings' }] }
        }
      }
    ]
  },

  utils: {
    calculateDistance: (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    },

    createGeoJSONPoint: (longitude, latitude) => ({
      type: 'Point',
      coordinates: [longitude, latitude]
    }),

    createCircularBounds: (centerLong, centerLat, radiusKm) => {
      const earthRadius = 6371;
      const lat = centerLat * Math.PI / 180;
      const lon = centerLong * Math.PI / 180;
      const d = radiusKm / earthRadius;
      const bounds = [];
      for (let i = 0; i <= 360; i += 10) {
        const bearing = i * Math.PI / 180;
        const lat2 = Math.asin(Math.sin(lat) * Math.cos(d) + 
                               Math.cos(lat) * Math.sin(d) * Math.cos(bearing));
        const lon2 = lon + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat),
                                      Math.cos(d) - Math.sin(lat) * Math.sin(lat2));
        bounds.push([lon2 * 180 / Math.PI, lat2 * 180 / Math.PI]);
      }
      return bounds;
    },

    getSearchRadius: (caseType, subjectAge, defaultRadius = null) => {
      if (defaultRadius) return defaultRadius;
      if (caseType === 'missing_person') {
        if (subjectAge <= 12) return geoConfig.defaultRadiuses.missing_person.child;
        if (subjectAge >= 65) return geoConfig.defaultRadiuses.missing_person.elderly;
        return geoConfig.defaultRadiuses.missing_person.adult;
      }
      return geoConfig.defaultRadiuses.missing_pet.default;
    },

    validateUserRadius: (userRole, requestedRadius) => {
      const maxAllowed = geoConfig.maxRadius[userRole] || geoConfig.maxRadius.default;
      return Math.min(requestedRadius, maxAllowed);
    }
  },

  emergencyZones: {
    highPriority: [
      'school', 'hospital', 'nursing_home', 'daycare', 
      'playground', 'park', 'transit_station'
    ],
    lawEnforcementRequired: [
      'border_crossing', 'airport', 'port', 'highway_rest_stop'
    ]
  }
};

export default geoConfig;
