// src/constants/videos.js
const Videos = [
    {
      id: 1,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      channel: "toastd_official",
      description: "Check out this amazing new product! #toastd",
      likes: 120,
      shares: 15,
      comment: 20,
      productTag: {
        name: "Product A",
        url: "/products/product-a",
        top: "30%",
        left: "10%",
      },
    },
    {
      id: 2,
      url: "https://www.w3schools.com/html/movie.mp4",
      channel: "toastd_official",
      description: "Discover our latest drop now!",
      likes: 300,
      shares: 25,
      comment: 50,
      productTag: {
        name: "Product B",
        url: "/products/product-b",
        top: "40%",
        left: "70%",
      },
    },
    {
      id: 3,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      channel: "toastd_official",
      description: "Experience the best quality and style.",
      likes: 200,
      shares: 10,
      comment: 30,
      // No productTag for this video.
    },
  ];
  
  export default Videos;
  