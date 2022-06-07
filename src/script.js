var MQ = MathQuill.getInterface(2);

const calculator = document.querySelector(".calculator");
nerdamer.set('PARSE2NUMBER', true);
Decimal.set({precision:5});


var gridA = new Muuri('.conversions', {
    dragEnabled: true,
    dragContainer: document.body,
    dragSort: getAllGrids,
    items: '.item',
    dragHandle: '.item-content'
    }
);

var gridB = new Muuri('.quantities', {
    dragEnabled: true,
    dragContainer: document.body,
    dragSort: getAllGrids,
    items: '.item',
    dragHandle: '.item-content'
});

var gridC = new Muuri('.picket', {
    dragEnabled: true,
    dragContainer: document.body,
    dragSort: getAllGrids,
    items: '.item',
    dragHandle: '.item-content'
});

var allGrids = [gridA, gridB, gridC];

function getAllGrids() {
    return allGrids;
}

const addQuantities = document.getElementById('addQuantities');
const addConversions = document.getElementById('addConversions');
const compute = document.getElementById('compute');

addQuantities.addEventListener("click", addAQuantity);
addConversions.addEventListener("click", addAConversion);
compute.addEventListener("click", computeResult);

addAConversion("100 \\frac{cm}{m}");
addAConversion("2.54 \\frac{cm}{in}");
addAConversion("12 \\frac{in}{ft}");
addAConversion("5280 \\frac{ft}{mi}");
addAConversion("3600 \\frac{s}{hr}");
addAQuantity("30 \\frac{m}{s}");

function addAQuantity(quantity = "1") {
  if (quantity.target) {quantity = 1;}
  
  console.log("adding one");
    let newQuant = document.createElement("div");
    newQuant.classList.add("item");
    document.querySelector(".quantities").appendChild(newQuant);
    let newItemContent = document.createElement("div");
    newItemContent.classList.add("item-content");
    let quantCount = document.querySelectorAll(".quant") ?? "";
    quantCount = quantCount.length
    newItemContent.innerHTML = `<div class="item-title"><span class="answer quant" id="quant${quantCount}">${quantity}</span></div>`;


    newQuant.appendChild(newItemContent);


    const itemActions = document.importNode(document.querySelector(".item-actions").content, true);
    newQuant.appendChild(itemActions);
    newQuant.querySelector(".board-item-action.edit").addEventListener("click", editQuantity);
    newQuant.querySelector(".board-item-action.delete").addEventListener("click", deleteQuantity);
    newQuant.addEventListener("click", flipQuantity);
    

    gridB.add([newQuant]);


    let answerSpan = document.getElementById(`quant${quantCount}`);
    console.log(answerSpan)
    let answerMathField = MQ.MathField(answerSpan, {
      handlers: {
        edit: function() {
          console.log("editing");
          var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
          console.log(enteredMath);  
        },
        enter: function () {
          var entered = answerMathField.latex();
          console.log(entered);
        }
      }
    });
}


function addAConversion(quantity = "1") {
  if (quantity.target) {quantity = 1;}

  console.log("adding one");
  let newQuant = document.createElement("div");
  newQuant.classList.add("item");
  document.querySelector(".conversions").appendChild(newQuant);
  let newItemContent = document.createElement("div");
  newItemContent.classList.add("item-content");
  let convCount = document.querySelectorAll(".conv") ?? "";
  convCount = convCount.length;
  newItemContent.innerHTML = `<div class="item-title"><span class="answer conv" id="conv${convCount}">${quantity}</span></div>`;
  newQuant.appendChild(newItemContent);

  const itemActions = document.importNode(document.querySelector(".item-actions").content, true);
  newQuant.appendChild(itemActions);
  newQuant.querySelector(".board-item-action.edit").addEventListener("click", editQuantity);
  newQuant.querySelector(".board-item-action.delete").addEventListener("click", deleteQuantity);
  newQuant.addEventListener("click", flipQuantity);

  gridA.add([newQuant]);

  let answerSpan = document.getElementById(`conv${convCount}`);
  console.log(answerSpan)
  let answerMathField = MQ.MathField(answerSpan, {
    handlers: {
      edit: function() {
        console.log("editing");
        var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
        console.log(enteredMath);
      },
      enter: function () {
        var entered = answerMathField.latex();
        console.log(entered);
        answerMathField.blur();  
      }
    }
  });
}

