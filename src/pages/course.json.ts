// 全コース共通ポータル（neuve.com/learn/）のマイページが読むレッスン一覧
// 並びはサイドバーと同じ（コース順 → order → タイトル順）
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COURSE_ID, courses } from '../lib/courses';

export const GET: APIRoute = async () => {
    const docs = await getCollection('docs');
    const lessons = courses.flatMap((course) =>
        docs
            .filter((entry) => entry.id.startsWith(`${course.prefix}/`))
            .sort(
                (a, b) =>
                    (a.data.sidebar.order ?? Infinity) - (b.data.sidebar.order ?? Infinity) ||
                    a.data.title.localeCompare(b.data.title, 'ja')
            )
            .map((entry) => ({ id: entry.id, title: entry.data.title, url: `${entry.id}/` }))
    );
    return new Response(JSON.stringify({ id: COURSE_ID, title: 'ゼロからの VCV Rack', lessons }, null, 2), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
};
