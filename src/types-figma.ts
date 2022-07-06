export type AbsoluteBoundingBox = {
  x: number
  y: number
  width: number
  height: number
}

export type Constraints = { 
  vertical: string, 
  horizontal: string 
}

export type ColorProps = {
  r: number, 
  g: number,
  b: number,
  a: number
}

export interface FigmaApiColorAttributes {
	opacity?: number,
	blendMode: string,
	type: string,
	color?: ColorProps
	gradientHandlePositions?: Array<any>
	gradientStops?: Array<any>
	imageRef?: string
	scaleMode?: string
  visible?: boolean
}

export type Fills = Array<FigmaApiColorAttributes> | []

export interface figmaStylesText {
  id: string
  name: string
  blendMode: string
  absoluteBoundingBox: AbsoluteBoundingBox 
  constraints: Constraints 
  fills: Fills 
  strokes: []
  strokeWeight: number
  strokeAlign: string
  effects: [],
  characters: string,
  style: {
    fontFamily: string,
    fontPostScriptName: null,
    fontWeight: number,
    textAutoResize: string,
    fontSize: number,
    textAlignHorizontal: string,
    textAlignVertical: string,
    letterSpacing: number,
    lineHeightPx: number,
    lineHeightPercent:number,
    lineHeightPercentFontSize: number,
    lineHeightUnit: string
  },
  layoutVersion: 3,
  characterStyleOverrides: [],
  styleOverrideTable: {},
  lineTypes: [ string ],
  lineIndentations: [ number ]
}

export interface figmaStylesColor {
  id: string
  name: string
  type: string
  blendMode: string
  absoluteBoundingBox: AbsoluteBoundingBox 
  constraints: Constraints
  fills: Fills,
  strokes: [],
  strokeWeight: number,
  strokeAlign: string,
  effects: []
}

export interface FigmaComponent {
  id: string
  name: string
  type: string
  absoluteBoundingBox: AbsoluteBoundingBox
  children?: [FigmaComponent]
  fills: Fills | []
  strokes: []
  strokeWeight: number
  strokeDashes?: []
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  cornerRadius? : number
  layoutMode?: string
  itemSpacing?: number
  primaryAxisSizingMode?: string
  counterAxisAlignItems?: string
  primaryAxisAlignItems?: string
  effects: []
}