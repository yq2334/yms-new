let BASE_URL = ''

if (process.env.NODE_ENV == 'development') {
  //小程序访问，不能用localhost
  BASE_URL = 'http://192.168.31.95:8888'
  //  #ifdef H5
  BASE_URL = 'http://localhost:8888'
  //  #endif
} else {
  BASE_URL = 'http://api.xxx.cn/uni-api'
  //  #ifdef H5
  BASE_URL = '/prod-api'
  //  #endif
}
const configService = {
  apiUrl: BASE_URL
}

export default configService
