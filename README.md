# VueBack

a vue scaffold for vue-element with login ，permission

演示地址：http://47.100.96.101:8080/xiong/#/activeHome

Cube3D Cube3DBig 分别是独立出的组件可以显示照片盒子

#技术

1.splice  
Array.splice(index,number,item1,.....,itemX)  
index:删除或者添加位置  
number:删除个数  
itemx:要添加的项

2.axios取消函数

一共有两种使用方式：
- 原始方式
```
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
    cancelToken:source.token
}).catch(function(thrown){
    if(axios.isCancel(thrown)){
        console.log('Rquest canceled', thrown.message);
    }else{
        //handle error
    }
});

//取消请求,调用这个方法，
//则原始方法不能再被成功调用
source.cancel("操作被用户取消");
```

- 函数方式
```
var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c){
        //这个executor 函数接受一个cancel function作为参数
        cancel = c;
    })
});

//取消请求
cancel();
//多数情况，我们封装的方法都是通过 export 输出，
//所以 cancel 我们也可以通过 export 输出，这样就可以在主业务中随时调用
export { cancel }
```
这种方式好处是写法简单，参数c就是cancel方法可以打包输出给外部调用


#遇到的问题：

##tomcat部署

目标访问路径为：http://47.100.96.101:8080/xiong/   
所以要把项目放在tomcat/webapps/xiong文件夹下面  

修改css、js访问路径
assetsPublicPath: '/xiong/'

修改图片访问路径  
将图片放在static/img下面由url-loader解析  
写的时候src = static/img/xxx.jpg

最后webpack打包生成dist文件  
npm run build

将生成的dist文件放入/webapps/xiong文件夹下面  
启动tomcat访问

##解决页面刷新
```
const state = {
  userId: window.localStorage.getItem('userId') //这里写初始值
}
const getters = {
  userId: state => state.userId
}
const mutations = {
  [types.SET_USER_ID] (state, id) {
    state.userId = id
    window.localStorage.setItem('userId', id) // 在mutation里面取数据的时候就先去set一次
  }
}
```

##增加路径别名

我们可以增加路径别名，以减少开发过程中路径的复杂性。  
webpack.base.conf.js  
```ang
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'util': '@/util',
      'asset': '@/asset'
      ...
    }
}
```
##修改index.html位置
```
// 开发环境：webpack.dev.conf.js
new HtmlWebpackPlugin({
    filename: 'index.html',
    // template: 'index.html',
    template: './src/index.html',
    inject: true
})

// 生产环境`webpack.prod.conf.js`
new HtmlWebpackPlugin({
    filename: config.build.index,
    // template: 'index.html',
    template: './src/index.html',
    ...
}),
```
##完善各种类型的css-loader
如果你想以后不再轻易动package.json的话，你完全可以把这些loader都安装上。  
npm install node-sass sass-loader less less-loader --save-dev

##权限功能

登录 ——> 获取该用户权限列表 ——> 根据权限列表生成能够访问的菜单 ——> 点击菜单，进入页面

