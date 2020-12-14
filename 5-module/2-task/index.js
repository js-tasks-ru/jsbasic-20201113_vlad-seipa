function toggleText() {
  // ваш код...
  let hideTextBtn = document.querySelector(".toggle-text-button");

  hideTextBtn.addEventListener("click", function(){
    document.querySelector("#text").hidden = !document.querySelector("#text").hidden;
  });
}
