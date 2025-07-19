export class RouterNode {
  constructor() {
    this.children = new Map()
    this.handler = null
    this.paramName = null
    this.paramChild = null
  }
}
