import type { NextApiRequest, NextApiResponse } from 'next'
import getFigmaStyles from '../../helpers/getFigmaStyles'
import convertFigmaStylesToClevStyles from '../../helpers/convertFigmaStylesToClevStyles'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const {query: {
		fileKey,
		token,
		styleType 
	}} = req

	if(styleType === 'FILL' || styleType === 'TEXT') {
		res.status(200).json(convertFigmaStylesToClevStyles({
			figmaStyles: await getFigmaStyles({fileKey, token, styleType}), 
			figmaStyleType: styleType
		}))
	} else {
		res.status(200).json({error: "Wrong styleType paramater"})	
	}
}