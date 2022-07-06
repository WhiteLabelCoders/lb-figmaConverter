import { figmaFillToCss } from './transformFigmaFillsToCss';
import type { figmaStylesText, figmaStylesColor} from '../types-figma'
import type { textClevStyle } from "../types-clev"

export type convertFigmaStylesToClevStylesProps = {
	figmaStyles: Array<figmaStylesText | figmaStylesColor>  
	figmaStyleType: 'FILL' | 'TEXT'
}

function transformFigmaStylesToClevStyles(figmaStyles:Array<figmaStylesText>, figmaStyleType: 'TEXT'): object
function transformFigmaStylesToClevStyles(figmaStyles:Array<figmaStylesColor>, figmaStyleType: 'FILL'): object
function transformFigmaStylesToClevStyles(figmaStyles:any, figmaStyleType:any): object {
	let clevFontStyles: any = {}
	const createNestedObject = function (base: any, names: any, value: any) {
		let lastName = arguments.length === 3 ? names.pop() : false
		for (let i = 0; i < names.length; i++) {
			base = base[names[i]] = base[names[i]] || {}
		}
		if (lastName) base = base[lastName] = value
		return base
	}
	const addStyleToObject = (figmaStyleNodeName: any, style: object | textClevStyle) => {
		let nameExplodeArray:Array<string> = figmaStyleNodeName.split("/")
		let nameExplodeArraytoLowerCase:Array<string> = []
		nameExplodeArray.forEach(element => {
			nameExplodeArraytoLowerCase.push(element.charAt(0).toLowerCase() + element.slice(1))
		})
		nameExplodeArray = nameExplodeArraytoLowerCase 
		if (nameExplodeArray.length > 0) {
			createNestedObject(clevFontStyles, nameExplodeArray, style)
		}
	}

	for (let key in figmaStyles) {
		const figmaStyleNodeName = figmaStyles[key].name || ""
		let style = {}
		switch(figmaStyleType) {
			case 'TEXT':
				//console.log(figmaStyles[key].style)
				style = {
					fontFamily: figmaStyles[key].style.fontFamily,
					fontWeight: figmaStyles[key].style.fontWeight,
					fontSize: `${figmaStyles[key].style.fontSize}px`,
					letterSpacing: `${figmaStyles[key].style.letterSpacing}px`,
					lineHeight: `${figmaStyles[key].style.lineHeightPercentFontSize}%`
				}
				break
			case 'FILL':
				style = figmaFillToCss(figmaStyles[key].fills[0])
				break
		}
		addStyleToObject(figmaStyleNodeName, style)
	}

	return clevFontStyles
}


export default transformFigmaStylesToClevStyles