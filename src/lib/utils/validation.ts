/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  readonly isValid: boolean;
  readonly errors: readonly string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate checklist item name
 */
export function validateChecklistItemName(name: string): {
  readonly isValid: boolean;
  readonly error?: string;
} {
  if (!name.trim()) {
    return {
      isValid: false,
      error: 'Item name is required',
    };
  }

  if (name.trim().length > 100) {
    return {
      isValid: false,
      error: 'Item name must be 100 characters or less',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validate checklist title
 */
export function validateChecklistTitle(title: string): {
  readonly isValid: boolean;
  readonly error?: string;
} {
  if (!title.trim()) {
    return {
      isValid: false,
      error: 'Checklist title is required',
    };
  }

  if (title.trim().length > 50) {
    return {
      isValid: false,
      error: 'Checklist title must be 50 characters or less',
    };
  }

  return {
    isValid: true,
  };
}
