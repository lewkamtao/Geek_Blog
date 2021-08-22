// 路由拦截

export default ({ app, $cookies }) => {
  // const isLoginPath = ["/UserHome", "/Order"]
  // app.router.beforeEach((to, from, next) => {
  //     const token = $cookies.get('token')
  //     if (isLoginPath.indexOf(to.path) >= 0) {
  //         if (from.path != "/login" && !token) {
  //             app.router.replace('/login')
  //         }
  //         if (token) {
  //             next()
  //         }
  //     } else {
  //         next()
  //     }
  // })
};
