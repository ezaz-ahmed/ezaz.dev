import rss from '@astrojs/rss';

export async function GET(context) {
  const response = await fetch("https://gql.hashnode.com/", {
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
        name: "ezaz",
      },
    }),
  });

  const { data } = await response.json();

  return rss({
    title: 'Ezaz.dev',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: []
  });
}