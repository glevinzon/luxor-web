export default (store) => ({
  path: '/verify/email',
  onEnter (nextState, replace) {
    const { auth } = store.getState()
    if (auth.get('user') && auth.get('accessToken')) {
      const redirect = nextState.location.query.redirect || '/dashboard'
      replace(redirect)
    }
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const VerifyContainer = require('./containers/VerifyContainer').default
      cb(null, { component: VerifyContainer })
    }, 'verify/email')
  }
})
