export default (store) => ({
  path: '/login',
  onEnter (nextState, replace) {
    const { auth } = store.getState()
    if (auth.get('user') && auth.get('accessToken')) {
      const redirect = nextState.location.query.redirect || '/dashboard'
      replace(redirect)
    }
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const LoginContainer = require('./containers/LoginContainer').default
      cb(null, { component: LoginContainer })
    }, 'login')
  }
})
