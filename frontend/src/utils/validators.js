export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || error?.message || fallback;
};
