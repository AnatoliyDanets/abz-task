export const Error = {
  errorName(short, long, pattern) {
    if (short) {
      return "Min 2 letters";
    } else if (long) {
      return "Max 60 letters";
    } else if (pattern) {
      return "Only letters";
    }
  },
  errorEmail(short, long, pattern) {
    if (short) {
      return "Min 2 letters";
    } else if (long) {
      return "Max 100 letters";
    } else if (pattern) {
      return "Example: jhon@mail.com";
    }
  },
  errorPhone(pattern) {
    if (pattern) {
      return "Example:+380671234567";
    }
  },
};
