import React from 'react'
import profileImage from '../assets/images/developer.svg'

const AboutMe = () => {
  return (
    <section className='about-section bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white py-16 flex items-center justify-center'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 justify-center'>
        <div className='content max-w-2xl'>
          <h2 className='text-[#4ECCA3] text-2xl font-bold mb-6'>WHO I AM?</h2>
          <p className='text-lg leading-relaxed mb-4'>
            I'm a web developer specializing in TypeScript and JavaScript,
            passionate about creating visually stunning and high-performing
            applications. I turn imaginative ideas into innovative designs,
            ensuring both aesthetics and functionality. I actively contribute to
            open-source projects and keep expanding my skills to stay ahead in
            web development.
          </p>

          <p className='text-lg leading-relaxed mb-4'>
            Beyond coding, I mentor aspiring developers, explore startup ideas,
            and dive into emerging tech like serverless architecture and
            functional programming. I'm also keen on cybersecurity and ethical
            hacking. When not coding, you'll find me enjoying coffee, chatting
            about developer experience, anime, or the latest tech trends.
          </p>
        </div>
        <div className='image-container'>
          <img
            src={profileImage}
            alt='Profile'
            className='w-80 h-80 rounded-lg object-cover shadow-lg transform scale-x-[-1]'
          />
        </div>
      </div>
    </section>
  )
}

export default AboutMe
