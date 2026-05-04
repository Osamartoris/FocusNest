import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page">
      <div className="container empty-state">
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist in this prototype.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound

