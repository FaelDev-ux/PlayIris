import interact from "interactjs";
import { Button } from '../../components/ui/Button.jsx';
import { createCelebration } from './celebration.js';
import { getSceneLayout } from './scene.js';

export function mountAnimalPuzzle(
  gameContainer,
  animalConfig,
  { onContinue, soundEnabled = true } = {},
) {
  const source = new DOMParser().parseFromString(
    animalConfig.svg,
    "image/svg+xml",
  );
  const pieces = animalConfig.parts.map((part) => ({
    ...part,
    element: document.importNode(source.getElementById(part.id), true),
    placed: false,
    position: { x: 0, y: 0 },
    dragging: false,
  }));
  let stage, world, referenceGroup, tray;
  let layout;
  let selectedPiece = null;
  let background;
  let completed = false;
  let sceneAnimation;
  const celebration = createCelebration({
    sound: animalConfig.sound, soundEnabled,
    revealBackground() { if (background) background.style.opacity = '1'; },
  });
  const reference = pieces.map((piece) => {
    const copy = piece.element.cloneNode(true);
    copy.removeAttribute("id");
    return copy;
  });
  function selectPiece(piece) {
    selectedPiece = piece;
    pieces.forEach((item) => {
      const selected = item === piece;
      item.card.style.boxShadow = selected ? "inset 0 0 0 3px #387ff5" : "";
      item.element.style.filter = selected
        ? "drop-shadow(0 0 5px #387ff5)"
        : "";
    });
  }
  const animal = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1 1"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
      role="img"
      aria-label={`${animalConfig.name} para montar`}
    >
      <g ref={(element) => (world = element)}>
        <g
          ref={(element) => (referenceGroup = element)}
          className="opacity-20 grayscale"
          aria-hidden="true"
        >
          {reference}
        </g>
        {pieces.map((piece) => piece.element)}
      </g>
    </svg>
  );
  const board = (
    <div className="relative h-full min-h-0">
      <div className="h-full">
        <div
          ref={(element) => (stage = element)}
          className="relative h-full overflow-hidden"
        >
          {animalConfig.background && <img ref={(element) => (background = element)} src={animalConfig.background} alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none opacity-0 transition-opacity duration-1000 motion-reduce:transition-none" />}
          {animal}
          <div
            ref={(element) => (tray = element)}
            role="region"
            aria-label="Peças do animal"
            tabIndex="0"
            className="absolute z-0 flex gap-3 overscroll-contain rounded-2xl bg-white/60 p-3 focus-visible:ring-4 focus-visible:ring-azul-iris/30"
          >
            {pieces.map((piece) => {
              const preview = piece.element.cloneNode(true);
              preview.removeAttribute("id");
              return (
                <div
                  ref={(element) => (piece.card = element)}
                  className="max-w-60 max-h-60 relative flex shrink-0 items-center justify-center rounded-xl bg-white/80 cursor-grab"
                  aria-label={piece.label}
                >
                  <svg
                    ref={(element) => (piece.preview = element)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none h-full w-full"
                    aria-hidden="true"
                  >
                    {preview}
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  gameContainer.replaceChildren(board);
  pieces.forEach((piece) => {
    piece.bounds = piece.element.getBBox();
    piece.element.style.display = "none";
  });
  const referenceBox = referenceGroup.getBBox();
  const supportBox = pieces.find((piece) => piece.id === animalConfig.scene?.animal.anchorPart)?.bounds ?? referenceBox;

  function updatePosition(piece) {
    piece.element.setAttribute(
      "transform",
      `translate(${piece.position.x} ${piece.position.y})`,
    );
  }
  function resizeBoard() {
    const { width, height } = stage.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    sceneAnimation?.cancel();
    const portrait = window.innerWidth < window.innerHeight;
    const padding = 12;
    const traySize = portrait
      ? Math.min(210, height * 0.3)
      : Math.min(250, width * 0.25);
    const target = portrait
      ? {
          x: padding,
          y: 56,
          width: width - padding * 2,
          height: height - traySize - 68,
        }
      : {
          x: padding,
          y: padding,
          width: width - traySize - padding * 3,
          height: height - padding * 2,
        };
    let scale = Math.max(
      0.001,
      Math.min(
        target.width / referenceBox.width,
        target.height / referenceBox.height,
      ),
    );
    let offsetX =
      target.x +
      target.width / 2 -
      scale * (referenceBox.x + referenceBox.width / 2);
    let offsetY =
      target.y +
      target.height / 2 -
      scale * (referenceBox.y + referenceBox.height / 2);
    if (animalConfig.scene && background) {
      const scene = getSceneLayout({ width, height }, animalConfig.scene, referenceBox, supportBox);
      Object.assign(background.style, {
        left: `${scene.background.x}px`, top: `${scene.background.y}px`,
        width: `${scene.background.width}px`, height: `${scene.background.height}px`,
      });
      if (completed) ({ scale, offsetX, offsetY } = scene);
    } else if (background) {
      Object.assign(background.style, { inset: '0', width: '100%', height: '100%', objectFit: 'contain' });
    }
    layout = { width, height, scale, offsetX, offsetY, padding, portrait };
    animal.setAttribute("viewBox", `0 0 ${width} ${height}`);
    world.setAttribute(
      "transform",
      `translate(${offsetX} ${offsetY}) scale(${scale})`,
    );
    Object.assign(
      tray.style,
      portrait
        ? {
            left: "0",
            right: "0",
            bottom: "0",
            top: "auto",
            width: "auto",
            height: `${traySize}px`,
            flexDirection: "row",
            overflowX: "auto",
            overflowY: "hidden",
            touchAction: "pan-x",
          }
        : {
            right: "0",
            top: "0",
            bottom: "0",
            left: "auto",
            width: `${traySize}px`,
            height: "auto",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY: "auto",
            touchAction: "pan-y",
          },
    );
    pieces.forEach((piece) => {
      const box = piece.bounds;
      // Cada cartão amplia sua própria peça, inclusive orelhas e olhos pequenos.
      const crossSize = Math.max(44, traySize - 40);
      const previewScale = portrait
        ? crossSize / box.height
        : Math.min(
            crossSize / box.width,
            Math.max(44, height - 40) / box.height,
          );
      piece.card.style.width = portrait
        ? `${Math.max(88, box.width * previewScale + 24)}px`
        : "100%";
      piece.card.style.height = portrait
        ? "100%"
        : `${Math.max(88, box.height * previewScale + 24)}px`;
      piece.card.style.touchAction = portrait ? "pan-x" : "pan-y";
      const margin = 12 / previewScale;
      piece.preview.setAttribute(
        "viewBox",
        `${box.x - margin} ${box.y - margin} ${box.width + margin * 2} ${box.height + margin * 2}`,
      );
      if (!piece.dragging) {
        piece.position = { x: 0, y: 0 };
        updatePosition(piece);
      }
    });
  }
  function showCompletion() {
    if (completed) return;
    completed = true;
    const previousLayout = layout;
    tray.style.display = 'none';
    referenceGroup.style.display = 'none';
    animal.setAttribute('aria-label', `${animalConfig.name} ${animalConfig.article === 'a' ? 'montada' : 'montado'}`);
    animal.setAttribute('role', 'group');
    world.setAttribute('role', 'button');
    world.setAttribute('tabindex', '0');
    world.setAttribute('aria-label', `Ouvir som ${animalConfig.article === 'a' ? 'da' : 'do'} ${animalConfig.name.toLowerCase()}`);
    world.style.pointerEvents = 'visiblePainted';
    world.style.outline = 'none';
    world.classList.add('cursor-pointer');
    world.addEventListener('click', celebration.playSound);
    world.addEventListener('keydown', onAnimalKeyDown);
    selectPiece(null);
    resizeBoard();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // O mesmo grupo de peças se desloca para a cena enquanto o fundo aparece.
      const transform = ({ offsetX, offsetY, scale }) => `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      sceneAnimation = world.animate([
        { transform: transform(previousLayout) }, { transform: transform(layout) },
      ], { duration: 1000, easing: 'ease-in-out' });
    }
    celebration.start();
    const overlay = (
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
        <Button text="Continuar" ariaLabel={`Continuar após montar ${animalConfig.article} ${animalConfig.name.toLowerCase()}`} onClick={onContinue} className="pointer-events-auto mb-0 w-auto min-w-40 px-8 py-3 focus-visible:ring-4 focus-visible:ring-azul-iris/30" />
      </div>
    );
    board.append(overlay);
    overlay.querySelector('button').focus();
  }
  function onAnimalKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      celebration.playSound();
    }
  }
  pieces.forEach((piece) => {
    piece.onSelect = () => {
      if (!piece.placed) selectPiece(piece);
    };
    piece.card.addEventListener("pointerdown", piece.onSelect);
    let down;
    piece.interaction = interact(piece.card)
      .draggable({
        manualStart: true,
        listeners: {
          start(event) {
            piece.dragging = true;
            selectPiece(piece);
            const inverse = world.getScreenCTM().inverse();
            const point = new DOMPoint(
              event.clientX,
              event.clientY,
            ).matrixTransform(inverse);
            piece.position = {
              x: point.x - piece.bounds.x - piece.bounds.width / 2,
              y: point.y - piece.bounds.y - piece.bounds.height / 2,
            };
            piece.element.style.display = "";
            piece.preview.style.opacity = "0.2";
            updatePosition(piece);
          },
          move(event) {
            const inverse = world.getScreenCTM().inverse();
            const box = piece.bounds;
            // Recalcula pelo cursor para não acumular deslocamento ao limitar nas bordas.
            const point = new DOMPoint(
              event.clientX,
              event.clientY,
            ).matrixTransform(inverse);
            piece.position.x = point.x - box.x - box.width / 2;
            piece.position.y = point.y - box.y - box.height / 2;
            const { padding, offsetX, offsetY, scale, width, height } = layout;
            piece.position.x = Math.max(
              (padding - offsetX) / scale - box.x,
              Math.min(
                piece.position.x,
                (width - padding - offsetX) / scale - box.x - box.width,
              ),
            );
            piece.position.y = Math.max(
              (padding - offsetY) / scale - box.y,
              Math.min(
                piece.position.y,
                (height - padding - offsetY) / scale - box.y - box.height,
              ),
            );
            updatePosition(piece);
          },
          end() {
            piece.dragging = false;
            const distance = Math.hypot(
              piece.position.x * layout.scale,
              piece.position.y * layout.scale,
            );
            if (distance <= 40) {
              piece.placed = true;
              piece.position = { x: 0, y: 0 };
              updatePosition(piece);
              piece.card.style.display = "none";
              piece.interaction.draggable(false);
              if (selectedPiece === piece) selectPiece(null);
              if (pieces.every((item) => item.placed)) showCompletion();
            } else {
              piece.element.style.display = "none";
              piece.preview.style.opacity = "";
            }
          },
        },
      })
      .on("down", (event) => {
        down = { x: event.clientX, y: event.clientY };
      })
      .on("move", (event) => {
        const interaction = event.interaction;
        if (
          !down ||
          !interaction.pointerIsDown ||
          interaction.interacting() ||
          piece.placed
        )
          return;
        const dx = Math.abs(event.clientX - down.x),
          dy = Math.abs(event.clientY - down.y);
        if (Math.max(dx, dy) < 6) return;
        // O gesto ao longo da faixa rola as peças; o gesto transversal inicia o arraste.
        if (
          event.pointerType === "touch" &&
          (layout.portrait ? dx >= dy : dy >= dx)
        )
          return;
        interaction.start({ name: "drag" }, piece.interaction, piece.card);
      });
  });
  resizeBoard();
  const observer = new ResizeObserver(resizeBoard);
  observer.observe(stage);
  return {
    setSoundEnabled: celebration.setSoundEnabled,
    destroy() {
      celebration.destroy();
      world.removeEventListener('click', celebration.playSound);
      world.removeEventListener('keydown', onAnimalKeyDown);
      sceneAnimation?.cancel();
      observer.disconnect();
      pieces.forEach((piece) => {
        piece.interaction.unset();
        piece.card.removeEventListener("pointerdown", piece.onSelect);
      });
      board.remove();
    },
  };
}
