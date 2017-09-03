export default (store) => ({
  path: '/password/change',
  onEnter (nextState, replace) {
    const { auth } = store.getState()
    if (auth.get('user') && auth.get('accessToken')) {
      const redirect = nextState.location.query.redirect || '/dashboard'
      replace(redirect)
    }
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const ResetPasswordContainer = require('./containers/ResetPasswordContainer').default
      cb(null, { component: ResetPasswordContainer })
    }, 'password/change')
  }
})
