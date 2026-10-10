/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";

export default function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="" loading="lazy" decoding="async" {...props} />;
}
