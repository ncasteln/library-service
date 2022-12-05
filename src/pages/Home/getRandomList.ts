const getRandomList = (n: number, min: number = 0, max: number = 10): number[] => {
  const list: number[] = [];
  while (list.length != n) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (list.includes(randomNumber)) {
      continue
    }
    list.push(randomNumber);
  }
  return list;
}

export default getRandomList;
