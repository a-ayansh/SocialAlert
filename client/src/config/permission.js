const permissions = {
  // Case Management Permissions
  CASE_PERMISSIONS: {
    CREATE_CASE: 'create_case',
    EDIT_OWN_CASE: 'edit_own_case',
    EDIT_ANY_CASE: 'edit_any_case',
    DELETE_CASE: 'delete_case',
    VIEW_PRIVATE_CASES: 'view_private_cases',
    MANAGE_CASE_STATUS: 'manage_case_status',
    ASSIGN_CASES: 'assign_cases'
  },

  // Sighting Management Permissions
  SIGHTING_PERMISSIONS: {
    MODERATE_SIGHTINGS: 'moderate_sightings',
    VERIFY_SIGHTINGS: 'verify_sightings',
    DELETE_SIGHTINGS: 'delete_sightings',
    VIEW_REPORTER_INFO: 'view_reporter_info'
  },

  // User Management Permissions
  USER_PERMISSIONS: {
    MANAGE_USERS: 'manage_users',
    VIEW_USER_DETAILS: 'view_user_details',
    CHANGE_USER_ROLES: 'change_user_roles',
    SUSPEND_USERS: 'suspend_users'
  },

  // Notification Permissions
  NOTIFICATION_PERMISSIONS: {
    SEND_NOTIFICATIONS: 'send_notifications',
    SEND_EMERGENCY_ALERTS: 'send_emergency_alerts',
    MANAGE_NOTIFICATION_SETTINGS: 'manage_notification_settings'
  },

  // System Permissions
  SYSTEM_PERMISSIONS: {
    ACCESS_ADMIN_PANEL: 'access_admin_panel',
    MANAGE_PERMISSIONS: 'manage_permissions',
    VIEW_SYSTEM_LOGS: 'view_system_logs',
    SYSTEM_CONFIGURATION: 'system_configuration'
  }
};

// Role-based permission mapping
const rolePermissions = {
  family: [
    permissions.CASE_PERMISSIONS.CREATE_CASE,
    permissions.CASE_PERMISSIONS.EDIT_OWN_CASE
  ],

  volunteer: [
    permissions.CASE_PERMISSIONS.CREATE_CASE,
    permissions.CASE_PERMISSIONS.EDIT_OWN_CASE,
    permissions.SIGHTING_PERMISSIONS.VIEW_REPORTER_INFO
  ],

  moderator: [
    ...rolePermissions.volunteer,
    permissions.CASE_PERMISSIONS.EDIT_ANY_CASE,
    permissions.CASE_PERMISSIONS.VIEW_PRIVATE_CASES,
    permissions.SIGHTING_PERMISSIONS.MODERATE_SIGHTINGS,
    permissions.SIGHTING_PERMISSIONS.VERIFY_SIGHTINGS,
    permissions.NOTIFICATION_PERMISSIONS.SEND_NOTIFICATIONS
  ],

  admin: [
    ...rolePermissions.moderator,
    permissions.CASE_PERMISSIONS.DELETE_CASE,
    permissions.CASE_PERMISSIONS.MANAGE_CASE_STATUS,
    permissions.CASE_PERMISSIONS.ASSIGN_CASES,
    permissions.SIGHTING_PERMISSIONS.DELETE_SIGHTINGS,
    permissions.USER_PERMISSIONS.MANAGE_USERS,
    permissions.USER_PERMISSIONS.VIEW_USER_DETAILS,
    permissions.USER_PERMISSIONS.SUSPEND_USERS,
    permissions.NOTIFICATION_PERMISSIONS.SEND_EMERGENCY_ALERTS,
    permissions.NOTIFICATION_PERMISSIONS.MANAGE_NOTIFICATION_SETTINGS,
    permissions.SYSTEM_PERMISSIONS.ACCESS_ADMIN_PANEL,
    permissions.SYSTEM_PERMISSIONS.VIEW_SYSTEM_LOGS
  ],

  superadmin: [
    ...rolePermissions.admin,
    permissions.USER_PERMISSIONS.CHANGE_USER_ROLES,
    permissions.SYSTEM_PERMISSIONS.MANAGE_PERMISSIONS,
    permissions.SYSTEM_PERMISSIONS.SYSTEM_CONFIGURATION
  ]
};

module.exports = {
  permissions,
  rolePermissions
};