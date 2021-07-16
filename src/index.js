import "./styles.css";
function Calculator() {
  var operator = "";
  var prevResult = "";
  var InputField;

  this.getInput = function () {
    var inputField = document.createElement("input");
    inputField.setAttribute("id", "display");
    inputField.classList = "input";
    inputField.setAttribute("type", "text");
    // inputField.addEventListener("change", this.validateInput);
    return inputField;
  };

  this.getButton = function (value, type, colSpan) {
    var btn = document.createElement("button");
    btn.setAttribute("value", value);
    btn.setAttribute("btntype", type);
    btn.classList = "btn-calc";
    btn.innerHTML = value;
    btn.addEventListener("click", this.calc);
    var td = document.createElement("td");
    td.appendChild(btn);
    if (colSpan) {
      td.setAttribute("colspan", colSpan);
    }
    return td;
  };

  // this.createCalc = function () {
  //   var box = document.createElement("div");
  //   box.classList = "calc";
  //   var app = document.getElementById("app");
  //   InputField = this.getInput();
  //   box.appendChild(InputField);
  //   app.appendChild(box);
  //   var table = document.createElement("table");
  //   var tr1 = document.createElement("tr");
  //   var btn7 = this.getButton(7, "n");
  //   var btn8 = this.getButton(8, "n");
  //   var btn9 = this.getButton(9, "n");
  //   var btnA = this.getButton("+", "o");
  //   tr1.appendChild(btn7);
  //   tr1.appendChild(btn8);
  //   tr1.appendChild(btn9);
  //   tr1.appendChild(btnA);

  //   var tr2 = document.createElement("tr");
  //   var btn4 = this.getButton(4, "n");
  //   var btn5 = this.getButton(5, "n");
  //   var btn6 = this.getButton(6, "n");
  //   var btnB = this.getButton("-", "o");
  //   tr2.appendChild(btn4);
  //   tr2.appendChild(btn5);
  //   tr2.appendChild(btn6);
  //   tr2.appendChild(btnB);

  //   var tr3 = document.createElement("tr");
  //   var btn1 = this.getButton(1, "n");
  //   var btn2 = this.getButton(2, "n");
  //   var btn3 = this.getButton(3, "n");
  //   var btnC = this.getButton("*", "o");
  //   tr3.appendChild(btn1);
  //   tr3.appendChild(btn2);
  //   tr3.appendChild(btn3);
  //   tr3.appendChild(btnC);

  //   var tr4 = document.createElement("tr");
  //   var btn0 = this.getButton(0, "n");
  //   var btnD = this.getButton(".", "n");
  //   var btnClr = this.getButton("AC", "o");
  //   var btnE = this.getButton("/", "o");
  //   tr4.appendChild(btn0);
  //   tr4.appendChild(btnD);
  //   tr4.appendChild(btnClr);
  //   tr4.appendChild(btnE);

  //   table.appendChild(tr1);
  //   table.appendChild(tr2);
  //   table.appendChild(tr3);
  //   table.appendChild(tr4);
  //   box.appendChild(table);
  // };

  this.createCalc1 = function () {
    var box = document.createElement("div");
    box.classList = "calc";
    var app = document.getElementById("app");
    InputField = this.getInput();
    box.appendChild(InputField);
    app.appendChild(box);
    var table = document.createElement("table");
    var arr = [
      { value: "AC", type: "clear", colSpan: 2 },
      { value: "%", type: "o" },
      { value: "/", type: "o" },
      { value: "break" },
      { value: "7", type: "n" },
      { value: "8", type: "n" },
      { value: "9", type: "n" },
      { value: "*", type: "o" },
      { value: "break" },
      { value: "4", type: "n" },
      { value: "5", type: "n" },
      { value: "6", type: "n" },
      { value: "-", type: "o" },
      { value: "break" },
      { value: "1", type: "n" },
      { value: "2", type: "n" },
      { value: "3", type: "n" },
      { value: "+", type: "o" },
      { value: "break" },
      { value: "0", type: "n", colSpan: 2 },
      { value: ".", type: "n" },
      { value: "=", type: "o" },
      { value: "break" }
    ];
    var tr = document.createElement("tr");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === "break") {
        table.appendChild(tr);
        tr = document.createElement("tr");
      } else if (arr[i].value === "") {
        tr.appendChild(document.createElement("td"));
      } else {
        var btn = this.getButton(arr[i].value, arr[i].type, arr[i].colSpan);
        tr.appendChild(btn);
      }
    }
    box.appendChild(table);
  };

  // this.validateInput = function (evt) {
  //   if (regx.test(evt.target.value)) {
  //     console.log(false);
  //   }
  // };

  this.calc = function (evt) {
    var value = evt.target.value;
    var type = evt.target.getAttribute("btntype");
    if (type === "clear") {
      operator = "";
      prevResult = "";
      InputField.value = "";
    } else if (type === "o") {
      if (prevResult) {
        if (operator) {
          if (operator !== "=") {
            prevResult = prevResult.slice(0, prevResult.length - 1);
          }
          if (value !== "=") {
            prevResult = prevResult + value;
          }
        } else {
          var res;
          try {
            res = eval(prevResult);
          } catch {
            res = 0;
          }
          if (value === "=") {
            prevResult = res;
          } else {
            prevResult = res + value;
          }
          InputField.value = res;
        }
      } else {
        prevResult = InputField.value;
      }
      operator = value;
    } else {
      if (operator && prevResult) {
        if (value === ".") {
          prevResult += "0.";
          InputField.value = "0.";
        } else {
          prevResult += value;
          InputField.value = value;
        }
        if (operator === "=") {
          prevResult = InputField.value;
        }
      } else {
        if (value === ".") {
          if (InputField.value.indexOf(".") > -1) {
            return false;
          }
          if (!InputField.value) {
            InputField.value = "0.";
            prevResult += "0.";
            return false;
          }
        }
        InputField.value += value;
        prevResult += value;
      }
      operator = "";
    }
    console.log(prevResult, operator, InputField.value);
  };
}

var calc = new Calculator();
calc.createCalc1();
