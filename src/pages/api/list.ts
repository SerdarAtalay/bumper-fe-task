import { NextApiRequest, NextApiResponse } from 'next';
import { getSubmissions } from '@/lib/storage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const company = req.query.company as string | undefined;
  let submissions = getSubmissions();

  if (company) {
    submissions = submissions.filter(sub => sub.company.toLowerCase().includes(company.toLowerCase()));
  }

  return res.status(200).json({ submissions });
}