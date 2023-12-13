export const selectUserId = (store) => store.user.info?.id
export const selectLoading = (store) => store.user.loading
export const selectUserEmail = (store) => store.user.info?.email
export const selectUserSingUpDate = (store) => store.user.info?.signUpDate
export const selectUserErrors = (store) => store.user?.errors