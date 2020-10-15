const fastify = require('fastify')()
const yaml = require('yaml')
const localsFile = require('fs').readFileSync('./locals.yml', 'utf8')
const path = require('path')
const locals = yaml.parse(localsFile)

fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  },
  options: {
    partials: {
      head: '/views/layouts/head.hbs',
      header: '/views/layouts/header.hbs',
      footer: '/views/layouts/footer.hbs',
      card: '/views/partials/card.hbs',
      whatsapp: '/views/partials/socials/whatsapp.hbs',
      instagram: '/views/partials/socials/instagram.hbs',
      email: '/views/partials/socials/email.hbs',
    }
  }
})
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'views'),
})

fastify.get('/', (req, reply) => {
  reply.view('/views/index.hbs', locals)
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})