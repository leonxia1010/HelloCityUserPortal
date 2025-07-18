// Email validation rule
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Strong password rule: includes upper, lower, number, special character
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;
  return passwordRegex.test(password);
};

// Get default placeholder based on field type
export const getDefaultPlaceholder = (type: string): string => {
  switch (type) {
    case 'email':
      return 'Please enter your email';
    case 'password':
      return 'Please enter your password';
    case 'repeatpassword':
      return 'Please repeat your password';
    case 'name':
      return 'Please enter your name';
    case 'phone':
      return 'Please enter your phone number';
    default:
      return 'Please enter value';
  }
};

// Get input HTML type based on field
export const getInputType = (type: string): 'text' | 'email' | 'password' | 'tel' => {
  switch (type) {
    case 'email':
      return 'email';
    case 'password':
    case 'repeatpassword':
      return 'password';
    case 'phone':
      return 'tel';
    default:
      return 'text';
  }
};

// Field-specific validation logic
export const validationRules: Record<string, {
  validate: (value: string, isRepeat?: boolean) => boolean;
  error: string;
}> = {
  name: {
    validate: (v) => v.trim() !== '' && /^[a-zA-Z\s]+$/.test(v),
    error: 'Only letters are allowed and name is required.',
  },
  email: {
    validate: isValidEmail,
    error: 'Please enter a valid email address.',
  },
  password: {
    validate: isStrongPassword,
    error: 'Password must be 6-20 characters with uppercase, lowercase, number, and special character.',
  },
  repeatpassword: {
    validate: (v) => {
      const origin = (document.querySelector('input[name="password"]') as HTMLInputElement)?.value || '';
      return v === origin;
    },
    error: 'Passwords do not match.',
  },
  phone: {
    validate: (v) => /^\d+$/.test(v),
    error: 'Only numbers are allowed.',
  },
};
