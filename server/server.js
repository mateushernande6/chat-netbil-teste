const server = require('./http.js')
require('./webSocket');

server.httpServer.listen(
  8000, 
  () => console.log('server is running on port => 8000')
  )