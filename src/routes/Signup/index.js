export default (store) => ({
  path: '/signup',
  onEnter (nextState, replace) {
    const { auth } = store.getState()
    if (auth.get('user') && auth.get('accessToken')) {
      const redirect = nextState.location.query.redirect || '/dashboard'
      replace(redirect)
    }
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const SignupContainer = require('./containers/SignupContainer').default
      cb(null, { component: SignupContainer })
    }, 'signup')
  }
})
