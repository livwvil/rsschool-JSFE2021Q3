const API_KEY = "b58301c7eeb6d2ab498252d8612244fd";
const API_SEARCH_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&sort=interestingness-desc&content_type=7&media=photos&&extras=url_h,tags&format=json&nojsoncallback=1`;

interface ApiResponse {
  stat: string;
  photos: Photos;
}

interface Photos {
  page: number;
  pages: number;
  perpage: number;
  photo: Photo[];
  total: number;
}

interface Photo {
  farm: number;
  height_h: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  tags: string;
  title: string;
  url_h: string;
  width_h: number;
}

const getSearchHref = (tags: string) => {
  return `${API_SEARCH_ENDPOINT}&tags=${tags}`;
};

async function getApiResponse(href: string) {
  try {
    const resp = await fetch(href);
    const respJson: ApiResponse = await resp.json();
    if (respJson.stat === "ok") {
      return respJson.photos;
    } else {
      throw new Error();
    }
  } catch (e) {
    return null;
  }
}

let foundImages: number;

export async function* getNextUrl(imageTags: string) {
  const href = getSearchHref(imageTags);
  const response = await getApiResponse(href);
  if (response) {
    foundImages = response.photo.length;
    for (const link of response.photo) {
      if(link.url_h) {
        yield link.url_h;
      }
    }
  }
  return null;
}

export function getLastRequestedImagesAmount() {
  return foundImages;
}
