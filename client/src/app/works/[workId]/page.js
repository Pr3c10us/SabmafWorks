"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loading from "../../loading";
import VowelItalicizer from "../../../../components/vowelItalicizer";
import Image from "next/image";
import BottomNav from "../../../../components/bottomNav";
import Carousel from "./components/carousel";
import FullImage from "./components/fullImage";

const Page = () => {
  const pathname = usePathname();
  const [workId] = pathname.split("/").slice(2);

  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [currImage, setCurrImage] = useState(0);
  const [work, setWork] = useState({});

  const fetchWork = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}projects/${workId}`,
      );
      const data = await res.json();
      setWork(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      router.push("/works");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWork();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <main className="flex min-h-full  flex-col justify-between bg-white">
      {" "}
      <section
        id="contact"
        className="relative z-10 flex  snap-end flex-col items-center gap-8 bg-white px-4 py-16 md:gap-16 md:px-14  md:py-32 "
      >
        <div className="flex w-full max-w-xl flex-col justify-center gap-8 text-center">
          <h1 className="text-3xl font-semibold uppercase text-text underline md:text-5xl">
            {work.name}
          </h1>
          <p className="text-sm sm:text-base">{work.description}</p>
        </div>

        <Carousel autoSlide={false}>
          {work.images.map((image,index) => (
            <Image
              onClick={() => {
                setShowImage(true);
                setCurrImage(index);
              }}
              key={image}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${image}`}
              alt={image}
              width="3000"
              height="3000"
              className={`w-full object-contain`}
              priority
            />
          ))}
        </Carousel>
      </section>
      {showImage && (
        <FullImage
          images={work.images}
          autoSlide={false}
          setShowImage={setShowImage}
          currImage={currImage}
        />
      )}
      <BottomNav />
    </main>
  );
};

export default Page;
