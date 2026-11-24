import { useState, useEffect } from "react"
import JobListing from "./JobListing"
import Spinner from "./Spinner"

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = isHome 
                  ? '/api/jobs?_page=1&_per_page=3'
                  : '/api/jobs?_page=1&_per_page=20'
    const fetchJobs = async () => {
      try {
        const resultado = await fetch(apiUrl)

        if (!resultado.ok) {
          throw new Error(`Error ${resultado.status}`)
        }

        const data = await resultado.json()
        setJobs(data.data)
      } catch (error) {
        console.error("Error al obtener los trabajos:", error)
        setError("No se pudieron cargar los trabajos")
      } finally {
        setCargando(false)
      }
    }

    fetchJobs()
  }, [])

  const jobsMostrados = isHome ? jobs.slice(0, 3) : jobs

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {cargando ? (
          <Spinner loading={cargando} />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsMostrados.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default JobListings
