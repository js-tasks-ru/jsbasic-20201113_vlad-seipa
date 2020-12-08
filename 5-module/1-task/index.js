function hideSelf() {
  // ваш код...
  let btn = document.querySelector(".hide-self-button");
  btn.addEventListener("click", function(event){
    btn.hidden = !btn.hidden;
  });
}
