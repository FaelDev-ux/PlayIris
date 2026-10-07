import airplane from "../../assets/icons/iris-decorative/aviao-de-papel.svg";
import boat from "../../assets/icons/iris-decorative/barquinho.svg";
import blocks from "../../assets/icons/iris-decorative/blocos-de-montar.svg";
import cube from "../../assets/icons/iris-decorative/cubo-isometrico.svg";
import sparkle from "../../assets/icons/iris-decorative/estrela-4-pontas.svg";
import music from "../../assets/icons/iris-decorative/notas-musicais.svg";
import cloud from "../../assets/icons/iris-decorative/nuvem.svg";
import puzzle from "../../assets/icons/iris-decorative/peca-quebra-cabeca.svg";

const decorations = [
  {
    src: cloud,
    position:
      "left-[6%] top-[7.5%] h-[9.5%] w-[7.4%] max-lg:left-[4%] max-lg:top-[3%] max-lg:h-10 max-lg:w-10",
  },
  {
    src: airplane,
    position:
      "left-[70%] top-[25%] h-[8.1%] w-[6.2%] max-lg:left-[84%] max-lg:top-[26%] max-lg:h-9 max-lg:w-9",
  },
  {
    src: sparkle,
    position:
      "left-[30%] top-[41%] h-[4.2%] w-[3.2%] max-lg:left-[23%] max-lg:top-[16%] max-lg:h-6 max-lg:w-6",
  },
  {
    src: puzzle,
    position:
      "left-[52%] top-[16%] h-[6.7%] w-[5.2%] max-lg:left-[89%] max-lg:top-[58%] max-lg:h-9 max-lg:w-9",
  },
  {
    src: boat,
    position:
      "left-[7%] top-[76%] h-[7.6%] w-[5.9%] max-lg:left-[4%] max-lg:top-[42%] max-lg:h-10 max-lg:w-10",
  },
  {
    src: cube,
    position:
      "left-[61%] top-[56%] h-[6.7%] w-[5.2%] max-lg:left-[76%] max-lg:top-[79%] max-lg:h-9 max-lg:w-9",
  },
  {
    src: music,
    position:
      "left-[39%] top-[30%] h-[5.4%] w-[4.2%] max-lg:left-[13%] max-lg:top-[65%] max-lg:h-8 max-lg:w-8",
  },
  {
    src: blocks,
    position:
      "left-[91%] top-[89%] h-[7.6%] w-[5.9%] max-lg:left-[89%] max-lg:top-[93%] max-lg:h-9 max-lg:w-9",
  },
];

export function AuthDecorations() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 -z-10 aspect-[1280/948] w-full max-w-7xl -translate-x-1/2 max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:aspect-auto max-lg:max-w-none max-lg:w-auto max-lg:translate-x-0"
      aria-hidden="true"
    >
      {decorations.map(({ src, position }) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable="false"
          className={`absolute select-none object-contain ${position}`}
        />
      ))}
    </div>
  );
}
