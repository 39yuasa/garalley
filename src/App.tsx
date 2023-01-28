import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Firestore,
  getDoc,
  doc,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { storage, firestore } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";
import gsap, { Power4 } from "gsap";

const Reload = () => {
  const [img, setimg] = useState<any>();
  const [newPNG, setNewPNG] = useState<any>();
  const [text, setText] = useState<any>();
  let bool = true;
  const div = useRef<HTMLDivElement | null>(null);
  const allView = useRef<HTMLDivElement | null>(null);
  const backTween = gsap
    .timeline()
    .to(div.current, {
      y: -300,
      duration: 2,
    })
    .to(
      ".li",
      {
        opacity: 0,
        duration: 1,
      },
      "+=2"
    )
    .to(div.current, {
      opacity: 0,
      y: 300,
      duration: 1,
    })
    .to(".li", {
      opacity: 1,
      duration: 1,
      stagger: {
        each: 0.05,
        from: "start",
        grid: [0, 6],
      },
    });

  useEffect(() => {
    const userDocumentRef = doc(firestore, "gallery", "date");
    const unsub = onSnapshot(userDocumentRef, (documentSnapshot) => {
      if (bool) {
        const getData = documentSnapshot.data();
        setText(
          getData
            ? { data: getData.a.slice(-18), length: getData.a.length }
            : null
        );
        bool = false;
      } else {
        const getData = documentSnapshot.data();
        setText(
          getData
            ? { data: getData.a.slice(-18), length: getData.a.length }
            : null
        );
        backTween.play();
      }
    });
    return unsub;
  }, []);

  const handleClick = () => {
    const galleryCloud = doc(firestore, "gallery", "date");
    updateDoc(galleryCloud, {
      a: arrayUnion({
        name: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      }),
    });
  };

  const time = useMemo(() => {
    const today = new Date();
    console.log(text);
    return today.getHours() + ":" + today.getMinutes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <button onClick={handleClick}>ボタン</button>
      <h1>AIイラストギャラリー</h1>
      <div>
        <p>{time}</p>
      </div>
      <p>現在{text ? text.length : 0}枚</p>
      <div ref={allView}>
        <ul className="flex flex-wrap gap-[40px] mx-[92px] justify-between">
          {text ? (
            text.data.map((data: any, index: number) => (
              <li className=" text-center li bg-orange-500 w-[calc(16.66666666%-40px)] h-[256px]">
                {data.name}
              </li>
            ))
          ) : (
            <p>yuasa</p>
          )}
        </ul>
      </div>
      <div className="w-fit mx-auto li" ref={div}>
        {text ? (
          <p
            // className="text-[#0000ff] text-center top-[-50%] right-[50%] p-[30px] bg-[#f8f8f8] absolute"
            className="text-[#0000ff] text-center top-[-100px] mx-auto p-[30px] bg-[#f8f8f8] absolute w-[667px] h-[667px]"
          >
            {text.data[text.data.length - 1].name}
          </p>
        ) : null}
      </div>
    </>
  );
};
export default Reload;
