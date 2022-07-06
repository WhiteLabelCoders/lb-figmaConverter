import { FIGMA_API_ENDPOINT } from '../constants'

const getFigmaNodes = (figmaFileKey:string|string[], figmaToken:string|string[]) => {
  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('X-Figma-Token', `${figmaToken}`)
  return fetch(`${FIGMA_API_ENDPOINT}/${figmaFileKey}`, {headers: requestHeaders})
  .then(response => response.json())
  .then(data => {
    if(typeof data.document === 'undefined') {
      return data	
    }
    //console.log("old", data.document.children)
    return data.document.children[0].children
  })
  .then(async data => {
    await Promise.all(data.map((element: { id: string | number }, index: string | number, array: { [x: string]: any }) => {
      return fetch(`${FIGMA_API_ENDPOINT}/${figmaFileKey}/nodes?ids=${element.id}`, {headers: requestHeaders})
        .then(response => response.json())
        .then(node => {		
          array[index] = node.nodes[element.id].document
          //console.log("update", node)
        })
    }))
    //console.log("new", data)
    return data
  })
}

export default getFigmaNodes