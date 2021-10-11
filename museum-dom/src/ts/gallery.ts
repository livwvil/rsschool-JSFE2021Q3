const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(
  ".gallery-section-wrapper .art-gallery img"
);

export function activateGalleryBubbling() {
  images.forEach((img) => {
    if (!img) {
      return;
    }

    img.classList.add("bubbling");
    document.addEventListener("scroll", () => {
      const image = img;
      const pos = image.getBoundingClientRect().top;
      const screenHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (pos <= screenHeight) {
        image.classList.add("bubbled");
      } else {
        image.classList.remove("bubbled");
      }
    });
  });
}
