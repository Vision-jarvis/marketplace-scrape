import React from 'react';
import { Platform } from '../types';

interface ScraperFormProps {
  url: string;
  platform: Platform;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onPlatformChange: (platform: Platform) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ScraperForm({
  url,
  platform,
  loading,
  onUrlChange,
  onPlatformChange,
  onSubmit,
}: ScraperFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Platform
        </label>
        <select
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value as Platform)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
          <option value="nykaaman">Nykaa Man</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product URL
        </label>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter product URL"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Processing...' : 'Scrape Data'}
        </button>
      </div>
    </form>
  );
}