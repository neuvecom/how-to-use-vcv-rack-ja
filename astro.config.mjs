// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
    // 公開 URL（サイトマップや OGP の絶対 URL に使われる）
    site: 'https://how-to-use-vcv-rack-ja.web.app',
    // 他の開発サーバーと衝突しないよう、既定の 4321 から変更（dev / preview 共通）
    server: { port: 4323 },
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
