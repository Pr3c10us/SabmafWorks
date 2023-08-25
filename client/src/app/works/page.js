"use client";
import React, { useState, useEffect } from "react";
import BottomNav from "../../../components/bottomNav";
import VowelItalicizer from "../../../components/vowelItalicizer";
import { useRouter } from "next/navigation";
import Loading from "./components/loading";
import Filter from "./components/filter";
import Projects from "./components/projects";

const Works = () => {
  const [works, setworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState("");

  const router = useRouter();

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}projects?services=${service}`,
      );
      const data = await res.json();
      setworks(data.projects);
      setIsLoading(false);
    } catch (error) {
      router.push("/");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [service]);

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

  return (
    <main className="flex min-h-full  flex-col justify-between bg-white">
      {" "}
      <section
        id="contact"
        className="relative z-10 flex  snap-end flex-col items-center gap-8 bg-white px-4 py-16 md:py-32 md:gap-16  md:px-14 "
      >
        <div className="flex w-full">
          <h1 className="text-4xl uppercase text-text md:text-5xl ">
            <VowelItalicizer text={"Our Works"} />
          </h1>
        </div>
        <Filter service={service} setService={setService} />
        {/* <Projects works={works} /> */}
        <div className="relative flex  w-full">
          {isLoading ? <Loading /> : <Projects works={works} />}
        </div>
      </section>
      <BottomNav />
    </main>
  );
};

export default Works;
