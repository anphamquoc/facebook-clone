$(document).ready(function () {
  $("#input-area-text").emojioneArea({
    pickerPosition: "left",
    tonesStyle: "bullet",
    inline: true,
  });
});
changeStatus = (i) => {
  var aboutpost = document.querySelectorAll(".about-post")[i];
  var likebtn = document.querySelectorAll(".like-post-btn")[i];
  var quantity = aboutpost.querySelector(".quantity");
  var likeimg = likebtn.querySelector("img");
  if (likeimg.src.includes("images/like.svg")) {
    likeimg.src = likeimg.src.replace(
      "images/like.svg",
      "images/like-active.svg"
    );

    likeimg.style.filter =
      "invert(49%) sepia(89%) saturate(5073%) hue-rotate(204deg) brightness(90%) contrast(100%)";
    likebtn.style.color = "rgb(22, 111, 229)";
    quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
  } else {
    likeimg.src = likeimg.src.replace(
      "images/like-active.svg",
      "images/like.svg"
    );
    likebtn.style.color = "white";
    likeimg.style.filter =
      "invert(96%) sepia(4%) saturate(17%) hue-rotate(160deg) brightness(104%) contrast(107%)";
    quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
  }
};
