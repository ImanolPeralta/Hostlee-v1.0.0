export const generateUserErrorInfo = (user) => {
  return `
    Invalid or incomplete user fields:
      * first_name: expected string, got: ${user.first_name}
      * last_name: expected string, got: ${user.last_name}
      * email: expected string, got: ${user.email}
      * password: expected string, got: ${user.password}
  `;
};
