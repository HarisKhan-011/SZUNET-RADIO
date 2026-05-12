import { blogPosts } from '../data/blogPosts'
import blogTitle from '../assets/images/BLOG.png'
import blueRing from '../assets/images/Ellipse 5.png'
import facebookIcon from '../assets/images/facebook.png'
import instagramIcon from '../assets/images/Subtract.png'
import youtubeIcon from '../assets/images/Subtract (1).png'
import './BlogSection.css'

function BlogSection() {
  return (
    <section className="blog-section" aria-label="Blog">
      <img className="blog-ring" src={blueRing} alt="" aria-hidden="true" />

      <div className="blog-inner">
        <header className="blog-header">
          <img src={blogTitle} alt="Blog" />
        </header>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article
              className={`blog-card ${post.featured ? 'blog-card--featured' : ''}`}
              key={post.id}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ objectPosition: post.imagePosition }}
              />
              <div className="blog-card-copy">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <footer className="blog-footer">
          <nav className="social-list" aria-label="Social links">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <img src={facebookIcon} alt="" />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube">
              <img src={youtubeIcon} alt="" />
            </a>
          </nav>

          <p className="premiere-title">Premierek</p>
        </footer>
      </div>
    </section>
  )
}

export default BlogSection
