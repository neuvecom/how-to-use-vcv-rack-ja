# ゼロからの VCV Rack

無料のソフトウェア [VCV Rack](https://vcvrack.com/) を使って、モジュラーシンセサイザーの仕組みと音作りを基礎から学ぶ日本語サイトです。DTM がまったく初めての人でもわかることを目指しています。

## 内容

- はじめに：モジュラーシンセの考え方
- 基本編：インストールから最初の音を出すまで
- モジュール解説：モジュールごとの一般人向け解説
- ワークショップ：AmbientModules の Lunar シリーズでアンビエント曲を作る

## 技術構成

- [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)（Markdown で記事を書く静的サイト）
- GitHub Pages で公開（https://neuve.com/how-to-use-vcv-rack-ja/）。旧 URL（https://how-to-use-vcv-rack-ja.web.app）は Firebase Hosting で 301 転送
- ログインと受講の進捗管理は、neuve 学習コース共通のキット（[neuvecom/learn](https://github.com/neuvecom/learn) の `kit/neuve-learn.js`）と Firebase Authentication / Cloud Firestore を使用

## セットアップ

Node.js 22 以上が必要です。

```bash
npm install
npm run dev      # 開発サーバー（http://localhost:4323/how-to-use-vcv-rack-ja/）
npm run build    # 本番ビルド（dist/ に出力）
npm run preview  # ビルド結果の確認（http://localhost:4323/how-to-use-vcv-rack-ja/）
```

## 公開（デプロイ）

GitHub Actions で自動デプロイします。

| タイミング | 内容 | ワークフロー |
|---|---|---|
| `main` へのマージ | GitHub Pages へ公開 | `.github/workflows/deploy.yml` |
| `main` へのマージ（転送設定の変更時のみ） | 旧 URL の転送設定を Firebase Hosting へ反映 | `.github/workflows/firebase-hosting-merge.yml` |
| PR の作成・更新 | ビルド確認 | `.github/workflows/ci.yml` |

転送設定の反映には、GitHub リポジトリの Secret `FIREBASE_SERVICE_ACCOUNT_HOW_TO_USE_VCV_RACK_JA` に Firebase のサービスアカウントキー（JSON）が登録されている必要があります。

## ログインと進捗管理

- ログイン・マイページは全コース共通のポータル（https://neuve.com/learn/）にあります。旧 `/login/`・`/mypage/` はポータルへ転送します
- ヘッダーの `<neuve-auth>` がログイン状態を表示します。neuve.com 配下の全コースでログイン状態を共有します
- `基本編`（`basics/`）と `ワークショップ`（`workshop-lunar/`）配下のページは自動でレッスン扱いになり、末尾に完了ボタン（`<neuve-lesson-done>`）が付きます
- レッスン一覧は `/course.json` としてビルド時に書き出し、ポータルのマイページが読み込みます
- データは Firestore の `users/{uid}/courses/vcv-rack/lessons/{レッスン ID}` に保存されます。以前の `users/{uid}/progress/{レッスン ID}` のデータは、ログイン時に新しい場所へ自動で移します
- Firestore のアクセス制御は全コース共通で、このリポジトリの `firestore.rules`（本人のみ読み書き可）で管理しています。ルールを変えたら Firebase コンソールの Firestore →「ルール」に貼り付けて公開してください
- 対象コースを増やすときは `src/lib/courses.ts` に追加します

## 記事の追加

`src/content/docs/` 配下に Markdown（`.md` / `.mdx`）を置くとページになります。

| ディレクトリ | 内容 |
|---|---|
| `src/content/docs/basics/` | 基本編 |
| `src/content/docs/modules/` | モジュール解説 |
| `src/content/docs/workshop-lunar/` | Lunar ワークショップ |

並び順は各ファイルの frontmatter の `sidebar.order` で指定します。

## 開発ドキュメント

計画や作業ログは `docs-dev/` にあります（サイトには公開されません）。
