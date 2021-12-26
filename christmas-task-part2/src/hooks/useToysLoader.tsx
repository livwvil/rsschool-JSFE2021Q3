export interface IToy {
  num: number;
  img: string;
  name: string;
  amount: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

interface IFetchedToy {
  num?: string;
  name?: string;
  count?: string;
  year?: string;
  shape?: string;
  color?: string;
  size?: string;
  favorite?: boolean;
}

const transformFetchedToys = (jsonToy: IFetchedToy): IToy | null => {
  if(jsonToy.num === undefined || 
    jsonToy.name === undefined || 
    jsonToy.count === undefined || 
    jsonToy.year === undefined || 
    jsonToy.shape === undefined || 
    jsonToy.color === undefined || 
    jsonToy.size === undefined || 
    jsonToy.favorite === undefined) {
    return null;
  }
  return {
    num: Math.round(parseFloat(jsonToy.num)),
    img: `../../static/toys/${jsonToy.num}.png`,
    name: jsonToy.name,
    amount: Math.round(parseFloat(jsonToy.count)),
    year: Math.round(parseFloat(jsonToy.year)),
    shape: jsonToy.shape,
    color: jsonToy.color,
    size: jsonToy.size,
    favorite: jsonToy.favorite,
  };
};

type ToysLoadedCallback = (toys: IToy[]) => void;

export const useToysLoader = (): [(callback: ToysLoadedCallback) => void] => {
  const loadToys = (callback: ToysLoadedCallback) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('../../static/toys.json')
      .then((resp: Response) => resp.json())
      .then((toysJson: IFetchedToy[]) => {
        callback(toysJson
          .map(transformFetchedToys)
          .filter(toy => toy !== null) as IToy[]);
      }
      );
  };

  return [loadToys];
};
