'use strict';

const openBtn = document.querySelector(".header__btn");
const closeBtn = document.querySelector(".nav__btn");
const nav = document.getElementById("g-nav");
const spResBtn = document.querySelector('.reservation-round-btn-wrapper--sp');
let isFooterIntersecting = false;

if (openBtn && nav) {
  openBtn.addEventListener("click", () => {
    nav.classList.add("open");
    if (spResBtn) spResBtn.classList.add("is-hidden");
  });
}

if (closeBtn && nav) {
  closeBtn.addEventListener("click", () => {
    nav.classList.remove("open");
    if (spResBtn && !isFooterIntersecting) {
      spResBtn.classList.remove("is-hidden");
    }
  });
}


// opning

document.addEventListener('DOMContentLoaded', () => {
  const mask = document.getElementById('opening-mask');
  const logo = document.getElementById('anim-logo');
  const subtexts = document.getElementById('anim-subtexts');

  // 1. ページ読み込み後、1.2秒間は最初の美しい状態（1枚目）を静止して見せる
  
  // 2. 1.2秒後、日本語コピーを消しながら中央へ合体
  setTimeout(() => {
    subtexts.classList.add('is-fadeout');
    logo.classList.add('is-merged');
  }, 1200);

  // 3. 2.0秒後、中央でピタッと重なったらテキストを「NUURA」に書き換える
  setTimeout(() => {
    logo.innerHTML = 'NUURA';
    logo.classList.add('is-centered');
  }, 2000);

  // 4. 2.6秒後、目的地のヘッダー位置（左上またはスマホなら中央上）へ移動開始 ＆ 白文字化
  setTimeout(() => {
    logo.classList.add('is-moved');
  }, 2600);

  // 5. 3.6秒後、移動完了と同時に白い幕を消し、本番のWebサイト（画像やナビなど）を表に出す
  setTimeout(() => {
    mask.classList.add('is-hide');
    document.body.classList.remove('opening-active');
    document.body.classList.add('opening-done');
  }, 2800);
});

// 予約ポリシーのアコーディオン
$(function() {
    $('.reservation-policy-q-wrap').on('click', function() {
        $(this).toggleClass('is-open');
        $(this).next('.reservation-policy-a').slideToggle();
    });
});

// Q&Aのアコーディオン
$(function() {
    $('.question-q').on('click', function() {
        const $item = $(this).closest('.question-item');
        const $answer = $item.find('.question-a');

        // クリックされた項目の状態を切り替える
        if ($item.hasClass('is-open')) {
            $item.removeClass('is-open');
            $answer.slideUp(300);
        } else {
            $item.addClass('is-open');
            $answer.css('display', 'flex').hide().slideDown(300);
        }
    });
});

const arcElements = document.querySelectorAll('.js-arcText');
if (arcElements.length > 0) {
  arcElements.forEach(el => {
    const text = el.innerText;
    const chars = text.split("");
    const totalChars = chars.length;

    el.innerText = ""; // 元のテキストをクリア

    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;
      const angle = (360 / totalChars) * i;
      span.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      el.appendChild(span);
    });
  });
}

// ヘッダーの背景切り替えロジック
const header = document.querySelector('.js-header');
const sentinel = document.querySelector('.js-centinel-header');

if (header && sentinel) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // センチネルが「画面外」かつ「画面より上」にある場合のみクラスを追加
      // それ以外（画面内にある、または画面より下にある）の場合は削除
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        header.classList.add('is-white');
      } else {
        header.classList.remove('is-white');
      }
    });
  }, {
    threshold: 0
  });

  headerObserver.observe(sentinel);
}

// フッター到達時に予約ボタンを隠す制御
const footer = document.querySelector('.footer');

if (spResBtn && footer) {
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isFooterIntersecting = entry.isIntersecting;
      if (isFooterIntersecting || (nav && nav.classList.contains("open"))) {
        spResBtn.classList.add('is-hidden');
      } else {
        spResBtn.classList.remove('is-hidden');
      }
    });
  }, { threshold: 0.1 });
  footerObserver.observe(footer);
}
