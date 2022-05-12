export const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser === resourceUserId) return;

  throw new Error('Not authorized to access this route!');
};
