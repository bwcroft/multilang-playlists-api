import { RouterNode } from './RouterNode.js'

export class Router {
  constructor() {
    this.root = new Map()
  }

  /**
   * @param {string} path
   * @returns {string[]}
   */
  _splitPath(path) {
    return path?.split('/').filter(Boolean)
  }

  /**
   * @param {string} path
   * @returns {boolean}
   */
  _isUrlParam(segment) {
    return segment.startsWith(':')
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  _getUrlParamName(segment) {
    return segment.slice(1)
  }

  /**
   * Adds a route to the internal structure
   * @param {string} method - HTTP method like "GET", "POST"
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  _add(method, path, handler) {
    if (!this.root.has(method)) {
      this.root.set(method, new RouterNode())
    }

    let node = this.root.get(method)
    const segments = this._splitPath(path)

    for (const segment of segments) {
      if (this._isUrlParam(segment)) {
        const paramName = this._getUrlParamName(segment)
        if (node.paramName && node.paramName !== paramName) {
          throw new Error(`Route conflict: "${path}" has conflicting parameter "${segment}" to another paths parameter "${node.paramName}"`)
        } else if (!node.paramName) {
          node.paramName = segment.slice(1)
          node.paramChild = new RouterNode()
        }
        node = node.paramChild
      } else {
        if (!node.children.has(segment)) {
          node.children.set(segment, new RouterNode())
        } 
        node = node.children.get(segment)
      }
    }

    node.handler = handler
  }

  _match(method, path) {
    const response = { 
      valid: false,
      params: {},
      handler: () => {},
    }

    try {
      if (!this.root.has(method)) {
        return null
      }

      const segments = this._splitPath(path)
      let node = this.root.get(method)
      let params = {}
      
      for (const segment of segments) {
        if (node.children.has(segment)) {
          node = node.children.get(segment)
        } else if (node.paramName && node.paramChild) {
          params[node.paramName] = segment
          node = node.paramChild
        } else {
          node = null
          break
        }
      }

      if (node && node.handler) {
        response.valid = true
        response.params = params
        response.handler = node.handler
      }
    } catch(e) {
      console.error(e)
    } finally {
      return response
    }
  }

  /**
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  get(path, handler) {
    this._add('GET', path, handler)
  }

  /**
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  post(path, handler) {
    this._add('POST', path, handler)
  }

  /**
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  put(path, handler) {
    this._add('PUT', path, handler)
  }

  /**
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  patch(path, handler) {
    this._add('PATCH', path, handler)
  }

  /**
   * @param {string} path - URL pattern like "/users/:id"
   * @param {Function} handler - The function to handle the route
   */
  delete(path, handler) {
    this._add('DELETE', path, handler)
  }
}
