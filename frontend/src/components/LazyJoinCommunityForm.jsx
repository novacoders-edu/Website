import React, { Suspense } from 'react';

// Lazy load the JoinCommunityForm component for better performance
const JoinCommunityForm = React.lazy(() => import('./JoinCommunityForm'));

// Loading fallback component
const FormLoadingFallback = () => (
  <div className="w-full max-w-4xl mx-auto ">
    <div className="text-center mb-8">
      <div className="h-8 bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded-lg w-2/3 mx-auto animate-pulse"></div>
    </div>
    
    <div className="space-y-6">
      {/* Loading skeleton for form sections */}
      {[1, 2, 3, 4, 5].map((section) => (
        <div key={section} className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800">
          <div className="h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading button */}
      <div className="flex justify-center">
        <div className="h-12 w-48 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Main lazy-loaded wrapper component
const LazyJoinCommunityForm = () => {
  return (
    <Suspense fallback={<FormLoadingFallback />}>
      <JoinCommunityForm />
    </Suspense>
  );
};

export default LazyJoinCommunityForm;
