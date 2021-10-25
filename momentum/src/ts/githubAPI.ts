
function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export async function* getNextUrl (amount: number, currentTimeOfDay: string) {
  const indices: number[] = [];
  for (let i = 0; i < amount; i++) {
    indices.push(i);
  }

  shuffleArray(indices);

  for (let i = 0; i < amount; i++) {
    const imageNumberStr = (indices[i] + 1).toString().padStart(2, "0");
    yield `https://raw.githubusercontent.com/livwvil/stage1-tasks/assets/images/${currentTimeOfDay}/${imageNumberStr}.jpg`;
  }
  return null;
};