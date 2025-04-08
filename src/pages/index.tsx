import Link from 'next/link';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Head>
        <title>Bumper Form Uygulaması</title>
      </Head>
      
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Bumper Form Uygulaması</h1>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Bu uygulama, kullanıcıların form göndermesine ve gönderilen formları listelemesine olanak tanır.
          </p>
          
          <div className="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Link 
              href="/form" 
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
            >
              Form Sayfasına Git
            </Link>
            <Link 
              href="/list" 
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors"
            >
              Başvuruları Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}