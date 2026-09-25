/**
 * COURSETO - Authentication Service
 * Manages user registration, login, session persistence in localStorage,
 * and page access protection.
 */

const STORAGE_KEYS = {
  USERS: 'courseto_users',
  CURRENT_USER: 'courseto_current_user',
  REMEMBER_EMAIL: 'courseto_remember_email'
};

const AuthService = {
  /**
   * Retrieve all registered users from localStorage
   * @returns {Array} List of user objects
   */
  getUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return [];
    }
  },

  /**
   * Find a user by their email (case-insensitive)
   * @param {string} email 
   * @returns {object|null}
   */
  findUserByEmail(email) {
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase()) || null;
  },

  /**
   * Register a new user account
   * @param {Object} userData 
   * @returns {{ success: boolean, message: string }}
   */
  register({ nickname, fullName, email, password }) {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedNick = nickname.trim();
    const trimmedFullName = fullName.trim();

    // Check duplicate email
    if (this.findUserByEmail(trimmedEmail)) {
      return {
        success: false,
        field: 'email',
        message: 'An account with this email already exists.'
      };
    }

    const newUser = {
      id: 'user_' + Date.now(),
      nickname: trimmedNick,
      fullName: trimmedFullName,
      email: trimmedEmail,
      password: password, // In production this would be hashed
      registeredAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(newUser);

    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return { success: true, message: 'Account created successfully. Please sign in.' };
    } catch (e) {
      console.error('Failed to save account:', e);
      return { success: false, message: 'Storage error. Could not create account.' };
    }
  },

  /**
   * Validate and perform user login
   * @param {string} email 
   * @param {string} password 
   * @param {boolean} rememberMe 
   * @returns {{ success: boolean, message?: string, user?: object }}
   */
  login(email, password, rememberMe = false) {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const inputPassword = password || '';

    // If blank fields
    if (!trimmedEmail || !inputPassword) {
      return {
        success: false,
        message: 'Email/password is incorrect.',
        blankFields: {
          email: !trimmedEmail,
          password: !inputPassword
        }
      };
    }

    const user = this.findUserByEmail(trimmedEmail);

    // Verify account exists and password matches
    if (!user || user.password !== inputPassword) {
      return {
        success: false,
        message: 'Email/password is incorrect.'
      };
    }

    // Success: save user session
    const sessionUser = {
      id: user.id,
      nickname: user.nickname,
      fullName: user.fullName,
      email: user.email
    };

    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_EMAIL, trimmedEmail);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_EMAIL);
      }

      return { success: true, user: sessionUser };
    } catch (e) {
      console.error('Error saving session:', e);
      return { success: false, message: 'Failed to initiate session.' };
    }
  },

  /**
   * Get currently logged-in user
   * @returns {object|null}
   */
  getCurrentUser() {
    try {
      const sessionData = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (sessionData) return JSON.parse(sessionData);

      const localData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (localData) return JSON.parse(localData);

      return null;
    } catch (e) {
      console.error('Error reading current user:', e);
      return null;
    }
  },

  /**
   * Check if any user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Log out current user and redirect
   * @param {string} redirectUrl 
   */
  logout(redirectUrl = 'index.html') {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (e) {
      console.error('Error during logout:', e);
    }
    window.location.href = redirectUrl;
  },

  /**
   * Protect private pages: redirects to login if user is not authenticated
   * @param {string} redirectUrl 
   */
  requireAuth(redirectUrl = 'index.html') {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = redirectUrl;
      return null;
    }
    return user;
  },

  /**
   * Redirect away from auth pages if user is already logged in
   * @param {string} redirectUrl 
   */
  redirectIfAuthenticated(redirectUrl = 'dashboard.html') {
    const user = this.getCurrentUser();
    if (user) {
      window.location.href = redirectUrl;
    }
  },

  /**
   * Get remembered email if available
   * @returns {string}
   */
  getRememberedEmail() {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_EMAIL) || '';
  }
};

window.AuthService = AuthService;
