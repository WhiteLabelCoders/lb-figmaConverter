import type { Fills, FigmaApiColorAttributes, ColorProps } from '../types-figma'
import { paintToLinearGradient, paintToRadialGradient, imageURL, backgroundSize } from './figmaOryginal'

export function figimaFillsToCss(fills:Fills) {
  // Figma User can disable visability on color settings.
  const visableFills = fills.filter(function(value, index, arr){ 
    return value.visible !== false
  })
  const numberOfFills = visableFills.length
  let backgroundSizeStyle:boolean|string = false
  switch (numberOfFills) {
    case 0:
      return undefined
      break
    case 1:
      return {
        background: figmaFillToCss(fills[0])
      }
      break
    default: 
      const fillsArray:Array<string> = []
      let error = false
      visableFills.map((fill, i) => {
        const type = fill.type
        switch(type) {
          case 'SOLID':
            if(i === 0) {
              fillsArray.push(figmaFillToCss(fill))
            } else {
              fillsArray.push(`linear-gradient(0deg, ${figmaFillToCss(fill)}, ${figmaFillToCss(fill)})`)
            }
            break
          case 'GRADIENT_LINEAR':
          case 'GRADIENT_RADIAL':
          case 'IMAGE':
            fillsArray.push(figmaFillToCss(fill))
            if(type === 'IMAGE') {
              backgroundSizeStyle = backgroundSize(fill.scaleMode)
            }
            break
          default:
            error = true
        } 
      })

      return {
        background: error ? `Error: some fill type is not supported` : fillsArray.reverse().join(', '),
        backgroundSize: backgroundSizeStyle ? backgroundSizeStyle : undefined
      }
  }
}

export function figmaFillToCss({color, type, opacity, gradientHandlePositions, gradientStops, imageRef, scaleMode}:FigmaApiColorAttributes) {
	switch (type) {
		case 'SOLID':
			return color ? figmaColorToCss({color, opacity}) : "Error: missing color:colorProps"
			break
		case 'GRADIENT_LINEAR':
			return paintToLinearGradient({color, opacity, gradientHandlePositions, gradientStops})
			break
		case 'GRADIENT_RADIAL':
			return paintToRadialGradient({color, opacity, gradientHandlePositions, gradientStops})	
			break
		case 'IMAGE':
			return `${imageURL(imageRef)}` //TODO: check how can I get image from Figma API 
			break
		default: 
			return `Error: fill type ${type} not supported`
	}
}

export interface ColorToCssProps {
	color: ColorProps, 
	opacity?: number|boolean
}

export function figmaColorToCss({color, opacity = false}: ColorToCssProps) {
  return `rgba(${Math.round(color.r*255)}, ${Math.round(color.g*255)}, ${Math.round(color.b*255)}, ${ opacity ? opacity : 1})`;
}