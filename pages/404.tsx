import Error from 'next/error'

function Page404() {
  return <Error statusCode={404} />
}

Page404.displayName = '404'
export default Page404;