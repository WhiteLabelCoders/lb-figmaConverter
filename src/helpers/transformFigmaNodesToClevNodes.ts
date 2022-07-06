import type { FigmaComponent } from '../types-figma'
import { figimaFillsToCss } from './transformFigmaFillsToCss'
import { figmaStrokesToCssSolid, figmaStrokesToCssDashed } from './transformFigmaStrokesToCss'
import { transformFigmaEffectsToCss } from './transformFigmaEffectsToCss'

type ClevNodeApiStrukture = {
  id: string,
  name: string,
  type: string,
  absoluteBoundingBox: any
  auotLayout?: boolean | object
  style: object
  children?: Array<ClevNodeApiStrukture>
}

export default function transformFigmaNodesToClevNodes(figmaNodes:Array<FigmaComponent>) {
  const clevNode:Array<any> = [] //TODO: change "any" type for some from src/types-clev.ts or src/types-figma.ts

  const createClevNode = (figmaNode:FigmaComponent) => {
    console.log(figmaNode)
    const { strokes, strokeWeight, strokeDashes } = figmaNode
    const style = {
      paddingLeft: figmaNode.paddingLeft, 
      paddingRight: figmaNode.paddingRight,
      paddingTop: figmaNode.paddingTop,
      paddingBottom: figmaNode.paddingBottom,
      borderRadius: figmaNode.cornerRadius ? `${figmaNode.cornerRadius}px` : undefined 
    }
    const clevNodeApiStrukture:ClevNodeApiStrukture = {
      id: figmaNode.id,
      name: figmaNode.name,
      type: figmaNode.type,
      absoluteBoundingBox: figmaNode.absoluteBoundingBox,
      style: {
        ...style,  
        ...figmaStrokesToCssDashed({strokes, strokeWeight, strokeDashes}),
        ...figmaStrokesToCssSolid({strokes, strokeWeight, strokeDashes}),
        ...figimaFillsToCss(figmaNode.fills),
        ...transformFigmaEffectsToCss(figmaNode.effects)
      } 
    }

    switch(figmaNode.type) {
      case 'FRAME':
        const hasFrameAuotLayout = () => {
          return figmaNode.layoutMode ? {
            layoutMode: figmaNode.layoutMode,
            itemSpacing: figmaNode.itemSpacing,
            primaryAxisSizingMode: figmaNode.primaryAxisSizingMode,
            counterAxisAlignItems: figmaNode.counterAxisAlignItems,
            primaryAxisAlignItems: figmaNode.primaryAxisAlignItems,
          } : false 
        }
        clevNodeApiStrukture.auotLayout = hasFrameAuotLayout()

        break
    }

    return clevNodeApiStrukture
  }

  figmaNodes.forEach((figmaNode:FigmaComponent) => {
    let clevNodeApiStrukture:ClevNodeApiStrukture = createClevNode(figmaNode)
    const children = figmaNode.children
    if(children && children.length > 0) {
      const childrensClevNodeApiStrukture:Array<any> = []
      children.forEach(figmaNode => childrensClevNodeApiStrukture.push(createClevNode(figmaNode)))
      clevNodeApiStrukture.children = childrensClevNodeApiStrukture
    }
    clevNode.push(clevNodeApiStrukture)
  })

  return clevNode
}
