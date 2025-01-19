import gsap from "gsap";

function initializeGsapDefaults() {
  gsap.defaults({
    ease: "power2.out",
    duration: 0.4,
  });
}

export default initializeGsapDefaults;
