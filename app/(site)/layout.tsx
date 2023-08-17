import '~/styles/globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { Suspense } from 'react';
import Loader from '~/components/ui/Loader';
import Header from '~/components/sections/Header';
import Hero from '~/components/sections/Hero';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  description:
    'Ezaz Ahmed is a software engineer from Bangladesh. He is passionate about writing codes and developing web applications to solve real-life challenges.',
  authors: {
    name: 'Ezaz Ahmed',
    url: 'https://ezaz.dev',
  },
  creator: 'Ezaz Ahmed',
  title: 'Ezaz Ahmed | Software Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={jost.className}>
        {/* <Loader>@Ezaz</Loader> */}

        {/* <Suspense fallback={<Loader>ezaz.dev</Loader>}>{children}</Suspense> */}

        <div className='bg-bglight dark:bg-bgdark overflow-hidden'>
          <div className='selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark'>
            <Header />
            <main id='main'>
              <Hero />
            </main>
            {/* <SkipToMain />
            <Header />
            <main id='main'>
              <HeroSection />
              <AboutSection />
              <ProjectSection />
              <BlogSection posts={blogPosts} />
              <ContactSection />
            </main>
            <SocialLinks page='index' />
            <Footer /> */}
          </div>
        </div>
      </body>
    </html>
  );
}
