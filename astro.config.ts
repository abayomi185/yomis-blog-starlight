// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Yomi's Blog",
      plugins: [starlightBlog()],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/abayomi185'
        },
        {
          icon: 'instagram',
          label: 'Instagram',
          href: 'https://instagram.com/yomi185'
        },
        {
          icon: 'linkedin',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/yomi-ikuru'
        }
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' }
          ]
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' }
        }
      ]
    })
  ],
  site: 'https://yomis.blog'
});
