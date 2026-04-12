import { Link } from 'react-router-dom'

export default function BlogCard({ postId, title, date, excerpt }) {
  return (
    <div className="card">
      <span className="text-sm text-gray-500">{date}</span>
      <h3 className="text-xl font-bold text-primary mt-2 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <Link to={`/blog/${postId}`} className="text-secondary font-semibold hover:text-primary transition">
        Read More →
      </Link>
    </div>
  )
}
