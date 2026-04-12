export default function TestimonialCard({ quote, author, role }) {
  return (
    <div className="card bg-light border-l-4 border-secondary">
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <p className="font-bold text-primary">{author}</p>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  )
}
