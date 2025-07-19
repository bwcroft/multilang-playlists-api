import { warn } from 'console'
import { Router } from './router/Router.js'
import pkg from '../package.json' with { type: 'json' }

const router = new Router()

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    name: pkg.name,
    version: pkg.version
  }));
})

router.get('/genres', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({}));
})

router.get('/genres/:id', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({}));
})

router.get('/genres/:id/music', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({}));
})

router.get('/music', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({}));
})

router.get('/music/:id', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({}));
})

export default router 
