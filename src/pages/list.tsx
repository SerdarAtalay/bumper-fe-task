import { useState, useEffect, useCallback } from 'react';
import { Submission } from '@/lib/storage';
import Link from 'next/link';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import BuHeader from '@/components/BuHeader';

export default function ListPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(companyFilter);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [companyFilter]);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const baseUrl = debouncedFilter 
        ? `/api/list?company=${encodeURIComponent(debouncedFilter)}` 
        : '/api/list';
      const url = baseUrl.includes('?') 
        ? `${baseUrl}&_t=${timestamp}` 
        : `${baseUrl}?_t=${timestamp}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn('API access failed. ');
        throw new Error('Failed to fetch submissions');
      }
      
      const data = await response.json();
      setSubmissions(data.submissions);
      setError(null);
    } catch (err) {
      console.error('List loading error:', err);
      setError('Failed to load submissions. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [debouncedFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return (
    <div className="min-h-screen bg-[#5A698C]">
      <BuHeader />
      <div className="w-full max-w-4xl mx-auto py-10 px-6">
        <div className="flex flex-col gap-5 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Interested Dealerships</h1>
          <p className="text-white mb-4">View all businesses that have registered interest in our payment services.</p>
          
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1B1B1B] shadow-md mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#FF733C]" />
                <span className="text-base font-semibold text-[#1B1B1B]">Search</span>
              </div>
              <p className="text-sm text-[#737373] mb-2">
                Start typing to search for businesses in the database
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Start typing name, company, phone or email for search"
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-[#545454] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF733C] focus:border-transparent"
                />
                {loading && <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">Searching...</span>}

              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <Link 
              href="/form" 
              className="inline-flex items-center gap-2 bg-[#32BE50] text-[#1B1B1B] px-6 py-3 rounded-full font-semibold border border-[#1B1B1B] hover:bg-[#2ca846] transition-colors"
            >
              <span>Add New Business</span>
              <PlusIcon className="w-5 h-5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1B1B1B] shadow-md text-center py-10">
              <p className="text-xl">Loading...</p>
            </div>
          ) : error ? (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1B1B1B] shadow-md text-center py-10">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1B1B1B] shadow-md text-center py-10">
              <p className="text-xl">There are no submissions recorded.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {submissions.map((submission, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-[#1B1B1B] shadow-md"
                >
                  <h2 className="text-xl font-bold mb-5">{submission.company}</h2>
                  
                  <div className="flex flex-col gap-4">
                    <div className="border-b border-[#CDD2DC] py-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Name</span>
                        <span>{submission.name}</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-[#CDD2DC] py-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Mobile phone number</span>
                        <span>{submission.mobile_phone}</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-[#CDD2DC] py-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Email address</span>
                        <span className="font-medium">{submission.email_address}</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-[#CDD2DC] py-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Postcode</span>
                        <span>{submission.postcode}</span>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Payment preferences</span>
                        <span>
                          {submission.pay_now && submission.pay_later 
                            ? 'PayLater & PayNow' 
                            : submission.pay_now 
                              ? 'PayNow'
                              : submission.pay_later 
                                ? 'PayLater'
                                : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {submissions.length >= 10 && (
                <button 
                  className="text-white text-center py-4 hover:underline"
                  onClick={() => console.log('Why not use Intersection Observer?')}
                >
                  Load more...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}