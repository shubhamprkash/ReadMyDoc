// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';

// import { sanityClient } from '../../sanity';

import  sanityClient from "@sanity/client";


const config ={
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    userCdn: process.env.NODE_ENV ==="production",
    token: process.env.SANITY_API_TOKEN="skdkRDaXagVECD1I9Fm90Uic52ACF91lpZnuX1Emq3a375BDDHWtcZPWhi0l5C2jRNH8gp4o1Yr4y4chccriWNi9c0EYMA66avgbW8U7MOWW5fx69ghdLJ07DLTFaftkEo4BuixSksvdXcbgtYOTdBWN78iTIMCijOEtZiXYbNXMvvpEkyz5",

};

const client = sanityClient(config);


export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { _id, name, email, comment } = JSON.parse(req.body);
    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment
        });
    } catch (err){
        return res.status(500).json({message: `Counldn't submit comment`, err})
    }

  return res.status(200).json({message: 'Comment submitted' });
}
