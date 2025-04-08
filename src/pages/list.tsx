import { useState, useEffect } from 'react';
import { Submission } from '@/lib/storage';
import Link from 'next/link';

export default function ListPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const url = companyFilter 
          ? `/api/list?company=${encodeURIComponent(companyFilter)}` 
          : '/api/list';
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Veri yüklenirken hata oluştu');
        }
        
        const data = await response.json();
        setSubmissions(data.submissions);
        setError(null);
      } catch (err) {
        setError('Veri yüklenirken hata oluştu');
        console.error('Liste yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [companyFilter]);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between mb-6 items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Başvuru Listesi</h1>
        <Link href="/form" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto text-center">
          Yeni Başvuru
        </Link>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Şirket adına göre filtrele..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </div>
      
      {loading ? (
        <p className="text-center py-10">Yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-10">{error}</p>
      ) : submissions.length === 0 ? (
        <p className="text-center py-10">Henüz başvuru bulunmuyor.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">İsim</th>
                <th className="border p-2 text-left">Şirket</th>
                <th className="border p-2 text-left">Telefon</th>
                <th className="border p-2 text-left">E-posta</th>
                <th className="border p-2 text-left">Posta Kodu</th>
                <th className="border p-2 text-left">Ödeme Tercihi</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{submission.name}</td>
                  <td className="border p-2">{submission.company}</td>
                  <td className="border p-2">{submission.mobile_phone}</td>
                  <td className="border p-2">{submission.email_address}</td>
                  <td className="border p-2">{submission.postcode}</td>
                  <td className="border p-2">
                    {submission.pay_now && submission.pay_later 
                      ? 'Her ikisi' 
                      : submission.pay_now 
                        ? 'Şimdi Öde'
                        : submission.pay_later 
                          ? 'Sonra Öde'
                          : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}