// src/BlogPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { debounce } from './Debounce';

const initialPosts = [
  // Your initial blog posts here
];

const loadMorePosts = (startIndex, count) => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      const newPosts = [];
      for (let i = startIndex; i < startIndex + count; i++) {
        newPosts.push({
          id: i + 1,
          title: `New Post ${i + 1}`,
          snippet: `Snippet for new post ${i + 1}...`,
          date: `August ${20 + i}, 2024`,
          image: `https://via.placeholder.com/400x200?text=New+Post+${i + 1}`,
          content: `Detailed content for new post ${i + 1}...`
        });
      }
      resolve(newPosts);
    }, 1000);
  });
};

const BlogPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newPosts = await loadMorePosts(posts.length, 10);
      if (newPosts.length === 0) setHasMore(false); // No more posts
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchPosts = useCallback(debounce(fetchPosts, 500), [loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          debouncedFetchPosts();
        }
      },
      { rootMargin: '100px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [debouncedFetchPosts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.map(post => (
        <div key={post.id} className="bg-white shadow-md rounded-lg mb-6 p-6">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.date}</p>
          <p className="text-gray-800 mb-4">{post.snippet}</p>
          <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
        </div>
      ))}
      <div ref={loaderRef} className="py-6">
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default BlogPage;
