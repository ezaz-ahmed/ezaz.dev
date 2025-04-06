import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaStackOverflow,
  FaDev,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      id: 'github',
      icon: FaGithub,
      url: 'https://github.com/ezaz-ahmed/',
      ariaLabel: 'GitHub Profile',
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/ezaz7/',
      ariaLabel: 'LinkedIn Profile',
    },
    {
      id: 'instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/the.ezaz7/',
      ariaLabel: 'Instagram Profile',
    },
    {
      id: 'twitter',
      icon: FaXTwitter,
      url: 'https://x.com/EzazDev/',
      ariaLabel: 'X Profile',
    },
    {
      id: 'devto',
      icon: FaDev,
      url: 'https://dev.to/ezaz-ahmed/',
      ariaLabel: 'Dev.to Profile',
    },
    {
      id: 'stackoverflow',
      icon: FaStackOverflow,
      url: 'https://stackoverflow.com/users/17363453',
      ariaLabel: 'Stack Overflow Profile',
    },
  ]

  return (
    <footer className='w-full bg-gray-900/95 backdrop-blur-md py-4 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          {/* Social Media Links */}
          <div className='flex items-center gap-4'>
            {socialLinks.map(({ id, icon: Icon, url, ariaLabel }) => (
              <a
                key={id}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={ariaLabel}
                className='text-gray-300 hover:text-white transition-colors duration-300'
              >
                <Icon className='text-xl' />
              </a>
            ))}
          </div>

          {/* Copyright Section */}
          <div className='text-gray-400 text-sm text-center md:text-right'>
            <p>© {currentYear} · No tracking, feel free to copy and modify.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
