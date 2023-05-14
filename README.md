# Sentencify

## 概要

英文をアウトプットする際の語彙力をアップさせるためのサービスです。
英語学習を進める上で自分の理解が不十分であったり、理解して使えるようになりたいと思った英文を登録し、ライティング・リスニング・スピーキングを通じて利用者に浸透させることを目的としています。
また OpenAI API を利用した英文生成機能を活用し、登録した一つの英文を元にさまざまな観点から英文理解を促進させます。(機能拡充中)

## サインアップ画面

https://sentencify-frontend.fly.dev/signup

## サインイン画面

https://sentencify-frontend.fly.dev/signin

## 英文一覧画面

https://sentencify-frontend.fly.dev/documents

この画面では以下のことが可能です

1. 新規英文作成
2. 作成済の英文を選択して編集画面に遷移
3. 英文を削除

---

![Documents](/frontend/public/img/indications/documents.png "Documents")

## 英文編集画面

この画面では以下のことが可能です

1. マークピッカー(常に表示マーク/注意マーク/通常マーク)
2. 保存
3. 表示/非表示切り替え
4. 英文読み上げ
5. 英文一覧画面に戻る
6. 次の英文に進む
7. 現在の英文を編集する
8. OpenAI を利用して指定されたフレーズを使った英文を新しく生成する
9. 英文の翻訳内容(通常は英文入力時に自動翻訳されます)
10. 一時的なメモ 保存はされません

---

![Document](/frontend/public/img/indications/document.png "Document")
