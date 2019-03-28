export default function ({ store, redirect, isServer, res, req, query }) {
  if (!store.state.auth) {
    console.log(store.state.auth);
    return redirect('/login')
  }
}