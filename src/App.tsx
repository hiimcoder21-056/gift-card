import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import Message from "./components/Message";
import audioUrl from "./assets/bg-music.mp3";
import FlyIcon from "./components/FlyIcon";
import { v4 } from "uuid";
import Flower3D from "./components/Flower3D";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  const handleOpen = () => {
    if (opened) return;
    setZoomed(true);
    setTimeout(() => {
      setOpened(true);
      confetti({ particleCount: 150, spread: 90 });
      const audio = new Audio(audioUrl);
      audio.play().catch((e) => console.log("e: ", e));
    }, 250);
  };

  useEffect(() => {
    if (!opened) {
      controlsLeft.start({
        rotateZ: [-2, 2, -2, 0],
        transition: { repeat: Infinity, repeatDelay: 2, duration: 0.6 },
      });
      controlsRight.start({
        rotateZ: [2, -2, 2, 0],
        transition: { repeat: Infinity, repeatDelay: 2, duration: 0.6 },
      });
    }
  }, [opened, controlsLeft, controlsRight]);

  const iconFlyList = ['💌', '💖', '🌸']

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-pink-100 to-pink-300 relative overflow-hidden ">

      {opened &&
        <>
          {iconFlyList.map((icon) => {
            return <FlyIcon key={v4()} icon={icon} count={25} />
          })}
        </>
      }

      <motion.div
        onClick={() => setOpened(!opened)}
        initial={{ scale: 1 }}
        animate={{ scale: zoomed ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[400px] h-[550px] md:w-[500px] md:h-[650px] flex justify-center items-center perspective"
      >

        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-center items-center px-6 text-center z-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: opened ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Flower3D />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 20 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Message />
          </motion.div>
        </div>

        <motion.div
          onClick={handleOpen}
          initial={false}
          animate={opened ? { rotateY: -160, rotateZ: 0 } : controlsLeft}
          transition={{ duration: 1 }}
          className="absolute left-0 top-0 h-full w-1/2 bg-pink-200 rounded-l-2xl shadow-2xl origin-left flex flex-col justify-center items-center cursor-pointer z-10"
        >
          <h1 className="text-2xl font-bold text-pink-800 -rotate-2">💌 Thiệp</h1>
          <p className="text-sm text-pink-600 mt-2">Nhấn để mở</p>
        </motion.div>

        <motion.div
          onClick={handleOpen}
          initial={false}
          animate={opened ? { rotateY: 160, rotateZ: 0 } : controlsRight}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 h-full w-1/2 bg-pink-300 rounded-r-2xl shadow-2xl origin-right flex flex-col justify-center items-center cursor-pointer z-10"
        >
          <h1 className="text-2xl font-bold text-white rotate-2">20/10 💖</h1>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-3 text-xs text-gray-600 opacity-80 text-center w-full">
        © 2025 Thiệp 20/10 — Bản quyền thuộc về Hi, I'm coder.
        Nhạc nền và hiệu ứng sử dụng nguồn miễn phí / có ghi công.
        <p>
          Music from #Uppbeat (free for Creators!):
          https://uppbeat.io/t/albert-behar/lift-me-up
          License code: NOMH1SXVLNIXDCB2
        </p>
      </div>

    </div>
  );
}
