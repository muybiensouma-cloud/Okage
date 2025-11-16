// ----------------------------------------------------
// ▼▼▼ 旅行の出発日時をここに設定 ▼▼▼
// (年, 月-1, 日, 時, 分, 秒) 
// ※ 月は0から始まるので、12月なら「11」と入力します。
const targetDate = new Date(2025, 11, 27, 0, 0, 0); // 例: 2025年12月20日 午前9時00分
// ----------------------------------------------------


// カウントダウン処理
function updateCountdown() {
    const now = new Date(); // 現在時刻
    const difference = targetDate - now; // 目標日時と現在時刻の差（ミリ秒）

    // 時間切れ（旅行開始後）の処理
    if (difference <= 0) {
        document.getElementById('countdown').innerHTML = "旅行中！全力で楽しもう！";
        clearInterval(interval); // タイマーを停止
        return;
    }

    // ミリ秒を日・時間・分・秒に変換
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // HTMLに計算結果を表示
    // '0' + ... .slice(-2) は、数字が1桁の時に「05」のように0を付ける（ゼロパディング）ためのテクニックです
    document.getElementById('days').innerText = ('0' + days).slice(-2);
    document.getElementById('hours').innerText = ('0' + hours).slice(-2);
    document.getElementById('minutes').innerText = ('0' + minutes).slice(-2);
    document.getElementById('seconds').innerText = ('0' + seconds).slice(-2);
}

// 1秒ごと(1000ミリ秒)に updateCountdown 関数を実行
const interval = setInterval(updateCountdown, 1000);

// ページ読み込み時に一度実行（チラツキ防止）
updateCountdown();

// ↓↓↓ 既存の SimpleLightbox の初期化コードを... ↓↓↓
document.addEventListener('DOMContentLoaded', function() {
    // 'a.gallery' (class="gallery" を持つ <a> タグ) に機能を適用
    var lightbox = new SimpleLightbox('a.gallery', {
        
        // オプション
        captionsData: 'alt',      // alt 属性をキャプションとして表示
        captionDelay: 250,
        
        /* ↓↓↓ ここからが変更点 ↓↓↓ */
        
        // 1. ループを停止する (これで最後で止まります！)
        loop: false,
        
        // 2. テキストをシンプルに（違和感を減らす）
        closeText: '×',
        navText: ['<', '>']

        /* ↑↑↑ ここまでが変更点 ↑↑↑ */
    });
});
// ↑↑↑ これに丸ごと差し替え ↑↑↑

document.addEventListener('DOMContentLoaded', function() {

    // 検索機能
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const keyword = searchInput.value.toLowerCase().trim();
            if (!keyword) return;

            /* ↓↓↓ ここからイースターエッグを追加 ↓↓↓ */
            if (keyword === "ありがとう" || keyword === "みんな大好き") {
                alert("こちらこそ！これからも色んなとこ行って楽しもう！");
                
                searchInput.value = ''; // 検索窓をクリア
                searchInput.blur(); // 検索窓からフォーカスを外す
                return; // ここで検索処理を終了する
            }
            /* ↑↑↑ ここまで追加 ↑↑↑ */

            const sections = document.querySelectorAll('section[data-keywords]');
            let found = false;

            for (const section of sections) {
                const keywords = section.dataset.keywords.toLowerCase();
                if (keywords.includes(keyword)) {
                    // キーワードが含まれるセクションが見つかった！
                    const targetId = section.id;
                    
                    // スムーズスクロール発火！
                    location.hash = "#" + targetId;
                    
                    //（おまけ）見つかったセクションを一時的に黄色く光らせる
                    const content = section.querySelector('div[class*="-content"]') || section;
                    content.style.transition = 'background-color 0.3s ease-out';
                    content.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // 薄い黄色
                    setTimeout(() => {
                        content.style.backgroundColor = ''; // 元の色に戻す
                    }, 1500); // 1.5秒後に戻す

                    found = true;
                    break; // 最初のヒットで見つかったらループを抜ける
                }
            }

            if (!found) {
                alert('「' + searchInput.value + '」に一致するセクションは見つかりませんでした。\n（例：記録、メンバー、しおり など）');
            }

            searchInput.value = ''; // 検索窓をクリア
            searchInput.blur(); // 検索窓からフォーカスを外す
        });
    }
    // ↑↑↑ 検索機能ここまで ↑↑↑


    // ↓↓↓ 既存の SimpleLightbox の初期化コード (これはそのまま) ↓↓↓
    var lightbox = new SimpleLightbox('a.gallery', {
        loop: false,
        closeText: '×',
        navText: ['<', '>']
    });

});