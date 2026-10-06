import interact from 'interactjs';

export function mountAnimalPuzzle(gameContainer, animalConfig, { onContinue } = {}) {
  const source = new DOMParser().parseFromString(animalConfig.svg, 'image/svg+xml');
  const pieces = animalConfig.parts.map((part) => ({
    ...part, element: document.importNode(source.getElementById(part.id), true),
    placed: false, position: { x: 0, y: 0 }, dragging: false,
  }));
  let stage, world, referenceGroup, tray, boardContent;
  let layout;
  let selectedPiece = null;
  const reference = pieces.map((piece) => {
    const copy = piece.element.cloneNode(true);
    copy.removeAttribute('id');
    return copy;
  });
  function selectPiece(piece) {
    selectedPiece = piece;
    pieces.forEach((item) => {
      const selected = item === piece;
      item.card.style.boxShadow = selected ? 'inset 0 0 0 3px #387ff5' : '';
      item.element.style.filter = selected ? 'drop-shadow(0 0 5px #387ff5)' : '';
    });
  }
  const animal = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" role="img" aria-label={`${animalConfig.name} para montar`}>
      <g ref={(element) => (world = element)}>
        <g ref={(element) => (referenceGroup = element)} className="opacity-20 grayscale" aria-hidden="true">{reference}</g>
        {pieces.map((piece) => piece.element)}
      </g>
    </svg>
  );
  const board = (
    <div className="relative h-full min-h-0">
      <div ref={(element) => (boardContent = element)} className="h-full">
        <div ref={(element) => (stage = element)} className="relative h-full overflow-hidden">
          {animal}
          <div ref={(element) => (tray = element)} role="region" aria-label="Peças do animal" tabIndex="0" className="absolute z-0 flex gap-3 overscroll-contain rounded-2xl bg-white/60 p-3 focus-visible:ring-4 focus-visible:ring-azul-iris/30">
            {pieces.map((piece) => {
              const preview = piece.element.cloneNode(true);
              preview.removeAttribute('id');
              return <div ref={(element) => (piece.card = element)} className="max-w-60 relative flex shrink-0 items-center justify-center rounded-xl bg-white/80 cursor-grab" aria-label={piece.label}>
                <svg ref={(element) => (piece.preview = element)} xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-full w-full" aria-hidden="true">{preview}</svg>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
  gameContainer.replaceChildren(board);
  pieces.forEach((piece) => {
    piece.bounds = piece.element.getBBox();
    piece.element.style.display = 'none';
  });
  const referenceBox = referenceGroup.getBBox();

  function updatePosition(piece) {
    piece.element.setAttribute('transform', `translate(${piece.position.x} ${piece.position.y})`);
  }
  function resizeBoard() {
    const { width, height } = stage.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    const portrait = window.innerWidth < window.innerHeight;
    const padding = 12;
    const traySize = portrait ? Math.min(210, height * 0.3) : Math.min(250, width * 0.25);
    const target = portrait
      ? { x: padding, y: 56, width: width - padding * 2, height: height - traySize - 68 }
      : { x: padding, y: padding, width: width - traySize - padding * 3, height: height - padding * 2 };
    const scale = Math.max(0.001, Math.min(target.width / referenceBox.width, target.height / referenceBox.height));
    const offsetX = target.x + target.width / 2 - scale * (referenceBox.x + referenceBox.width / 2);
    const offsetY = target.y + target.height / 2 - scale * (referenceBox.y + referenceBox.height / 2);
    layout = { width, height, scale, offsetX, offsetY, padding, portrait };
    animal.setAttribute('viewBox', `0 0 ${width} ${height}`);
    world.setAttribute('transform', `translate(${offsetX} ${offsetY}) scale(${scale})`);
    Object.assign(tray.style, portrait
      ? { left: '0', right: '0', bottom: '0', top: 'auto', width: 'auto', height: `${traySize}px`, flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden', touchAction: 'pan-x' }
      : { right: '0', top: '0', bottom: '0', left: 'auto', width: `${traySize}px`, height: 'auto', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto', touchAction: 'pan-y' });
    pieces.forEach((piece) => {
      const box = piece.bounds;
      // Cada cartão amplia sua própria peça, inclusive orelhas e olhos pequenos.
      const crossSize = Math.max(44, traySize - 40);
      const previewScale = portrait ? crossSize / box.height
        : Math.min(crossSize / box.width, Math.max(44, height - 40) / box.height);
      piece.card.style.width = portrait ? `${Math.max(88, box.width * previewScale + 24)}px` : '100%';
      piece.card.style.height = portrait ? '100%' : `${Math.max(88, box.height * previewScale + 24)}px`;
      piece.card.style.touchAction = portrait ? 'pan-x' : 'pan-y';
      const margin = 12 / previewScale;
      piece.preview.setAttribute('viewBox', `${box.x - margin} ${box.y - margin} ${box.width + margin * 2} ${box.height + margin * 2}`);
      if (!piece.dragging) {
        piece.position = { x: 0, y: 0 };
        updatePosition(piece);
      }
    });
  }
  function showCompletion() {
    let continueButton;
    const popup = (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-azul-meia-noite/30 p-4">
        <section role="dialog" aria-modal="true" aria-labelledby="animal-complete-title" onKeyDown={(event) => { if (event.key === 'Tab') { event.preventDefault(); continueButton.focus(); } }} className="w-full max-w-sm rounded-3xl border-2 border-azul-meia-noite bg-branco-porcelana p-6 text-center shadow-neo-solid">
          <h2 id="animal-complete-title" className="mb-3 text-2xl font-bold">Parabéns!</h2>
          <p className="mb-5">Você montou {animalConfig.article} {animalConfig.name.toLowerCase()}!</p>
          <button ref={(element) => (continueButton = element)} type="button" className="min-h-touch-target rounded-xl border-neo cursor-pointer bg-azul-iris px-6 py-3 font-bold text-white focus-visible:ring-4 focus-visible:ring-azul-iris/30" onClick={onContinue}>Continuar</button>
        </section>
      </div>
    );
    boardContent.inert = true;
    board.append(popup);
    continueButton.focus();
  }
  pieces.forEach((piece) => {
    piece.onSelect = () => { if (!piece.placed) selectPiece(piece); };
    piece.card.addEventListener('pointerdown', piece.onSelect);
    let down;
    piece.interaction = interact(piece.card).draggable({
      manualStart: true,
      listeners: {
        start(event) {
          piece.dragging = true;
          selectPiece(piece);
          const inverse = world.getScreenCTM().inverse();
          const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(inverse);
          piece.position = { x: point.x - piece.bounds.x - piece.bounds.width / 2, y: point.y - piece.bounds.y - piece.bounds.height / 2 };
          piece.element.style.display = '';
          piece.preview.style.opacity = '0.2';
          updatePosition(piece);
        },
        move(event) {
          const inverse = world.getScreenCTM().inverse();
          const box = piece.bounds;
          // Recalcula pelo cursor para não acumular deslocamento ao limitar nas bordas.
          const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(inverse);
          piece.position.x = point.x - box.x - box.width / 2;
          piece.position.y = point.y - box.y - box.height / 2;
          const { padding, offsetX, offsetY, scale, width, height } = layout;
          piece.position.x = Math.max((padding - offsetX) / scale - box.x, Math.min(piece.position.x, (width - padding - offsetX) / scale - box.x - box.width));
          piece.position.y = Math.max((padding - offsetY) / scale - box.y, Math.min(piece.position.y, (height - padding - offsetY) / scale - box.y - box.height));
          updatePosition(piece);
        },
        end() {
          piece.dragging = false;
          const distance = Math.hypot(piece.position.x * layout.scale, piece.position.y * layout.scale);
          if (distance <= 40) {
            piece.placed = true;
            piece.position = { x: 0, y: 0 };
            updatePosition(piece);
            piece.card.style.display = 'none';
            piece.interaction.draggable(false);
            if (selectedPiece === piece) selectPiece(null);
            if (pieces.every((item) => item.placed)) showCompletion();
          } else {
            piece.element.style.display = 'none';
            piece.preview.style.opacity = '';
          }
        },
      },
    }).on('down', (event) => { down = { x: event.clientX, y: event.clientY }; })
      .on('move', (event) => {
        const interaction = event.interaction;
        if (!down || !interaction.pointerIsDown || interaction.interacting() || piece.placed) return;
        const dx = Math.abs(event.clientX - down.x), dy = Math.abs(event.clientY - down.y);
        if (Math.max(dx, dy) < 6) return;
        // O gesto ao longo da faixa rola as peças; o gesto transversal inicia o arraste.
        if (event.pointerType === 'touch' && (layout.portrait ? dx >= dy : dy >= dx)) return;
        interaction.start({ name: 'drag' }, piece.interaction, piece.card);
      });
  });
  resizeBoard();
  const observer = new ResizeObserver(resizeBoard);
  observer.observe(stage);
  return () => {
    observer.disconnect();
    pieces.forEach((piece) => {
      piece.interaction.unset();
      piece.card.removeEventListener('pointerdown', piece.onSelect);
    });
    board.remove();
  };
}
