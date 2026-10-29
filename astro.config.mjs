// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
    // 公開 URL（サイトマップや OGP の絶対 URL に使われる）
    // 他コースと同じ neuve.com 配下（GitHub Pages）で公開し、ログイン状態を共有する
    site: 'https://neuve.com',
    base: '/how-to-use-vcv-rack-ja',
    trailingSlash: 'always',
    // 他の開発サーバーと衝突しないよう、既定の 4321 から変更（dev / preview 共通）
    server: { port: 4323 },
    integrations: [
        starlight({
            title: 'ゼロからの VCV Rack',
            // コース共通キット（ログイン状態の表示・レッスン完了の記録）を全ページで読み込む
            head: [
                {
                    tag: 'script',
                    attrs: { type: 'module', src: 'https://neuve.com/learn/kit/neuve-learn.js' },
                },
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
