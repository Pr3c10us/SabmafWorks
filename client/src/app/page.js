"use client";
import { useEffect, useState } from "react";
import Cursor from "../../components/cursor";
import Hero from "../../components/hero";
import Services from "../../components/services";
import axios from "axios";
import Projects from "../../components/projects";
import Contact from "../../components/contact";
import BottomNav from "../../components/bottomNav";
import Loading from "./loading";
import { toast } from "react-hot-toast";

export default function Home() {
  const [cursorType, setCursorType] = useState(false);
  const [imageName, setImageName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const handleEffect = async () => {
    
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}projects`,
      );
      console.log(data);
      setProjects(data.projects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleEffect();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
    <main className="relative bg-white">
      <Cursor image={imageName} cursorType={cursorType} />
      <Hero />
      <Services setImage={setImageName} setCursorType={setCursorType} />
      <Projects projects={projects} setCursorType={setCursorType} />
      <Contact setCursorType={setCursorType} />
      <BottomNav />
    </main>
    </>
  );
}
