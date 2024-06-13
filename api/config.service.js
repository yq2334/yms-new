let BASE_URL = ''

if (process.env.NODE_ENV == 'development') {
  //小程序访问，不能用localhost
  BASE_URL = 'https://jlzy.globebill.com/api' //https://t.xmshiteng.com/api
  //  #ifdef H5
  BASE_URL = 'https://jlzy.globebill.com/api'
  //  #endif
} else {
  BASE_URL = 'https://jlzy.globebill.com/api'
  //  #ifdef H5
  BASE_URL = 'https://jlzy.globebill.com/api' 
  //  #endif
}
const configService = {
  apiUrl: BASE_URL 
}

export default configService
