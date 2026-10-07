// Medidas originais dos fundos. Posição e altura do animal são frações da imagem.
// x/y marcam o apoio dos pés; height controla a altura total do animal.
export const animalScenes = {
  cachorro: { width: 2816, height: 1536, animal: { x: 0.55, y: 0.855, height: 0.38 } },
  sapo: { width: 2816, height: 1536, animal: { x: 0.51, y: 0.655, height: 0.35 } },
  tartaruga: { width: 2816, height: 1536, animal: { x: 0.85, y: 0.86, height: 0.19 } },
  passaro: { width: 1024, height: 559, animal: { x: 0.40, y: 0.61, height: 0.32, anchorPart: 'patas' } },
  elefante: { width: 1024, height: 559, animal: { x: 0.53, y: 0.80, height: 0.43 } },
  urso: { width: 2816, height: 1536, animal: { x: 0.51, y: 0.88, height: 0.38 } },
};

export function getSceneLayout(viewport, scene, animalBox, supportBox = animalBox) {
  // Equivalente a object-fit: cover: ocupa todo o canvas sem distorcer o fundo.
  const sceneScale = Math.max(viewport.width / scene.width, viewport.height / scene.height);
  const width = scene.width * sceneScale;
  const height = scene.height * sceneScale;
  // Em telas muito estreitas, limita o animal para não cortar suas peças.
  const scale = Math.min(
    (height * scene.animal.height) / animalBox.height,
    Math.max(1, viewport.width - 24) / animalBox.width,
    Math.max(1, viewport.height - 80) / animalBox.height,
  );
  const supportX = supportBox.x + supportBox.width / 2;
  const supportY = supportBox.y + supportBox.height;
  const localX = width * scene.animal.x - supportX * scale;
  const localY = height * scene.animal.y - supportY * scale;
  const centerX = localX + (animalBox.x + animalBox.width / 2) * scale;
  const bottomY = localY + (animalBox.y + animalBox.height) * scale;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  // A câmera acompanha o animal, mas nunca desloca o fundo além das bordas.
  const x = clamp(viewport.width / 2 - centerX, viewport.width - width, 0);
  const y = clamp(Math.min(viewport.height * 0.855, viewport.height - 80) - bottomY, viewport.height - height, 0);
  return {
    background: { x, y, width, height },
    scale,
    offsetX: x + localX,
    offsetY: y + localY,
  };
}
