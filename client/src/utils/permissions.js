import { permissions, rolePermissions } from '../config/permissions.js';

class PermissionUtils {
  static hasPermission(user, permission) {
    if (!user || !user.role) return false;
    if (user.role === 'superadmin') return true;
    if (user.permissions && user.permissions.includes(permission)) {
      return true;
    }
    const rolePerms = rolePermissions[user.role] || [];
    return rolePerms.includes(permission);
  }

  static canEditCase(user, caseData) {
    if (!user || !caseData) return false;
    if (this.hasPermission(user, permissions.CASE_PERMISSIONS.EDIT_OWN_CASE) && 
        caseData.createdBy.toString() === user._id.toString()) {
      return true;
    }
    return this.hasPermission(user, permissions.CASE_PERMISSIONS.EDIT_ANY_CASE);
  }

  static canViewCase(user, caseData) {
    if (!caseData) return false;
    if (caseData.visibility === 'public') return true;
    if (caseData.visibility === 'private') {
      if (!user) return false;
      return caseData.createdBy.toString() === user._id.toString() ||
             this.hasPermission(user, permissions.CASE_PERMISSIONS.VIEW_PRIVATE_CASES);
    }
    if (caseData.visibility === 'law_enforcement_only') {
      return user && (user.role === 'admin' || user.role === 'superadmin');
    }
    return false;
  }

  static canModerateSighting(user) {
    return this.hasPermission(user, permissions.SIGHTING_PERMISSIONS.MODERATE_SIGHTINGS);
  }

  static canSendNotifications(user, notificationType = 'standard') {
    if (notificationType === 'emergency') {
      return this.hasPermission(user, permissions.NOTIFICATION_PERMISSIONS.SEND_EMERGENCY_ALERTS);
    }
    return this.hasPermission(user, permissions.NOTIFICATION_PERMISSIONS.SEND_NOTIFICATIONS);
  }

  static getMaxSearchRadius(user) {
    if (!user) return 25;
    const radiusLimits = {
      family: 50,
      volunteer: 100,
      moderator: 200,
      admin: 500,
      superadmin: 1000
    };
    return radiusLimits[user.role] || 25;
  }

  static canManageUsers(user) {
    return this.hasPermission(user, permissions.USER_PERMISSIONS.MANAGE_USERS);
  }

  static canAccessAdminPanel(user) {
    return this.hasPermission(user, permissions.SYSTEM_PERMISSIONS.ACCESS_ADMIN_PANEL);
  }

  static getUserPermissions(user) {
    if (!user || !user.role) return [];
    const rolePerms = rolePermissions[user.role] || [];
    const userPerms = user.permissions || [];
    return [...new Set([...rolePerms, ...userPerms])];
  }

  static canPerformBulkOperations(user) {
    return user && (user.role === 'admin' || user.role === 'superadmin');
  }
}

export default PermissionUtils;
