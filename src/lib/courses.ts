// 進捗を記録するコースの定義
// レッスン = 各ディレクトリ配下のページ（ディレクトリ直下の index は概要ページなので除く）
export const courses = [
    { prefix: 'basics', title: '基本編' },
    { prefix: 'workshop-lunar', title: 'ワークショップ：Lunar でアンビエント' },
] as const;

/** 全コース共通の進捗データ（Firestore の users/{uid}/courses/{COURSE_ID}）でこのサイトを表す ID */
export const COURSE_ID = 'vcv-rack';

/** ページ ID（例: basics/install）が進捗記録の対象レッスンかどうか */
export function isLesson(id: string): boolean {
    return courses.some((course) => id.startsWith(`${course.prefix}/`));
}
