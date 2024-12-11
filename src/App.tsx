import React, { useState } from 'react';
import { ScraperForm } from './components/ScraperForm';
import { StatusMessage } from './components/StatusMessage';
import { scrapeData } from './services/api';
import { Platform, ErrorState } from './types';

function App() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('amazon');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ show: false, message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({ show: false, message: '' });
    setSuccess(false);

    try {
      await scrapeData({ url, platform });
      setSuccess(true);
    } catch (err) {
      setError({
        show: true,
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            E-commerce Product Scraper
          </h1>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ScraperForm
            url={url}
            platform={platform}
            loading={loading}
            onUrlChange={setUrl}
            onPlatformChange={setPlatform}
            onSubmit={handleSubmit}
          />
          <StatusMessage error={error} success={success} />
        </div>
      </div>
    </div>
  );
}

export default App;