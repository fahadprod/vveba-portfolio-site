'use client'
import { useState, useEffect } from 'react';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?tag=javascript&top=30');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="projects">
      <h1 className="section-bg-heading">My Articles</h1>
      <h1 className="section-heading">Blog Posts</h1>
      <h3 className="sub-heading">My <span>Articles</span></h3>
      
      <div className="projects-cards">
        {currentPosts.map(post => (
          <div key={post.id} className="project-card">
            <div className="project-img">
              <img 
                src={post.cover_image || '/default-blog-image.jpg'} 
                alt={post.title} 
                onError={(e) => {
                  e.target.src = '/default-blog-image.jpg';
                }}
              />
            </div>
            {/* <div className="techs">
              {post.tag_list.slice(0, 3).map((tech, index) => (
                <span key={index}>
                  {tech}{index < Math.min(2, post.tag_list.length - 1) ? ',' : ''}
                </span>
              ))}
            </div> */}
            <h3 className="project-name">{post.title}</h3>
            <p className="project-desc">
              {post.description.substring(0, 100)}...
            </p>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-btn"
            >
              Read More <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="section-border"></div>
    </section>
  );
}