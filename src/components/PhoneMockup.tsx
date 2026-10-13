import Image from 'next/image';
import type { Locale } from '@/i18n/locales';

const ui: Record<Locale, { levels: string; tiles: string[]; continue: string; lesson: string; meta: string; practice: string; tabs: string[] }> = {
  vi: { levels: 'Học theo cấp độ', tiles: ['Nhập môn', 'Sơ cấp 1', 'Sơ cấp 2', 'TOPIK'], continue: 'Tiếp tục học', lesson: 'Phụ âm tiếng Hàn', meta: 'Nhập môn', practice: 'Luyện tập', tabs: ['Trang chủ', 'Khám phá', 'Ôn tập', 'Cá nhân'] },
  en: { levels: 'Learn by level', tiles: ['Intro', 'Beginner 1', 'Beginner 2', 'TOPIK'], continue: 'Continue', lesson: 'Korean consonants', meta: 'Introduction', practice: 'Practice', tabs: ['Home', 'Explore', 'Review', 'Profile'] },
  zh: { levels: '分级学习', tiles: ['入门', '初级 1', '初级 2', 'TOPIK'], continue: '继续学习', lesson: '韩语辅音', meta: '入门', practice: '练习', tabs: ['首页', '探索', '复习', '我的'] },
};

/** Decorative illustration drawn in HTML/CSS (no fake stats). Replace with real screenshots when available. */
export function PhoneMockup({ locale, caption }: { locale: Locale; caption: string }) {
  const s = ui[locale];
  return (
    <figure className="phone-figure">
      <div className="phone" aria-hidden="true">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="ph-top">
            <Image src="/icon-512.png" alt="" width={28} height={28} />
          </div>
          <div className="ph-card ph-continue">
            <div className="ph-thumb" lang="ko">한글</div>
            <div>
              <div className="ph-muted">{s.continue}</div>
              <div className="ph-strong">{s.lesson}</div>
              <div className="ph-muted">{s.meta}</div>
            </div>
          </div>
          <div className="ph-title">{s.levels}</div>
          <div className="ph-grid">
            {s.tiles.map((t, i) => (
              <div key={t} className="ph-tile">
                <span className={`ph-dot ph-dot-${i}`} />
                {t}
              </div>
            ))}
          </div>
          <div className="ph-title">{s.practice}</div>
          <div className="ph-card ph-video">
            <div className="ph-play" />
          </div>
          <div className="ph-tabs">
            {s.tabs.map((t, i) => (
              <span key={t} className={i === 0 ? 'active' : undefined}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="visually-hidden">{caption}</figcaption>
    </figure>
  );
}
