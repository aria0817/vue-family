# mini-router
单页面应用: 切换router，没有新的html请求，只发生局部刷新。
多页面应用：切换router,会重新加载一个html的资源，刷新整个页面。

single-spa:第一次进入应用时，返回了唯一的html和它的公共资源，后续的跳转都不会从服务端拿文件，
只是DOM的替换操作。

vue-router的作用：在单页应用中，url发生变化，实现页面不刷新。
