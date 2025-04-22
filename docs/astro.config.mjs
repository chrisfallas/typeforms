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
					label: 'Overview',
					autogenerate: { directory: 'overview' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
