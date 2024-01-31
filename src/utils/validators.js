const Validate = {
  username: {
    minLength: (value) => {
      if (value.length < 5) {
        return "Username must be at least 5 characters long";
      }
      return true;
    },
    maxLength: (value) => {
      if (value.length > 30) {
        return "Username must not exceed 30 characters";
      }
      return true;
    },
    endsWith: (value) => {
      if (/\.$/.test(value)) {
        return "Username must not end with a dot";
      }
      return true;
    },
    consecutiveDots: (value) => {
      if (/\.\./.test(value)) {
        return "Username must not have consecutive dots";
      }
      return true;
    },
    startsWithAlphanumeric: (value) => {
      if (!/^[^\W]/.test(value)) {
        return "Username must start with an alphanumeric character.";
      }
      return true;
    },
    validCharacters: (value) => {
      if (!/^[^\W][\w.]*$/.test(value)) {
        return "Username can only contain alphanumeric characters and underscores.";
      }
      return true;
    },
  },
  password: {
    minLength: (value) => {
      if (value.length < 8) {
        return "Password must be at least 8 characters long";
      }
      return true;
    },
    uppercase: (value) => {
      if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
      }
      return true;
    },
    lowercase: (value) => {
      if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
      }
      return true;
    },
    number: (value) => {
      if (!/\d/.test(value)) {
        return "Password must contain at least one number";
      }
      return true;
    },
  },
};

export default Validate;
