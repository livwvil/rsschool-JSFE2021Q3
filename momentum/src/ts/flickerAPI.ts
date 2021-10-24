const API_KEY = "b58301c7eeb6d2ab498252d8612244fd";
const API_SEARCH_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&media=photos&tag_mode=all`;
const API_PHOTO_SIZES_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}`;

const getSearchHref = (tags: string, amount: number) => {
  return `${API_SEARCH_ENDPOINT}&tags=${tags}&per_page=${String(amount)}`;
};

const getSizesHref = (photoId: string) => {
  return `${API_PHOTO_SIZES_ENDPOINT}&photo_id=${photoId}`;
};

async function getXmlAsDocument(href: string) {
  const resp = await fetch(href);
  const text = await resp.text();
  const doc = new window.DOMParser().parseFromString(text, "text/xml");
  return doc;
}

interface FlickerImage {
  id: string;
  title: string;
}

interface FlickerImageSize {
  width: number;
  height: number;
  source: string;
}

async function getImages(tags: string, amount: number) {
  const findResultDocument = await getXmlAsDocument(
    getSearchHref(tags, amount)
  );
  const photoDescriptors = findResultDocument.querySelectorAll("photo");

  const images: FlickerImage[] = [...photoDescriptors].map((photo) => {
    return {
      id: photo.getAttribute("id") || "",
      title: photo.getAttribute("title") || "",
    };
  });

  return images;
}

async function getImageUrl(imageId: string) {
  const photoSizes = await getXmlAsDocument(getSizesHref(imageId));
  const sizeDescriptors = photoSizes.querySelectorAll("size");
  const sizes: FlickerImageSize[] = [...sizeDescriptors].map((size) => {
    const w = parseFloat(size.getAttribute("width") || "");
    const h = parseFloat(size.getAttribute("height") || "");
    return {
      width: isNaN(w) ? 0 : w,
      height: isNaN(h) ? 0 : h,
      source: size.getAttribute("source") || "",
    };
  });

  sizes.sort((a, b) => {
    return b.width - a.width;
  });

  const result = sizes.filter((size) => {
    const sizeCond = 1080 <= size.width && size.width <= 2600;
    const ratioCond = size.width / size.height > 1;
    return sizeCond;
  });

  if (result.length === 0) {
    return null;
  } else {
    return result[0].source;
  }
}

export async function* getNextUrl(imageTags: string, urlsAmount: number) {
  const images = await getImages(imageTags, urlsAmount * 10);
  let urlsFound = 0;
  for (const image of images) {
    if (urlsFound >= urlsAmount) {
      break;
    }

    const url = await getImageUrl(image.id);
    if (url) {
      urlsFound++;
      yield url;
    }
  }

  return null;
}
