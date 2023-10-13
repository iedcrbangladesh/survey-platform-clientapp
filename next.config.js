/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    basePath: '',
      env: {
          app_name:'Survey BoilterPalte',
          api_url: 'https://champs.iedcr.gov.bd:5002/api/',
          number_api_url:'https://champs.iedcr.gov.bd:5003/numapi/',
          current_question_url:'/dashboard/callstart/',
          max_schedule_count:2,
          per_page:10,
          per_page_list:[10,20,50,100],
        },
        
  }
module.exports = nextConfig
