export async function* getNextUrl(amount: number, currentTimeOfDay: string) {
  let cur = Math.ceil(Math.random() * (amount - 1));

  while (true) {
    const imageNumberStr = ((cur % amount) + 1).toString().padStart(2, "0");
    cur = cur > amount ? 0 : cur + 1;
    yield `https://raw.githubusercontent.com/livwvil/stage1-tasks/assets/images/${currentTimeOfDay}/${imageNumberStr}.jpg`;
  }
  return null;
}
