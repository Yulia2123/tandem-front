import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  width?: number;
  height?: number;
}

export const Icon = ({
  name,
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <use href={`/Icons/sprite.svg#${name}`} />
    </svg>
  );
};