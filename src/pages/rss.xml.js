import rss from '@astrojs/rss';
import { HASHNODE_API_URL, HASHNODE_USERNAME } from '@src/constants';

export async function GET(context) {
  const response = await fetch(HASHNODE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          user(username: "ezaz") {
            posts (page: 1, pageSize: 20) {
              edges {
                node {
                  title
                  url
                  publishedAt
                  readTimeInMinutes
                }
              }
            }
          }
        }      
      `,
      variables: {
        name: HASHNODE_USERNAME,
      },
    }),
  });

  const { data } = await response.json();

  console.log(data.user.posts)

  return rss({
    title: 'Ezaz.dev',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: []
  });
}