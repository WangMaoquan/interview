function isVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}

function imageLazyLoad() {
  const images = document.querySelectorAll('img');
  for (let img of images) {
    const realSrc = img.dataset.src;
    if (!realSrc) continue;
    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

window.addEventListener('scroll', throttle(imageLazyLoad, 1000));

// 使用 IntersectionObserver
document.addEventListener('DOMContentLoaded', function () {
  // 观察器
  let io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 当元素出现在浏览器可视窗口内
      if (entry.intersectionRatio > 0) {
        let img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        // 移除观察元素
        io.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy[data-src]').forEach(function (img) {
    // 添加观察元素
    io.observe(img);
  });
});
