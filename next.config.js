/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    basePath: '',
      env: {
          app_name:'Survey BoilterPalte',
          api_url: 'http://119.40.84.186:5002/api/',
          number_api_url:'http://119.40.84.186:5003/numapi/',
          current_question_url:'/dashboard/callstart/',
          per_page:10,
          per_page_list:[10,20,50,100],
        },
        
  }
module.exports = nextConfig
