import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function BlogPost() {
  const { postId } = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/blog/${postId}.md`)
        if (!response.ok) throw new Error('Post not found')
        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError('Blog post not found')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <section className="bg-primary text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-white text-3xl font-bold">{error}</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="text-gray-200 hover:text-white mb-4 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-5xl font-bold text-primary mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold text-primary mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold text-dark mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 text-lg leading-relaxed mb-4">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-dark">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                hr: () => <hr className="my-8 border-gray-300" />,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 my-4">{children}</blockquote>,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Author & Share */}
          <div className="border-t border-gray-300 pt-8 mt-12">
            <div className="bg-light p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-2">About This Post</h3>
              <p className="text-gray-700">
                Written by the Langley Park Pharmacy team. For more health tips and pharmacy advice, check out our blog.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Have Questions About This Topic?</h3>
            <p className="mb-6">Our pharmacists are here to help.</p>
            <a href="tel:+13016191234" className="btn-secondary">
              Call Us: 301-619-1234
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-primary text-3xl font-bold mb-12">More from Our Blog</h2>
          <div className="text-center">
            <Link to="/blog" className="btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
