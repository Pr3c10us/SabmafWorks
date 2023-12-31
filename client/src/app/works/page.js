"use client";
import React, { useState, useEffect } from "react";
import BottomNav from "../../../components/bottomNav";
import VowelItalicizer from "../../../components/vowelItalicizer";
import { useRouter,useSearchParams } from "next/navigation";
import Loading from "./components/loading";
import Filter from "./components/filter";
import Projects from "./components/projects";

const Works = () => {
  const [works, setworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState(
    useSearchParams().get("service") || "",
  )

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}projects?services=${service}`,
      );
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
        className="relative z-10 flex  snap-end flex-col items-center gap-8 bg-white px-4 py-16 md:gap-16 md:px-14  md:py-32 "
      >
        <div className="flex w-full items-center gap-2">
          <h1 className="text-xl uppercase text-text md:text-5xl ">
            <VowelItalicizer text={"Our Works"} />
          </h1>
          <div className="h-[1px] flex-1 bg-primary"></div>
        </div>
        <Filter service={service} setService={setService} />
        {/* <Projects works={works} /> */}
        {works.length > 0 ? (
          <div className="relative flex  w-full">
            {isLoading ? <Loading /> : <Projects works={works} />}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            {isLoading ? (
              <Loading />
            ) : (
              <h1 className="max-w-xl text-center text-2xl text-text">
                We currently have no projects to display, of our service "
                {service}". Please check back
              </h1>
            )}
          </div>
        )}{" "}
      </section>
      <BottomNav />
    </main>
  );
};

export default Works;
