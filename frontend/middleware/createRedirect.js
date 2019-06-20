export default function ({store, redirect, route}) {
  let redirectToCreate = /^\/(\/|$)/.test(route.fullPath)
  if (redirectToCreate)
    return redirect(store.state.paths.create)
}