function addAResult(quantity = "1") {
  if (quantity.target) {quantity = 1;}

  console.log("adding a result");
  let newQuant = document.createElement("div");
  newQuant.classList.add("item");
  document.querySelector(".picket").appendChild(newQuant);
  let newItemContent = document.createElement("div");
  newItemContent.classList.add("item-content");

  let resultsCount = document.querySelectorAll(".result") ?? "";
  resultsCount = resultsCount.length;
  newItemContent.innerHTML = `<div class="item-title"><span class="answer result" id="result${resultsCount}">${quantity}</span></div>`;

  newQuant.appendChild(newItemContent);

  const itemActions = document.importNode(document.querySelector(".item-actions").content, true);
  newQuant.appendChild(itemActions);
  newQuant.querySelector(".board-item-action.edit").addEventListener("click", editQuantity);
  newQuant.querySelector(".board-item-action.delete").addEventListener("click", deleteQuantity);
  newQuant.addEventListener("click", flipQuantity);

  gridC.add([newQuant]);

  let answerSpan = document.getElementById(`result${resultsCount}`);
  MQ.StaticMath(answerSpan);
}


var selectedItemElem = null;
var selectedTitleElem = null;

function editQuantity(e) {
    console.log("editing", e.target);
    e.preventDefault();
    

    const editElem = e.target;
    const itemElem = editElem.closest('.item');
    const titleElem = itemElem.querySelector('.item-title');
    const activate = selectedItemElem !== itemElem;

    if (selectedItemElem) {
      selectedItemElem.classList.remove('editing');
      selectedTitleElem.setAttribute('contenteditable', false);
      selectedTitleElem.setAttribute('focusable', false);
      selectedTitleElem.setAttribute('tabindex', '');
      MQ(selectedItemElem.querySelector(".answer")).blur();
      selectedItemElem = null;
      selectedTitleElem = null;
    }

    if (activate) {
      selectedItemElem = itemElem;
      selectedTitleElem = titleElem;
      selectedItemElem.classList.add('editing');
      selectedTitleElem.setAttribute('contenteditable', true);
      selectedTitleElem.setAttribute('focusable', true);
      selectedTitleElem.setAttribute('tabindex', 0);
      MQ(selectedItemElem.querySelector(".answer")).focus();
    }
}

function deleteQuantity(e) {
    console.log("deleting", e.target);
    const itemElem = e.target.closest(".item");
    const item = allGrids.reduce((acc, grid) => acc || grid.getItem(itemElem), undefined);
    const grid = item.getGrid();
    grid.hide([item], {
      onFinish: () => {
        grid.remove([], { removeElements: true });
      },
    });
    itemElem.remove();

}

function flipQuantity(e) {
  if (e.shiftKey) {
    nerdamer.set('PARSE2NUMBER', true);
    const itemElem = e.target.closest(".item");
    let qty = nerdamer.convertFromLaTeX(MQ(itemElem.querySelector(".answer")).latex());
    console.log("1:", qty.toString());
    qty = nerdamer('1').divide(qty);
    console.log("2:", qty.toString());
    qty = nerdamer.simplify(qty);
    console.log("3:", qty.toString());
    qty = qty.evaluate();

    let numeric = new Decimal(qty.symbol.multiplier.num.value/qty.symbol.multiplier.den.value);
    console.log("4:", numeric.toExponential(4));
    qty.symbol.multiplier.num.value = numeric.toExponential(4);
    qty.symbol.multiplier.den.value = 1;
    MQ(itemElem.querySelector(".answer")).latex(qty.evaluate().toTeX('decimal'));
  }
}

/*find the product of each of the quantities in the picket*/
function computeResult(e) {
  let picket = document.querySelectorAll(".picket .item-title");
  let result = '1'
  picket.forEach( (item) => {
  console.log(MQ(item.querySelector(".answer")).latex());
    result += `*(${nerdamer.convertFromLaTeX(MQ(item.querySelector(".answer")).latex())})`;
  })
  console.log(result);
  let exp = nerdamer.simplify(result).toTeX('decimal');;
  addAResult(exp);

}


