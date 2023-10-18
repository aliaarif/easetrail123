// pages/sitemap.xml.js
export default {
    async asyncData({ res }) {
        const siteUrl = 'http://localhost:3000'; // Your site's URL
        
        const { data: cities } = await useAsyncData('cities',
            () => {
                return $fetch(`/api/cities`, {
                    method: 'get'
                })
            }
        )

        const { data: subcategories } = await useAsyncData('subcategories',
            () => {
                return $fetch(`/api/subcategories`, {
                    method: 'get'
                })
            }
        )

        console.log(cities)


        const routes = ['/', '/page2']; // Define the URLs for your sitemap
    
        const sitemapXml = `
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
        res.end(sitemapXml);
        }
  };