import { useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import '../assets/css/tomorrow.css'
import Meteors from './ui/meteors'
import PortfolioPage from './PortfolioPage'
import SparklesText from './ui/sparkles-text'
import { FlipWords } from './ui/flip-words'

const AnimatedGrid = () => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div className='relative w-full h-full'>
        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'>
          <div className='absolute inset-0 grid grid-cols-[repeat(40,1fr)] opacity-20'>
            {[...Array(40)].map((_, i) => (
              <div
                key={`v-${i}`}
                className='relative h-full w-full border-r border-blue-500/10'
                style={{
                  animation: `gridPulse ${
                    2 + Math.random() * 2
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className='absolute inset-0 grid grid-rows-[repeat(40,1fr)] opacity-20'>
            {[...Array(40)].map((_, i) => (
              <div
                key={`h-${i}`}
                className='relative w-full h-full border-b border-blue-500/10'
                style={{
                  animation: `gridPulse ${
                    2 + Math.random() * 2
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const words = [
    'Full-Stack Dev',
    'TypeScript Enthusiast',
    'Scaling Systems & Exploring DevOps',
    'Problem Solver',
  ]

  const [code] = useState(`
const profile = {
    name: 'Ezaz Ahmed',
    title: 'Software Engineer | Cloud Enthusiast | Problem Solver',
    skills: [
        'React', 'NextJS', 'Redux', 'Express',
        'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'TypeScript',
         'Git', 'Linux'
    ],
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
    yearsOfExperience: 4+, 
    hireable: function() {
        return (
            this.hardWorker &&
            this.problemSolver &&
            this.skills.length >= 5 &&
            this.yearsOfExperience >= 4
        );
    }
};
  `)

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <>
      <main className='pt-20 lg:pt-[0rem] bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white min-h-screen'>
        <section className='hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50'></div>

          <AnimatedGrid />

          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <Meteors number={10} />
          </div>

          <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-12 lg:py-0'>
            <div className='w-full lg:w-1/2 mb-12 lg:mb-0 animate__animated animate__fadeInLeft relative'>
              <div className='absolute hidden lg:-top-20 lg:-left-20 lg:block w-48 h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl'></div>
              <div className='absolute hidden lg:block lg:top-40 lg:-right-20 w-48 h-48 lg:w-64 lg:h-64 bg-teal-500/10 rounded-full blur-3xl'></div>

              <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 sm:mb-8 animate__animated animate__fadeInDown animate__delay-1s'>
                <div className='w-2 h-2 rounded-full bg-blue-400 animate-pulse'></div>
                <span className='text-gray-300 text-xs sm:text-sm font-medium'>
                  Welcome to my tech showcase
                </span>
              </div>

              <div className='relative mb-6 sm:mb-8'>
                <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight'>
                  <SparklesText text='Hello' />
                  <span className='relative inline-block'>
                    I'm
                    <span className='typing-effect gradient-text'>
                      {' '}
                      Ezaz Ahmed
                    </span>
                  </span>
                </h1>
                <div className='absolute -z-10 top-1/2 -translate-y-1/2 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse'></div>
              </div>

              <div className='inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 mb-6 sm:mb-8 backdrop-blur-sm animate__animated animate__fadeInUp animate__delay-1s'>
                <i className='fas fa-rocket text-blue-400 animate-bounce text-sm sm:text-base'></i>
                <span>
                  <FlipWords
                    className={'text-lg sm:text-xl text-blue-400 font-medium'}
                    words={words}
                  />
                </span>
              </div>

              {/* Description */}
              <div className='relative mb-8 sm:mb-12 max-w-xl'>
                <p className='text-base sm:text-xl text-gray-300/90 leading-relaxed'>
                  I love building software that makes the world better.
                  JavaScript is my superpower.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 animate__animated animate__fadeInUp animate__delay-2s'>
                <a
                  href='https://github.com/ezaz-ahmed'
                  className='group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-teal-400 p-0.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#60A5FA]'
                >
                  <span className='block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-[11px] bg-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400'>
                    <span className='relative flex items-center justify-center gap-2 text-white font-medium'>
                      <span>Learn More</span>
                      <i className='fas fa-arrow-right transform transition-all duration-300 group-hover:translate-x-1'></i>
                    </span>
                  </span>
                </a>

                <a
                  href='/resume/Software%20Engineer%20-%20Ezaz%20Ahmed.pdf'
                  download
                  className='group relative inline-flex items-center justify-center gap-3 p-0.5 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#60A5FA]'
                >
                  <span className='block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-[11px] bg-gray-900 border border-gray-700/50 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-700'>
                    <span className='relative flex items-center justify-center gap-2 text-gray-300 font-medium group-hover:text-white'>
                      <span>Get Resume</span>
                      <i className='fas fa-envelope transform transition-all duration-300 group-hover:rotate-12'></i>
                    </span>
                  </span>
                </a>
              </div>

              <div className='hidden lg:block absolute left-[5.5rem] top-[2.3rem] animate-float-slow'>
                <div className='px-4 py-2 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400'>
                  <i className='fas fa-wand-magic-sparkles'></i>&nbsp;&nbsp;Code
                  Quality
                </div>
              </div>
              <div className='hidden lg:block absolute right-10 top-20 animate-float'>
                <div className='px-4 py-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400'>
                  <i className='fas fa-code'></i>&nbsp;&nbsp;Continuous Learning
                </div>
              </div>
              <div className='hidden lg:block absolute top-[17rem] left-[70%] transform -translate-x-1/2 animate-float'>
                <div className='px-4 py-2 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-400'>
                  <i className='fas fa-lightbulb'></i>&nbsp;&nbsp;Knowledge
                  Sharing
                </div>
              </div>
            </div>

            <div className='w-full lg:w-1/2 animate__animated animate__fadeInDown animate__delay-0.1s'>
              <div className='gradient-border'>
                <div className='code-window bg-[#091121]'>
                  <div className='window-header'>
                    <div className='window-dot bg-red-500'></div>
                    <div className='window-dot bg-yellow-500'></div>
                    <div className='window-dot bg-green-500'></div>
                    <span className='ml-2 text-sm text-gray-400 flex items-center gap-2'>
                      <i className='fas fa-code'></i>
                      developer.js
                    </span>
                  </div>
                  <pre className='language-javascript'>
                    <code className='language-javascript'>{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PortfolioPage />
      </main>
    </>
  )
}
