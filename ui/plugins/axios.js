export default function ({ $axios, app, store, redirect, route }) {
  $axios.onRequest(config => {
    if(process.env.NODE_ENV === 'development')
      console.log(`${config.method.toUpperCase()} :: ${config.url}`)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (code > 500) {
      redirect('/error')
    }
  })
}