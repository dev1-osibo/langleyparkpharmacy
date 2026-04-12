import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, link }) {
  return (
    <div className="card">
      <div className="text-5xl mb-4 text-secondary">{icon}</div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="btn-secondary inline-block">
        Learn More →
      </Link>
    </div>
  )
}
