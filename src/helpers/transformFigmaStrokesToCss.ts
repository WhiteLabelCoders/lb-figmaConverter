import { figmaFillToCss } from './transformFigmaFillsToCss'
import type { FigmaApiColorAttributes } from '../types-figma'

export type StrokesProps = {
  strokes: Array<FigmaApiColorAttributes>
  strokeWeight: number
  strokeDashes?: Array<number>
}

export function figmaStrokesToCssSolid({strokes, strokeWeight, strokeDashes}:StrokesProps) {
  if(strokes.length > 0) {
    const lastStroke = strokes[strokes.length - 1] as FigmaApiColorAttributes
    const type = lastStroke.type
    if(strokeDashes || lastStroke.visible === false) {
      return undefined
    }
    switch(type) {
      case 'SOLID':
        return {
          border: `${strokeWeight}px solid ${figmaFillToCss(lastStroke)}`
        }
        break
      default:
        return {
          border: `Error: fill type ${type} is not supported`
        }
    } 
  } else {
    return undefined
  }
}

// TODO: It dosen't work with two colors :('
export function figmaStrokesToCssDashed({strokes, strokeWeight, strokeDashes}:StrokesProps) {
  if(strokes.length > 0) {
    const lastStroke = strokes[strokes.length - 1] as FigmaApiColorAttributes
    if(!strokeDashes || lastStroke.visible === false) {
      return undefined
    } else {
      return {
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${figmaFillToCss(lastStroke)}' stroke-width='${strokeWeight}' stroke-dasharray='${strokeDashes[0]}%2c ${strokeDashes[1]}' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
      }
    }
  }  
}