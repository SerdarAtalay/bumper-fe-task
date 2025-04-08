import { NextApiRequest, NextApiResponse } from 'next';
import { addSubmission, getSubmissions } from '@/lib/storage';
import type { Submission } from '@/lib/storage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body as Submission;

    // Store the submission in memory using the storage module
    const result = addSubmission(data);

    return res.status(200).json({ message: 'Submission received', data: result });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ submissions: getSubmissions() });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}