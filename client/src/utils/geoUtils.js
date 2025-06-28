import geoConfig from '../config/geoConfig.js';

class GeoUtils {
  static validateCoordinates(coordinates) {
    return geoConfig.validateGeoJSON.Point(coordinates);
  }

  static calculateDistance(point1, point2) {
    const [lon1, lat1] = point1;
    const [lon2, lat2] = point2;
    return geoConfig.utils.calculateDistance(lat1, lon1, lat2, lon2);
  }

  static createPoint(longitude, latitude) {
    if (!this.validateCoordinates([longitude, latitude])) {
      throw new Error('Invalid coordinates');
    }
    return geoConfig.utils.createGeoJSONPoint(longitude, latitude);
  }

  static getUsersWithinRadius(longitude, latitude, radiusKm) {
    return geoConfig.queries.usersWithinRadius(longitude, latitude, radiusKm);
  }

  static getCasesWithinRadius(longitude, latitude, radiusKm) {
    return geoConfig.queries.casesWithinRadius(longitude, latitude, radiusKm);
  }

  static getSearchRadius(caseType, subjectAge, petSpecies = null, defaultRadius = null) {
    if (defaultRadius) return defaultRadius;
    if (caseType === 'missing_pet' && petSpecies) {
      return geoConfig.defaultRadiuses.missing_pet[petSpecies.toLowerCase()] || 
             geoConfig.defaultRadiuses.missing_pet.default;
    }
    return geoConfig.utils.getSearchRadius(caseType, subjectAge, defaultRadius);
  }

  static createCircularBounds(centerLong, centerLat, radiusKm) {
    return geoConfig.utils.createCircularBounds(centerLong, centerLat, radiusKm);
  }

  static isWithinRadius(point1, point2, radiusKm) {
    const distance = this.calculateDistance(point1, point2);
    return distance <= radiusKm;
  }

  static getNotificationPriority(locationTags = []) {
    const highPriorityAreas = geoConfig.emergencyZones.highPriority;
    const lawEnforcementAreas = geoConfig.emergencyZones.lawEnforcementRequired;

    const isHighPriority = locationTags.some(tag => 
      highPriorityAreas.includes(tag.toLowerCase())
    );

    const requiresLawEnforcement = locationTags.some(tag => 
      lawEnforcementAreas.includes(tag.toLowerCase())
    );

    return {
      isHighPriority,
      requiresLawEnforcement,
      priority: isHighPriority ? 'high' : 'medium'
    };
  }

  static validateUserRadius(userRole, requestedRadius) {
    return geoConfig.utils.validateUserRadius(userRole, requestedRadius);
  }

  static generateGeofenceQuery(caseLocation, searchRadius) {
    const [longitude, latitude] = caseLocation.coordinates;
    return geoConfig.queries.usersWithinRadius(longitude, latitude, searchRadius);
  }
}

export default GeoUtils;
