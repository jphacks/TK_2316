# SADISxTECH

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2023/07/JPHACKS2023_ogp.png)](https://www.youtube.com/watch?v=yYRQEdfGjEg)

## 製品概要

表向きはサディストのための、昨今の社会風潮へのアンチテーゼツールです。
ブラウザ行動を監視して、静かに暴力性を吐き出してもらえるようtechで解決します。

[プレゼン](https://www.canva.com/design/DAFyjDwYudg/uFacFqQrZyGtH29hhGCiKA/view?utm_content=DAFyjDwYudg&utm_campaign=designshare&utm_medium=link&utm_source=editor)

### 背景(製品開発のきっかけ、課題等）

気楽に暴力もふるえない世知辛い世の中になりました。

[link](https://www.stat.go.jp/data/kokusei/2005/sokuhou/03.htm)


この問題を解決するためのchrome拡張機能を開発しました。

この機能「SADISTECH」をオンにすると、画面のクリックイベントのたびに公式キャラ「M」を鞭でたしなめることができます。


### 製品説明（具体的な製品の説明）

- chromeを起動し拡張機能にアクセス。

- startボタンをおし計測開始

- キー入力を検知するとMを鞭でたしなめることができる

- ストップボタンで計測終了

- リンクからキー入力回数のランキングを確認できる


### 特長
#### 1. chromeの拡張機能なので気軽に使える。
#### 2. 普段のデスクワークを少し豊かにする。
#### 3. ハラスメントに対処可能

### 解決出来ること
一見ネタアプリに見えますが、ユーザーのブラウザ行動をログるため、使いすぎ警告をはじめとして、
ウェルネスやウェルビーイングとしての本来機能による拡張性をもっています。

### 今後の展望
### 注力したこと（こだわり等）
*
*

## 開発技術
### 活用した技術
#### API・データ
*
#### ファイルの構成(**で説明追記)
```
├─doc  *進捗確認などあらゆるドキュメント*
├─example  *chrome拡張機能に関するプログラム練習場所*
│  ├─background-to-content_script
│  ├─challenge_background_counter
│  ├─chrome-alarms
│  ├─chrome-basics
│  ├─chrome-basics -2
│  │  └─images
│  ├─click-counter
│  │  └─models
│  │      └─gltf
│  ├─counter_failed
│  │  └─images
│  ├─type_counter
│  ├─type_counter_2
│  └─type_counter_2 - コピー
├─ext  *本番環境*
└─web  *ランキング機能について*
    ├─.devcontainer
    ├─controllers
    ├─models
    ├─routes
    ├─static
    └─views
```

#### フレームワーク・ライブラリ・モジュール
- gin
- next.js
- three.js
- docker

#### デバイス
- PC

### 独自技術
#### ハッカソンで開発した独自機能・技術
* 独自で開発したものの内容をこちらに記載してください
* 特に力を入れた部分をファイルリンク、またはcommit_idを記載してください。

#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
*
*
