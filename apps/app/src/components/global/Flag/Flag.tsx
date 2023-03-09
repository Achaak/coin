import Image from 'next/image';
import type { FC } from 'react';

export type FlagProps = {
  url: string | null;
  alt: string;
  size?: number;
};

export const Flag: FC<FlagProps> = ({ url, size = 32, alt }) => (
  <Image
    src={url ?? '/images/flag-not-found.svg'}
    height={size}
    width={size}
    alt={alt}
  />
);
