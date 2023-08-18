import '~/styles/globals.css';
import type { GetStaticProps, Metadata } from 'next';
import { Jost } from 'next/font/google';
import { Suspense } from 'react';
import Loader from '~/components/ui/Loader';
import Header from '~/components/sections/Header';
import Hero from '~/components/sections/Hero';
import About from '~/components/sections/About';
import Project from '~/components/sections/Project';
import Blog from '~/components/sections/Blog';
import { GraphQLClient } from 'graphql-request';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAllPosts();

  console.log(data);

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
              <About />
              <Project />
              <Blog posts={data.blogs} />
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

async function getAllPosts() {
  const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clkrxbcan31rq01t6goqef4z7/master'
  );

  const { projects, blogs } = await hygraph.request(
    `
   {
      projects {
        title
        desc
        bgColor {
          css
        }
        codeUrl
        image
        liveUrl
      }
      blogs {
        id
        title
        slug
        content {
          text
        }
        tags
        category {
          title
        }
      }
    }
    `
  );

  return {
    projects,
    blogs,
  };
}
