import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  console.log(ele.target.id);
  document.getElementById().scrollIntoView({
      behavior: "smooth",
      block: "start",
  });

  // if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  //   ele.scrollIntoView(true)
  // } else {
    // ele.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
  // }
};

function App() {
  const [visibleSection, setVisibleSection] = useState();

  const headerRef = useRef(null);
  const leadershipRef = useRef(null);
  const providerRef = useRef(null);
  const operationsRef = useRef(null);

  const sectionRefs = [
    { section: "Leadership", ref: leadershipRef },
    { section: "Providers", ref: providerRef },
    { section: "Operations", ref: operationsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);
  return (
    <div className="App">
      <div className="top-spacer" />

      <div className="content">
        <div className="sticky">
          <div className="header" ref={headerRef}>
            <button
              type="button"
              className={`header_link ${visibleSection === "Leadership" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(leadershipRef.current);
              }}
              onTouchStart={() => {
                scrollTo(leadershipRef.current);
              }}
            >
              Leadership
            </button>
            <button
              type="button"
              className={`header_link ${visibleSection === "Providers" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(providerRef.current);
              }}
              onTouchStart={() => {
                scrollTo(providerRef.current);
              }}
            >
              Providers
            </button>
            <button
              type="button"
              className={`header_link ${visibleSection === "Operations" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(operationsRef.current);
              }}
              onTouchStart={() => {
                scrollTo(operationsRef.current);
              }}
            >
              Operations
            </button>
          </div>
        </div>
        <div className="section" id="Leadership" ref={leadershipRef} />
        <div className="section" id="Providers" ref={providerRef} />
        <div className="section" id="Operations" ref={operationsRef} />
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}

export default App;
