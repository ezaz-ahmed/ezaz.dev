import IconCloud from './ui/icon-cloud'

const slugs = [
  'typescript',
  'javascript',
  'react',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'drizzle',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'nestjs',
  'figma',
]

function IconCloudDemo() {
  return (
    <div className='relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent'>
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}

export default IconCloudDemo
