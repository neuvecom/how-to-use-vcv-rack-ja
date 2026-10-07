// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
    integrations: [
        starlight({
            title: 'ゼロからの VCV Rack',
            defaultLocale: 'root',
            locales: {
                root: { label: '日本語', lang: 'ja' },
            },
            sidebar: [
                { label: 'はじめに', slug: 'intro' },
                { label: '基本編', items: [{ autogenerate: { directory: 'basics' } }] },
                { label: 'モジュール解説', items: [{ autogenerate: { directory: 'modules' } }] },
                { label: 'ワークショップ：Lunar でアンビエント', items: [{ autogenerate: { directory: 'workshop-lunar' } }] },
                { label: '用語集', slug: 'glossary' },
            ],
        }),
    ],
});
