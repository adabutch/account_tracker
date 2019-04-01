export default function ({ store, redirect, isServer, res, req, query }) {
  let adminLevel  = store.state.groupLevels.admin,
  userLevel       = store.state.auth.authUser.groups,
  isAdminLevel    = userLevel.includes(adminLevel);

  if (!isAdminLevel) {
    console.log(`⛔ 🛸 page level = Admin (${userLevel}) 🛸 ⛔`);
    return redirect('/error')
  }
}