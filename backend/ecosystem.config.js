const app = {
  name: 'e-vehicle-server',
  script: './dist/bin/www.js',
  instances: 2,
  exec_mode: 'cluster',
  autorestart: true,
  env: {
    SERVER_PORT: 10810,
  },
}

const apps = [app]
module.exports = {
  apps,
}
