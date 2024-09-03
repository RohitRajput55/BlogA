// src/BlogPost.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    snippet: 'React Hooks are a new addition in React 16.8 that let you use state and other React features without writing a class...',
    date: 'August 20, 2024',
    image: 'https://via.placeholder.com/400x200?text=React+Hooks',
    content: 'Detailed content about React Hooks...'
  },
  {
    id: 2,
    title: 'Introduction to Tailwind CSS',
    snippet: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without having to leave your HTML...',
    date: 'August 18, 2024',
    image: 'https://via.placeholder.com/400x200?text=Tailwind+CSS',
    content: 'Detailed content about Tailwind CSS...'
  },
  {
    id: 3,
    title: 'Building Responsive Layouts with Tailwind',
    snippet: 'Creating responsive layouts is easy with Tailwind CSS. Learn how to build fluid and adaptable designs using Tailwind’s responsive utilities...',
    date: 'August 15, 2024',
    image: 'https://via.placeholder.com/400x200?text=Responsive+Layouts',
    content: 'Detailed content about responsive layouts with Tailwind CSS...'
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">Back to Blog</Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.date}</p>
        <p className="text-gray-800 mb-4">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
