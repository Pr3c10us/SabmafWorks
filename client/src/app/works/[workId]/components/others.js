import Loading from "@/app/loading.js";
import React, { useState, useEffect } from "react";
import { MdArchitecture } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import VowelItalicizer from "../../../../../components/vowelItalicizer";
import { useRouter } from "next/navigation";

const Others = ({ id }) => {
  const [works, setworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}projects`);
      const data = await res.json();
      setworks(data.projects);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      router.push("/");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWorks();
  }, []);

  if (isLoading) <Loading />;
  return (
    <section className={`${works.length <= 1 ? "hidden" : "block"}`}>
      <div className="mb-6 flex w-full items-center gap-2 pl-4">
        <h1 className="text-xl uppercase text-text md:text-5xl ">
          <VowelItalicizer text={"Other Works"} />
        </h1>
        <div className="h-[1px] flex-1 bg-primary"></div>
      </div>
      <div className="flex cursor-pointer items-stretch gap-4 overflow-auto md:ml-[30vw]">
        {works.map((work, i) => {
          if (i <= 5 && work._id != id) {
            return (
              <div
                key={work._id}
                onClick={() => router.push(`/works/${work._id}`)}
                className={`group relative flex aspect-square h-80 cursor-pointer md:h-96`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${work.images[0]}`}
                  alt={work.title}
                  width={6000}
                  height={6000}
                  className={`h-full object-cover object-center transition-all duration-200 group-hover:brightness-75`}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100">
                  <h2 className="flex items-center gap-x-1 text-lg font-semibold text-white md:gap-x-2 md:text-3xl lg:gap-x-1 ">
                    <MdArchitecture />
                    {work.name}
                    <FiArrowUpRight />
                  </h2>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default Others;
