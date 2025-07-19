import http from 'http'
import routes from './routes.js'

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  const route = routes._match(req.method, pathname)

  if (route.valid) {
    route.handler(req, res, { params: route.params })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
})

server.listen(3000, () => {
  console.log('Server running on port :3000')
})

