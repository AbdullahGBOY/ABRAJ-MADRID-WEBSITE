// gallery.js — يجمّع حتى 8 بوستات (4 IG + 4 FB) بدون API
// ✳️ ضع روابط بوستاتك هنا (يمكنك ترك المصفوفات فاضية وسيظهر قسم فيسبوك تلقائياً أسفل الصفحة)
const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DNV4ofItXYV/',
  'https://www.instagram.com/p/DMdUdHbRpaC/',
];

const FACEBOOK_POSTS = [
  'https://www.facebook.com/photo/?fbid=122125169954930217&set=pb.61577906522560.-2207520000',
  'https://www.facebook.com/permalink.php?story_fbid=pfbid0PMche6u9BwBRGx7kqJYjW84Wrf5nvVq7AnRtjPw913eTHXPDADMTgGJijsStVJPTl&id=61577906522560',
];


document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('embed-grid');
  const noPosts = document.getElementById('no-posts');

  const all = [...INSTAGRAM_POSTS.slice(0,4), ...FACEBOOK_POSTS.slice(0,4)];
  if (!all.length) {
    noPosts.hidden = false;
    return;
  }

  const cards = all.map(url => {
    if (/instagram\.com\/p\//i.test(url) || /instagram\.com\/reel\//i.test(url)) {
      return `
      <div class="embed-card glow-box">
        <div class="inner">
          <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14">
            <a href="${url}" target="_blank" rel="noopener">Instagram Post</a>
          </blockquote>
        </div>
      </div>`;
    } else if (/facebook\.com/i.test(url)) {
      return `
      <div class="embed-card glow-box">
        <div class="inner">
          <div class="fb-post" data-href="${url}" data-width="auto"></div>
        </div>
      </div>`;
    } else {
      return '';
    }
  }).join('');

  grid.innerHTML = cards;

  // تفعيل الـ embeds
  if (window.instgrm && instgrm.Embeds) instgrm.Embeds.process();
  if (window.FB && FB.XFBML) FB.XFBML.parse();
});
