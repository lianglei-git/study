module.exports = {
  // apps : [{
  //   script: 'index.js',
  //   watch: '.'
  // }, {
  //   script: './service-worker/',
  //   watch: ['./service-worker']
  // }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }

  apps: [
    {
      name: "demo_auto_clean",
      cwd: "./",
      script: 'index.js',
      error_file: './logs/app-err.log',
      // 自定义应用程序日志文件(正常日志文件)
      out_file: './logs/app-out.log',
    },
  ]
};
