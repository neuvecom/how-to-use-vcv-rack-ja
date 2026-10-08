// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 公開 URL（サイトマップや OGP の絶対 URL に使われる）
const SITE = 'https://how-to-use-vcv-rack-ja.web.app';

export default defineConfig({
    site: SITE,
    // 他の開発サーバーと衝突しないよう、既定の 4321 から変更（dev / preview 共通）
    server: { port: 4323 },
    integrations: [
        starlight({
            title: 'ゼロからの VCV Rack',
            description: 'DTM がまったく初めての人でもわかる、VCV Rack（無料のバーチャル・モジュラーシンセ）の日本語ハウツーサイト',
            favicon: '/favicon.svg',
            // 全ページ共通の OGP / Twitter カード画像と、iOS 用アイコン
            // （og:title / og:description / og:url は Starlight がページごとに出力する）
            head: [
                { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og-image.png` } },
                { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
                { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
                { tag: 'meta', attrs: { property: 'og:image:alt', content: 'ゼロからの VCV Rack' } },
                { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og-image.png` } },
                { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
            ],
            components: {
                // ヘッダーにログイン状態、レッスン末尾に「完了」ボタンを表示する
                SocialIcons: './src/components/AuthStatus.astro',
                Footer: './src/components/LessonFooter.astro',
            },
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
