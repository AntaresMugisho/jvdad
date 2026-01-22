"use client";

import Image from "next/image";
import { useState } from "react";

export default function MyImage({
  imgPath,
  alt,
}: {
  imgPath: string;
  alt: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full flex justify-center items-center w-full relative ">
      {isLoading && (
        <div className="h-full w-full flex justify-center items-center absolute left-0 right-0 ">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Image
        onLoad={() => setIsLoading(false)}
        src={imgPath}
        alt={alt}
        width={100}
        height={150}
        priority
        className="w-full h-full object-cover "
      />
    </div>
  );
}
