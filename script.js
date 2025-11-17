// ----------------------------------------------------
// ▼▼▼ 旅行の出発日時をここに設定 ▼▼▼
// ----------------------------------------------------
const targetDate = new Date(2025, 11, 27, 0, 0, 0);

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('countdown').innerHTML = "旅行中！全力で楽しもう！";
        clearInterval(interval);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = ('0' + days).slice(-2);
    document.getElementById('hours').innerText = ('0' + hours).slice(-2);
    document.getElementById('minutes').innerText = ('0' + minutes).slice(-2);
    document.getElementById('seconds').innerText = ('0' + seconds).slice(-2);
}
const interval = setInterval(updateCountdown, 1000);
updateCountdown();


// ----------------------------------------------------
// ▼▼▼ ページが読み込まれたら、以下の機能をすべて実行 ▼▼▼
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

    // ========== 1. 検索機能 ==========
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const keyword = searchInput.value.toLowerCase().trim();
            if (!keyword) return;

            if (keyword === "ありがとう" || keyword === "みんな大好き") {
                alert("こちらこそ！これからも色んなこ行って楽しもう！");
                searchInput.value = '';
                searchInput.blur();
                return;
            }

            const sections = document.querySelectorAll('section[data-keywords]');
            let found = false;

            for (const section of sections) {
                const keywords = section.dataset.keywords.toLowerCase();
                if (keywords.includes(keyword)) {
                    const targetId = section.id;
                    location.hash = "#" + targetId;
                    
                    const content = section.querySelector('div[class*="-content"]') || section;
                    content.style.transition = 'background-color 0.3s ease-out';
                    content.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                    setTimeout(() => {
                        content.style.backgroundColor = '';
                    }, 1500);

                    found = true;
                    break;
                }
            }

            if (!found) {
                alert('「' + searchInput.value + '」に一致するセクションは見つかりませんでした。\n（例：記録、メンバー、しおり など）');
            }
            searchInput.value = '';
            searchInput.blur();
        });
    }

    // ========== 2. SimpleLightbox 機能 ==========
    // (★) 競合しないよう、ここに1回だけ書く！
    var lightbox = new SimpleLightbox('a.gallery', {
        
        loop: false,            // 【バグ修正】ループを停止
        closeText: '×',
        navText: ['<', '>'],
        
        captionsData: 'alt',    // alt属性をキャプションにする
        captionDelay: 250,
        
        animationSpeed: 250,    // スライドの速さ
        fadeSpeed: 250         // 【バグ修正】閉じる速さ
    });

}); // ← document.addEventListener はここで1回だけ閉じる