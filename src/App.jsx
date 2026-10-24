import { useEffect, useState } from 'react'
import './App.css'

function StudentCard({ student }) {
  const initials = `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`

  return (
    <article className="student-card">
      <div className="avatar">{initials}</div>
      <div className="student-info">
        <h3>
          {student.firstName} {student.lastName}
        </h3>
        <p>{student.email}</p>
        <div className="meta-row">
          <span>Age: {student.age}</span>
          <span>Gender: {student.gender}</span>
        </div>
        <div className="meta-row">
          <span>City: {student.address.city}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=6')

        if (!response.ok) {
          throw new Error('Unable to load student records.')
        }

        const data = await response.json()
        setStudents(data.users || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  return (
    <main className="app-container">
      <header className="topbar">
        <p className="eyebrow">Student Directory</p>
        <h1>Student List</h1>
      </header>

      {loading && <div className="status">Loading students...</div>}
      {error && <div className="status error">{error}</div>}

      {!loading && !error && (
        <section className="student-list">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
