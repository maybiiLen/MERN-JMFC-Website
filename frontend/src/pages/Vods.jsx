import React, { useState, useEffect } from 'react';

export const Vods = () => {
  // State management for videos, loading, and errors
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos from backend when component mounts
  useEffect(() => {
    const fetchVods = async () => {
      try {
        // Call your backend API endpoint for videos
        const response = await fetch('http://localhost:5000/api/vods');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        console.log('Fetched videos:', data); // Debug log
        setVideos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchVods();
  }, []); // Empty dependency array = run once on mount

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading videos...</div>
      </div>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed background */}
      <div className="fixed inset-0 bg-black -z-10">
        {/* Grid pattern overlay */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        {/* Radial gradient circle */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[-10%] h-[600px] w-[600px] lg:h-[1000px] lg:w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 w-full pt-20 pb-12 px-2">
        <div className="max-w-7xl mx-auto">
          {/* Page title */}
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            MATCH HIGHLIGHTS
          </h1>
          
          {/* Video grid - 5 videos per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.length > 0 ? videos.map((video, index) => (
              <div key={video._id} className="group cursor-pointer">
                {/* Video link - opens YouTube in new tab */}
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Video thumbnail card */}
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 bg-gray-800">
                    {/* YouTube thumbnail image */}
                    <img 
                      src={(() => {
                        // Extract video ID from different YouTube URL formats such as youtube.com/watch?v= or youtu.be/
                        let videoId = '';
                        
                        if (video.url.includes('youtube.com/watch?v=')) {
                          videoId = video.url.split('v=')[1]?.split('&')[0];
                        } else if (video.url.includes('youtu.be/')) {
                          videoId = video.url.split('youtu.be/')[1]?.split('?')[0];
                        }
                        
                        console.log('Video URL:', video.url, 'Extracted ID:', videoId); // Debug log
                        
                        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                      })()}
                      alt={video.title || 'Video thumbnail'}
                      className="w-full h-32 sm:h-40 object-cover"
                      onError={(e) => {
                        // Optionally set a fallback image or handle error
                        e.target.src = 'https://via.placeholder.com/320x180?text=No+Thumbnail';
                      }}
                      onLoad={(e) => {
                        // Remove background color once image loads
                        e.target.parentElement.style.backgroundColor = 'transparent';
                      }}
                    />
                    
                    {/* Play button overlay - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center">
                        {/* Play icon SVG */}
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5-8-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video title */}
                  <h3 className="mt-3 text-sm sm:text-base font-medium text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                    {video.title || 'Untitled Video'}
                  </h3>
                  
                  {/*Video date */}
                  {video.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </a>
              </div>
            )) : (
              // Show message when no videos exist
              <div className="col-span-full text-center text-gray-400 py-16">
                <p className="text-2xl">No videos found.</p>
                <p className="mt-2">Check back later for new content!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vods;