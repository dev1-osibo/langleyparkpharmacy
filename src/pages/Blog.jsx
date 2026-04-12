import { useState } from 'react'
import BlogCard from '../components/BlogCard'

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')

  const blogPosts = [
    {
      id: 'post-1',
      title: 'Understanding Your Medications: A Guide to Common Questions',
      date: 'April 1, 2024',
      excerpt: 'Medications raise many questions. Learn answers to the most common questions about taking medications safely and effectively.',
      category: 'Medication Tips'
    },
    {
      id: 'post-2',
      title: 'Flu Season Prep: How to Stay Healthy This Year',
      date: 'September 15, 2023',
      excerpt: 'As flu season approaches, learn about vaccines and healthy habits to protect yourself and your family.',
      category: 'Health Tips'
    },
    {
      id: 'post-3',
      title: 'Managing Medication Side Effects: What You Need to Know',
      date: 'March 20, 2024',
      excerpt: 'Experiencing side effects from your medication? Learn how to manage them and when to contact your healthcare provider.',
      category: 'Medication Tips'
    },
  ]

  const filtered = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-100">
            Expert tips, health advice, and pharmacy insights.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Search */}
          <div className="mb-12">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles match your search.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-primary text-3xl font-bold mb-12">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '💊', title: 'Medication Tips', posts: '3 articles' },
              { emoji: '🏥', title: 'Health Tips', posts: '2 articles' },
              { emoji: '💉', title: 'Wellness', posts: '1 article' },
            ].map((category, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="font-bold text-primary mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.posts}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8">Get pharmacy tips and health advice delivered to your inbox.</p>
          <form className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                alert('Thank you for subscribing!')
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
