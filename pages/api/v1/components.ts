import type { NextApiRequest, NextApiResponse } from 'next'
import transformFigmaNodesToClevNodes from '../../../src/helpers/transformFigmaNodesToClevNodes'
import getFigmaNodes from '../../../src/helpers/getFigmaNodes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const {query: {
		figmaFileKey,
		figmaToken,
	}} = req

	res.status(200).json(await getFigmaNodes(figmaFileKey, figmaToken))	
}
