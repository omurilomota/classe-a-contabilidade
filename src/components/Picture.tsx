import { cn } from "@/utils/cn";

type PictureProps = {
  /** Caminho base sem extensão. Ex.: /images/hero-consultoria */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  /** Primeira imagem da página: carrega com prioridade. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Imagem responsiva com largura e altura intrínsecas para evitar layout shift.
 * O caminho deve incluir a extensão do arquivo (ex.: /images/hero.jpg).
 */
export function Picture({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
  sizes,
}: PictureProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("block h-full w-full object-cover", imgClassName, className)}
    />
  );
}
