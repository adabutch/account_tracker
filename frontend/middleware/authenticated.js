export default function ({ store, redirect, isServer, res, req, query }) {
  if (!store.state.auth) {
    return redirect('/login')
  }
}