// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'TypeForms',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: {
				github: 'https://github.com/chrisfallas/typeforms',
			},
			sidebar: [
				{ label: 'Introduction', link: '/' },
				{
					label: 'Getting Started',
					autogenerate: { directory: 'overview' },
				},
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Hooks',
          autogenerate: { directory: 'hooks' },
        },
        // {
        //   label: 'Exported Types',
        //   autogenerate: { directory: 'types' },
        // },
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
