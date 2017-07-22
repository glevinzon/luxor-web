export const constantCreator = (actionStr) => {
  const initialize = actionStr
  const success = `${actionStr}_SUCCESS`
  const fail = `${actionStr}_FAIL`
  return {
    INIT: initialize,
    SUCCESS: success,
    FAIL: fail
  }
}
