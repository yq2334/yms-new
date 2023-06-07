const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  userId: state => state.user.userInfo.userId,
  userInfo: state => state.user.userInfo
}
export default getters
