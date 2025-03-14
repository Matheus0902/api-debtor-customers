module.exports = {
  apps : [{
    script: './src/server.js',
    watch: true,               // Habilita o 'watch' para reiniciar quando arquivos mudarem
      env: {
        NODE_ENV: 'production'   // Definindo a variável de ambiente 'NODE_ENV'
      },
      post_deploy: 'npm run migrate', // Roda as migrações após o deploy
    },
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
