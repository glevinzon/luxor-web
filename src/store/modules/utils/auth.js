export const getToken = (state) => {
  const tokenData = state.auth.token
  return tokenData && tokenData.token
}

export const getUser = (state) => (state.auth.user)
