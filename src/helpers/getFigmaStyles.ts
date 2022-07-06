import { FIGMA_API_ENDPOINT } from '../constants'

export type GetFigmaStylesProps = {
	figmaFileKey: string|string[] 
	figmaToken: string|string[] 
	figmaStyleType?: string
} 

const getFigmaStyles = ({figmaFileKey, figmaToken, figmaStyleType}: GetFigmaStylesProps) => {
	const requestHeaders: HeadersInit = new Headers()
	requestHeaders.set('X-Figma-Token', `${figmaToken}`)

	return fetch(`${FIGMA_API_ENDPOINT}/${figmaFileKey}/styles`, {headers: requestHeaders})
	.then(response => response.json())
	.then(data => {
		//console.log("old", data)
		if(figmaStyleType) {
			return data.meta.styles.filter((styles: { style_type: string; }) => styles.style_type === figmaStyleType)
		} else {
			return data.meta.styles
		}
	})
	.then(async data => {
		await Promise.all(data.map((style: { node_id: string | number; }, index: string | number, array: { [x: string]: string[]; }) => {
			return fetch(`${FIGMA_API_ENDPOINT}/${figmaFileKey}/nodes?ids=${style.node_id}`, {headers: requestHeaders})
				.then(response => response.json())
				.then(node => {		
					array[index] = node.nodes[style.node_id].document
					//console.log("update")
				})
		}))
		//console.log("new", data)
		if(data.length === 0) {
			console.error('\x1b[31m', `You don't add any sytles to project in Figma or you styles are not published`)
		}

		return data
	})
}

export default getFigmaStyles