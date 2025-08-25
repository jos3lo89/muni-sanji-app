import Image from "next/image";

const NextImage = ({
  imagePath,
  altText,
  width,
  height,
}: {
  imagePath: string;
  altText: string;
  width: number;
  height: number;
}) => {
  return (
    <Image
      src={imagePath}
      alt={altText}
      width={width}
      height={height}
      className="w-auto h-auto rounded-lg"
      priority
      // placeholder="blur"
      // blurDataURL="/placeholder.svg"
    />
  );
};

export default NextImage;
