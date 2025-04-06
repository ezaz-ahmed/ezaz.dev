import { useState } from 'react'
import Hero from './components/Hero'
import './assets/css/index.css'
import Header from './components/Header'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Projects from './components/Projects'
import { Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/Footer'

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false)

  const components = [
    { path: '/', element: <Hero />, id: 'hero' },
    { path: '/skills', element: <Skills />, id: 'skills' },
    { path: '/experience', element: <Experience />, id: 'experience' },
    { path: '/contact', element: <Contact />, id: 'contact' },
    { path: '/projects', element: <Projects />, id: 'projects' },
  ]

  return (
    <>
      <Header>
        {isOnePage && (
          <nav>
            {components.map(({ path, id }) => (
              <a key={id} href={`#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
        )}
      </Header>

      {isOnePage ? (
        components.map(({ element, id }) => (
          <section key={id} id={id}>
            {element}
          </section>
        ))
      ) : (
        <Routes>
          {components.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      )}

      <Footer />
    </>
  )
}
