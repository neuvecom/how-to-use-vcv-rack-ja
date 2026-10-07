# 画面ショットを作成するために、アプリのウインドウの大きさを修正

## 方法

追加の機材やアプリを購入することなく、MacOSの純正の機能をつかって実現できます。

### スクリプトエディタ

⭕️⭕️から起動して、以下のコードを入力し、再生します。

```
tell application "System Events"
	-- 対象にするアプリの名前を指定（例: Safari）
	tell process "VCV Rack 2 Free"
		-- 1番手前にあるウィンドウの [位置] と [サイズ] を指定
		set position of window 1 to {100, 100} -- 左上からの座標（X, Y）
		set size of window 1 to {1440, 900} -- ウィンドウの幅と高さ（横幅, 縦幅）
	end tell
end tell
```

※プロセスでアプリ名を確認する方法

### Appleメニューに登録する

メニューの有効化

スクリプトの移動

動作の確認
