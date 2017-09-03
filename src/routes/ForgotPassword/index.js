export default (store) => ({
  path: '/password/forgot',
  onEnter (nextState, replace) {
    const { auth } = store.getState()
    if (auth.get('user') && auth.get('accessToken')) {
      const redirect = nextState.location.query.redirect || '/dashboard'
      replace(redirect)
    }
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const ForgotPasswordContainer = require('./containers/ForgotPasswordContainer').default
      cb(null, { component: ForgotPasswordContainer })
    }, 'password/forgot')
  }
})
