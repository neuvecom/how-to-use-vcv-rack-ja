# ゼロからの VCV Rack

無料のソフトウェア [VCV Rack](https://vcvrack.com/) を使って、モジュラーシンセサイザーの仕組みと音作りを基礎から学ぶ日本語サイトです。DTM がまったく初めての人でもわかることを目指しています。

## 内容

- はじめに：モジュラーシンセの考え方
- 基本編：インストールから最初の音を出すまで
- モジュール解説：モジュールごとの一般人向け解説
- ワークショップ：AmbientModules の Lunar シリーズでアンビエント曲を作る

## 技術構成

- [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)（Markdown で記事を書く静的サイト）
- Firebase Hosting で公開（https://how-to-use-vcv-rack-ja.web.app）
- ログインと受講の進捗管理に Firebase Authentication / Cloud Firestore を使用

## セットアップ

Node.js 22 以上が必要です。

```bash
npm install
npm run dev      # 開発サーバー（http://localhost:4323）
npm run build    # 本番ビルド（dist/ に出力）
npm run preview  # ビルド結果の確認（http://localhost:4323）
```

## 公開（デプロイ）

GitHub Actions で Firebase Hosting に自動デプロイします。

| タイミング | 内容 | ワークフロー |
|---|---|---|
| `main` へのマージ | 本番サイトへ公開 | `.github/workflows/firebase-hosting-merge.yml` |
| PR の作成・更新 | ビルド確認と、7 日間有効なプレビュー URL の発行（PR にコメントされます） | `.github/workflows/firebase-hosting-pull-request.yml` |

デプロイには、GitHub リポジトリの Secret `FIREBASE_SERVICE_ACCOUNT_HOW_TO_USE_VCV_RACK_JA` に Firebase のサービスアカウントキー（JSON）が登録されている必要があります。

## ログインと進捗管理

- ログイン方法: Google アカウント、メールリンク（パスワード不要）。ページは `/login/`
- `基本編`（`basics/`）と `ワークショップ`（`workshop-lunar/`）配下のページは自動でレッスン扱いになり、末尾に「完了」ボタンが付きます
- 進捗は `/mypage/` に表示されます
- データは Firestore の `users/{uid}/progress/{レッスン ID}` に保存されます。アクセス制御は `firestore.rules`（本人のみ読み書き可）です。ルールを変えたら Firebase コンソールの Firestore →「ルール」に貼り付けて公開してください
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
