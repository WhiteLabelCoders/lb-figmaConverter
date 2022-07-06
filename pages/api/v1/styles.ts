import type { NextApiRequest, NextApiResponse } from 'next'
import getFigmaStyles from '../../../src/helpers/getFigmaStyles'
import transformFigmaStylesToClevStyles from '../../../src/helpers/transformFigmaStylesToClevStyles'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const {query: {
		figmaFileKey,
		figmaToken,
		figmaStyleType 
	}} = req

	if(typeof figmaFileKey === 'undefined' || typeof figmaToken === 'undefined') {
		res.status(200).json({error: "figmaFileKey or figmaToken not specified"})	
	}

	switch(figmaStyleType) {
		case 'FILL':
			res.status(200).json(transformFigmaStylesToClevStyles(await getFigmaStyles({figmaFileKey, figmaToken, figmaStyleType}), figmaStyleType))
			break
		case 'TEXT':
			res.status(200).json(transformFigmaStylesToClevStyles(await getFigmaStyles({figmaFileKey, figmaToken, figmaStyleType}), figmaStyleType))
			break
		default:
			res.status(200).json({error: "Wrong styleType paramater"})
	}
}