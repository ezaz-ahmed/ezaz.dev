import React from 'react'
import {
  Code2,
  Activity,
  Cpu,
  Layers,
  Network,
  Binary,
  MonitorSmartphone,
  LayoutDashboard,
  Code,
  Building,
  LucideComputer,
} from 'lucide-react'

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
}) => (
  <div className='group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
    {/* Glass morphism effect */}
    <div className='absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg' />

    {/* Animated gradient border */}
    <div className='absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500' />

    <div className='relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl'>
      {/* Floating icon with pulse effect */}
      <div className='relative mb-6'>
        <div className='absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25 rounded-full blur-xl group-hover:opacity-75 animate-pulse transition-all duration-500' />
        <Icon className='w-12 h-12 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300' />
      </div>

      {/* Content with improved typography */}
      <div className='space-y-3'>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          {title}
        </h3>
        <div className='flex justify-between items-center text-gray-300'>
          <span className='font-semibold text-blue-400'>{company}</span>
          <span className='text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full'>
            {period}
          </span>
        </div>
        <div className='pl-4 mt-4 leading-relaxed'>
          <ul>
            {description.map((item, index) => (
              <li key={index} className='list-disc pl-4 text-blue-500/50'>
                <p className='text-gray-300 '>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-4 right-4 w-20 h-20'>
        <div className='absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50' />
        <div className='absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50' />
      </div>
      <div className='absolute bottom-4 left-4 w-20 h-20'>
        <div className='absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50' />
        <div className='absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50' />
      </div>
    </div>
  </div>
)

const ExperienceSection = () => {
  const experiences = [
    {
      icon: Code,
      title: 'Software Developer',
      company: 'Member Lounge',
      period: 'Aug 2024 - Present',
      description: [
        'Designed and implemented an AI-driven content matching system, boosting user engagement by 45%.',
        'Debugged 50+ production issues, reducing user-reported errors by 60% and improving system uptime.',
        'Optimized Stripe payments, achieving a 25% higher transaction success rate (10K+ annual transactions).',
      ],
    },
    {
      icon: Building,
      title: 'Full Stack Engineer',
      company: 'Atlhas Tutor',
      period: 'Jan 2024 - Jul 2024',
      description: [
        'Developed a high-performance PDF rendering system that reduced load times by 40%, enhancing user experience.',
        'Implemented dynamic PDF generation for invoices and reports, automating workflows and streamlining over 100 monthly transactions.',
        'Engineered a robust authentication system, safeguarding data for thousands of platform users.',
      ],
    },
    {
      icon: LayoutDashboard,
      title: 'Frontend Developer',
      company: 'Siin',
      period: 'Sep 2023 - Jan 2024',
      description: [
        'Led the development of new features for multi-vendor dashboards, driving a 60% increase in user engagement.',
        'Enhanced dashboard performance by integrating advanced caching, cutting load times by 50%.',
        'Spearheaded the redesign of the customer-facing website interface, boosting conversion rates by 35%.',
      ],
    },
    {
      icon: Code2,
      title: 'Software Engineer',
      company: 'Code Linker',
      period: 'Mar 2022 - Sep 2023',
      description: [
        'Collaborated in the development of a custom CMS, improving content management efficiency by 75%.',
        'Delivered tailored software solutions to 5+ clients, both independently and as part of a team, achieving a 90% client satisfaction rate with high-quality deliverables.',
        'Contributed to the development of reporting software, supporting 200+ active users monthly.',
      ],
    },
    {
      icon: LucideComputer,
      title: 'Frontend Web Developer',
      company: 'Tickets4Travel',
      period: 'Sep 2021 - Feb 2022',
      description: [
        'Developed a mobile-first dashboard layout from scratch, resulting in a 100% increase in mobile traffic and user interactions.',
        'Collaborated closely with the UX team to design and optimize website features, driving a 70% increase in user engagement.',
      ],
    },
  ]

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b  relative overflow-hidden pt-32 pb-20'>
        {/* Animated gradient background */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' />

        {/* Animated particles */}
        <div className='absolute inset-0'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float'
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className='relative container mx-auto px-6 mt-10'>
          {/* Section header with enhanced effects */}
          <div className='flex flex-col items-center space-y-8 mb-20'>
            <div className='relative'>
              <h2 className='text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center'>
                Professional Journey
              </h2>
              <div className='absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full' />
            </div>
            <p className='text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl'>
              "Transforming ideas into digital reality, one project at a time"
            </p>
          </div>

          {/* Experience grid with improved layout */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto'>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>

        {/* Enhanced background effects */}
        <div className='absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000' />
      </div>
    </>
  )
}

export default ExperienceSection
