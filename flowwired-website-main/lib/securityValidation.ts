// Minimal server-side validation inspired by WTForms

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function validateRegisterInput(data: {
    email?: string;
    password?: string;
    name?: string;
  }): string | null {
    if (!data.email || !isValidEmail(data.email)) {
      return "Invalid email address";
    }
  
    if (!data.password || data.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
  
    if (data.name && data.name.length < 2) {
      return "Name must be at least 2 characters long";
    }
  
    return null;
  }
  
  export function validateLoginInput(data: {
    email?: string;
    password?: string;
  }): string | null {
    if (!data.email || !isValidEmail(data.email)) {
      return "Invalid email address";
    }
  
    if (!data.password) {
      return "Password is required";
    }
  
    return null;
  }
  