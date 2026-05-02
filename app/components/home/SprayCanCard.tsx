import { useState, type CSSProperties } from "react";

import type { Service } from "./data";

type CanStageStyle = CSSProperties & {
  "--can-x": string;
  "--can-y": string;
  "--can-width": string;
  "--can-rotate": string;
  "--can-light": string;
  "--can-lift": string;
  "--can-mobile-x": string;
  "--can-mobile-y": string;
  "--can-mobile-width": string;
  "--can-mobile-lift": string;
};

export type SprayCanLayout = {
  x: string;
  y: string;
  width: string;
  rotate: string;
  zIndex: number;
  light: number;
  lift: string;
  mobileX: string;
  mobileY: string;
  mobileWidth: string;
  mobileLift: string;
};

type Props = {
  service: Service;
  layout: SprayCanLayout;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: (slug: string) => void;
  onDeactivate: () => void;
};

export function SprayCanCard({
  service,
  layout,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: Props) {
  const [imageFailed, setImageFailed] = useState(false);

  const style: CanStageStyle = {
    "--can-x": layout.x,
    "--can-y": layout.y,
    "--can-width": layout.width,
    "--can-rotate": layout.rotate,
    "--can-light": String(layout.light),
    "--can-lift": layout.lift,
    "--can-mobile-x": layout.mobileX,
    "--can-mobile-y": layout.mobileY,
    "--can-mobile-width": layout.mobileWidth,
    "--can-mobile-lift": layout.mobileLift,
    zIndex: isActive ? 20 : layout.zIndex,
  };

  return (
    <button
      type="button"
      className="spray-can group"
      data-active={isActive ? "true" : undefined}
      data-dimmed={isDimmed ? "true" : undefined}
      data-can-card
      style={style}
      aria-label={`Ver servicio ${service.name}`}
      onBlur={onDeactivate}
      onClick={() => onActivate(service.slug)}
      onFocus={() => onActivate(service.slug)}
      onPointerEnter={() => onActivate(service.slug)}
      onPointerLeave={onDeactivate}>
      {!imageFailed ? (
        <img
          src={service.canImage}
          alt=""
          className="spray-can-image"
          draggable={false}
          onError={() => setImageFailed(true)}
        />
      ) : null}
      <span
        className="spray-can-fallback"
        data-visible={imageFailed ? "true" : undefined}
        aria-hidden="true">
        <span className="spray-can-fallback-number">{service.number}</span>
        <span className="spray-can-fallback-name">
          {service.name.toUpperCase()}
        </span>
      </span>
    </button>
  );
}
