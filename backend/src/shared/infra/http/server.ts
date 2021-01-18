import app from './app'

const server = app.listen(3333, () => {
  console.log('🚀 API Started on port 3333')
})

process.on('SIGINT', () => {
  console.log('\n🔒 API Stopped')
  server.close()
  process.exit()
})
