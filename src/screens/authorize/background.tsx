import styled from "@emotion/styled";
import Particles from "react-particles-js";
import { IOptions, RecursivePartial } from "tsparticles";

export const ParticleBackground = () => {
  const config: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 0.3,
        width: 2,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "bounce",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: false,
          mode: "push",
        },
        resize: false,
      },
      modes: {
        grab: {
          distance: 300,
          line_linked: {
            opacity: 0.2,
          },
        },
        bubble: {
          distance: 800,
          size: 80,
          duration: 2,
          opacity: 0.8,
        },
        repulse: {
          distance: 400,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <ParticleBackgroundContainer>
      <Particles params={config} />
    </ParticleBackgroundContainer>
  );
};

const ParticleBackgroundContainer = styled.div`
  background-color: #1b4787;
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
