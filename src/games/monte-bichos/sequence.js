export function shuffleAnimals(animals, previousAnimal = null) {
  const sequence = [...animals];
  for (let index = sequence.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [sequence[index], sequence[randomIndex]] = [sequence[randomIndex], sequence[index]];
  }
  // Evita repetir o último animal na passagem para uma nova rodada.
  if (sequence.length > 1 && sequence[0] === previousAnimal) {
    const nextIndex = 1 + Math.floor(Math.random() * (sequence.length - 1));
    [sequence[0], sequence[nextIndex]] = [sequence[nextIndex], sequence[0]];
  }
  return sequence;
}
