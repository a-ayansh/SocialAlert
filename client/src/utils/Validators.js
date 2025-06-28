import validator from 'validator';
import mongoose from 'mongoose';

class Validators {
  static isValidEmail(email) {
    return validator.isEmail(email);
  }

  static isValidPhone(phone) {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
  }

  static isValidPassword(password) {
    return password.length >= 8 && 
           /[A-Za-z]/.test(password) && 
           /\d/.test(password);
  }

  static isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  static isValidCoordinates(coordinates) {
    return Array.isArray(coordinates) && 
           coordinates.length === 2 && 
           typeof coordinates[0] === 'number' && 
           typeof coordinates[1] === 'number' &&
           coordinates[0] >= -180 && coordinates[0] <= 180 && 
           coordinates[1] >= -90 && coordinates[1] <= 90;
  }

  static isValidURL(url) {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true
    });
  }

  static isValidCaseNumber(caseNumber) {
    return /^(MP|PET)-\d{4}-\d{6}$/.test(caseNumber);
  }

  static isValidDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end && start <= new Date();
  }

  static isValidImageType(mimetype) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return allowedTypes.includes(mimetype);
  }

  static isValidRadius(radius, maxRadius = 500) {
    return typeof radius === 'number' && 
           radius > 0 && 
           radius <= maxRadius;
  }

  static sanitizeText(text, maxLength = 1000) {
    if (typeof text !== 'string') return '';
    return validator.escape(text.trim()).substring(0, maxLength);
  }

  static isValidEmergencyContact(contact) {
    return contact.name && 
           contact.phone && 
           this.isValidPhone(contact.phone) &&
           (contact.email ? this.isValidEmail(contact.email) : true);
  }
}

export default Validators;
