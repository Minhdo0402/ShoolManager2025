//import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const carouselItems = [
  {
    image:
      "https://cdn.pixabay.com/photo/2020/12/10/20/40/color-5821297_1280.jpg",
    title: "Explore Our Classrooms",
    description: "Engaging and inspiring environments for every student.",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/10/10/00/03/child-2835430_1280.jpg",
    title: "Empowering Students",
    description: "We believe in fostering the potential of each child.",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2019/09/03/01/51/child-4448370_1280.jpg",
    title: "Learning Tools",
    description: "Providing the right tools for effective learning.",
  },
];

export default function Carousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box ref={sliderRef} className="keen-slider">
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            className="keen-slider__slide"
            sx={{ position: "relative", textAlign: "center", color: "white" }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "70vh",
                minHeight: "400px",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0,0,0,0.6)",
                padding: "10px 20px",
                borderRadius: 1,
              }}
            >
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <Button variant="contained" onClick={() => instanceRef.current?.prev()}>
          <ArrowBackIosIcon />
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <Button variant="contained" onClick={() => instanceRef.current?.next()}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
}
