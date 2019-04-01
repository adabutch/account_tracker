export default function ({ store, redirect, isServer, res, req, query }) {
  if (!store.state.auth.auth) {
    return redirect('/login')
  }
}