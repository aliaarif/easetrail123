export default async (req, res) => {
    if (req.url.endsWith('/sitemap.xml')) {
      // Define your site's base URL
      const siteUrl = 'http://localhost:3000';
  
      // Collect your routes (this example has static routes, but you can fetch dynamic ones from an API or database)
      const routes = [
        '/',
        '/about',
        '/contact'
        // ... add other routes or fetch them from a data source
      ];
  
      const xmlContent = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${routes
            .map(route => `
              <url>
                <loc>${siteUrl}${route}</loc>
              </url>
            `)
            .join('')}
        </urlset>
      `;
  
      res.setHeader('Content-Type', 'application/xml');
      res.end(xmlContent);
    } else {
      res.status(404).end();
    }
  };
  