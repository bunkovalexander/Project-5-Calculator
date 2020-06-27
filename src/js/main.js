window.onload = function () {
  const operators = document.querySelectorAll(".operators");
  const inputW = document.getElementById("input");
  const exp = inputW.value;
  let zeroize = false;

  function blankWindow() {
    document.getElementById("input").value = "";
  }

  document.addEventListener(
    "click",
    function (e) {
      document.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        let elAttr = e.target.hasAttribute("data-num");
        let elem = e.target;
        if (elAttr == true && elem.classList.contains("symhol") == true) {
          if (zeroize == true) {
            blankWindow();
            zeroize = false;
          }
          const atr = e.target.getAttribute("data-num");
          inputW.value = inputW.value + atr;
          return;
        } else {
          return;
        }
      });
    },
    false
  );

  const clean = document.getElementById("clean");
  clean.addEventListener("click", function (e) {
    blankWindow();
  });

  const back = document.getElementById("back");
  back.addEventListener("click", function (e) {
    let inputW = document.getElementById("input");
    let exp = inputW.value;
    inputW.value = exp.substring(0, exp.length - 1);
  });

  const result = document.getElementById("result");
  result.addEventListener("click", function (e) {
    zeroize = true;
    const inputW = document.getElementById("input");
    const exp = inputW.value;
    window.onerror = function (msg, url, lineNo, columnNo, error) {
      alert("Введите корректное значение");
    };
    document.getElementById("input").value = eval(exp);
    if (
      document.getElementById("input").value == Infinity ||
      document.getElementById("input").value == -Infinity
    ) {
      alert("На ноль делить нельзя !");
      blankWindow();
    }
  });
};
