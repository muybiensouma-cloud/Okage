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