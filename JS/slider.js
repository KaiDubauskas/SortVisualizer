//shift alt f
//retreive from html page
let slider = document.getElementById("quantity");
let slider2 = document.getElementById("random");
let output = document.getElementById("slider1");
let output2 = document.getElementById("slider2");
let main = document.getElementById("main");
let results = document.getElementById("results");

let arrElement = [];
let rectWidth;
let counter = 0;
let styleRight;
let intervalId;
let inserionId;

//for timing swaps based on size of array
let iterateTime;
let iterateTimeSingle;
let swapTime;
let upDownTime;

output.innerHTML = slider.value;
output2.innerHTML = slider2.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    calcSlider();
}
slider2.oninput = function () {
    output2.innerHTML = this.value;
    calcSlider();
}
function cancelSort() {
    clearInterval(intervalId);
}

function calcSlider() {
    clearInterval(intervalId);
    arrElement = [];
    main.innerHTML = ""
    rectWidth = 100.0 / slider.value;
    const arrRect = [];
    for (i = 0; i < slider.value; i++) {
        let generator;
        let temp;
        if (arrRect && arrRect.length == 0)
            temp = ~~(Math.random() * 100 + 20);
        else
            temp = arrRect[0].getAttribute("value");

        if (slider2.value == 5)
            generator = Math.abs(Math.min(~~(Math.random() * 120 + (temp - 60)), 580)) + 19;
        else if (slider2.value == 4)
            generator = Math.abs(Math.min(~~(Math.random() * 160 + (temp - 80)), 580)) + 19;
        else if (slider2.value == 3)
            generator = Math.abs(Math.min(~~(Math.random() * 210 + (temp - 125)), 580)) + 19;
        else if (slider2.value == 2)
            generator = Math.abs(Math.min(~~(Math.random() * 280 + (temp - 155)), 580)) + 19;
        else
            generator = ~~(Math.random() * 550 + 30);
        if (temp > 680) {
            let n = ~~(Math.random() * 30 + 20);
            generator -= n;
        }

        let newRect = document.createElement('div');
        let para = document.createElement("p");
        para.setAttribute("class", "paraNum");
        newRect.setAttribute("class", "rect");
        para.innerHTML = generator
        newRect.appendChild(para);
        //for styling may need to put value in a <p> and add class
        newRect.setAttribute("value", generator);
        arrRect.unshift(newRect);
        newRect.style.height = generator + "px";
        newRect.style.position = "absolute";
        newRect.style.width = rectWidth - 0.5 + "%";
        newRect.style.backgroundColor = "#E42F65";
        newRect.style.right = (i * rectWidth) + "%";
        newRect.style.top = "100%";
        newRect.style.bottom = "0%"
        //newRect.style.color = white;
        newRect.style.marginTop = "-" + generator + "px";
        newRect.setAttribute("styleRight", i * rectWidth);
        //Could possibly just get rid of ArrElement and only use arrRect
        arrElement.unshift(newRect);
        main.appendChild(newRect);
    }
}
function calcTimeInterval() {
    let sliderVal = slider.value;
    if (sliderVal <= 5) {
        iterateTime = 5000;
        iterateTimeSingle = 450;
        swipeTime = 7;
        upDownTime = 18;
    }
    else if (sliderVal <= 11) {
        iterateTime = 5900;
        iterateTimeSingle = 380;
        swipeTime = 7;
        upDownTime = 16;
    }
    else {
        iterateTime = 6900;
        iterateTimeSingle = 270;
        swipeTime = 6;
        upDownTime = 12;
    }
}
function selection() {
    calcTimeInterval()
    let len = arrElement.length;
    let i = 0;
    intervalId = setInterval(function () {
        if (i >= len - 1)
            clearInterval(intervalId);
        let min = i;
        let j = i;
        let interval2Id = setInterval(function () {
            if (j >= len) {
                if (min !== i) {
                    wrapper0(arrElement[i], arrElement[min]);
                    wrapper(arrElement[i], arrElement[min]);
                    wrapper1(arrElement[i], arrElement[min]);
                    let tmp = arrElement[i];
                    arrElement[i] = arrElement[min];
                    arrElement[min] = tmp;
                }
                else {
                    arrElement[i].style.backgroundColor = "green";
                }
                for (let u = i + 1; u < len; u++)
                    arrElement[u].style.backgroundColor = "#E42F65";
                i++;
                clearInterval(interval2Id);
            }
            else {
                arrElement[j].style.backgroundColor = "orange";
                if (parseInt(arrElement[min].getAttribute("value")) >
                    parseInt(arrElement[j].getAttribute("value"))) {
                    arrElement[min].style.backgroundColor = "orange";
                    arrElement[j].style.backgroundColor = "red";
                    min = j;
                    counter++;
                }
            }
            j++;
        }, iterateTimeSingle);
    }, iterateTime);
}

function insertion() {
    let len = arrElement.length;
    let i = 1;
    insertionId = window.setInterval(function () {
        if (i >= len - 1) {//len-1
            console.log("done");
            clearInterval(insertionId);
        }
        let temp = arrElement[i];
        let key = parseInt(arrElement[i].getAttribute("value"));
        let j = i - 1;
        let insertion2Id = window.setInterval(function () {
            if (j < 0 ||
                parseInt(arrElement[j].getAttribute("value")) < key) {
                // main.innerHTML="";
                // for(let l=0; l<arrElement.length; l++)
                //     main.appendChild(arrElement[l]);
                // main.removeChild(arrElement[j+1]);
                // main.appendChild(temp);
                // arrElement[j + 1].setAttribute("value",temp);
                // arrElement[j + 1].height = tempHeight;
                clearInterval(insertion2Id);

                i++;
            }
            else {
                wrapper(arrElement[j], arrElement[j + 1]);
                arrElement[j + 1] = arrElement[j];
                j--;
            }
        }, 200);
    }, 6500);
}
function Huuu() {
    // arrElement[j].setAttribute("value",temp.getAttribute("value"));
    // arrElement[j+1].innerHTML = temp.innerHTML;
    // arrElement[j].style.marginTop = temp.style.marginTop;
    // arrElement[j].style.height = temp.style.height;
    for (let o = 0; o < arrElement.length; o++) {
        console.log(arrElement[o].getAttribute("value") + " " + o)
    }
}

function wrapper(arr, arr1) {
    window.setTimeout(function () {
        let id = window.setInterval(swap, swapTime);
        let fin = arr1.getAttribute("styleRight");
        let a1 = arr.style.right;
        let a2 = arr1.style.right;
        function swap() {
            let temp = parseInt(arr.getAttribute("styleRight"));
            let temp2 = parseInt(arr1.getAttribute("styleRight"));
            if (temp <= fin) {
                arr.style.right = a2;
                arr1.style.right = a1;
                clearInterval(id);
            }
            else {
                arr.style.right = (temp - 1) + "%";
                arr.setAttribute("styleRight", temp - 1);
                arr1.style.right = (temp2 + 1) + "%";
                arr1.setAttribute("styleRight", temp2 + 1);
            }
        }
    }, 760);//760
}

function wrapperInsertion(arr, arr1) {
    window.setTimeout(function () {
        let id = window.setInterval(swap, swapTime);
        let fin = arr1.getAttribute("styleRight");
        let a2 = arr1.style.right;
        let copy = arr.cloneNode(true);
        arr.parentNode.appendChild(copy);
        let index = arrElement.indexOf(arr1);
        function swap() {
            let temp = parseInt(arr.getAttribute("styleRight"));
            if (temp <= fin) {
                arr1.innerHTML = "";
                arr.style.right = a2;
                arrElement[index] = copy;
                clearInterval(id);
            }
            else {
                arr.style.right = (temp - 1) + "%";
                arr.setAttribute("styleRight", temp - 1);
            }
        }
    }, 760);//760
}

function wrapper0(arr, arr1) {
    let raise = window.setInterval(lift, upDownTime);
    let liftInterval = 100;
    function lift() {
        if (arr.style.top === "90%")
            clearInterval(raise);
        else {
            liftInterval -= 1;
            arr.style.top = liftInterval + "%";
            arr1.style.top = liftInterval + "%"
        }
    }
}

function wrapper1(arr, arr1) {
    window.setTimeout(function () {
        let lower = window.setInterval(down, upDownTime);
        let downInterval = 90;
        function down() {
            if (arr1.style.top === "100%") {
                arr1.style.backgroundColor = "green";
                clearInterval(lower);
            }
            else {
                downInterval += 1;
                arr.style.top = downInterval + "%";
                arr1.style.top = downInterval + "%"
            }
        }
    }, 1410)
}

function display() {
    main.innerHTML = "";
    results.innerHTML = "";
    for (let i = 0; i < arrElement.length; i++) {
        arrElement[i].style.right = (i * rectWidth) + "%";
        main.appendChild(arrElement[i]);
    }
    let textNode = document.createTextNode(counter);
    let wrapper = document.createElement("div")
    wrapper.appendChild(textNode);
    results.appendChild(wrapper);
    counter = 0;
}

function insertio() {
    let i = 1;
    let iny = window.setInterval(function () {
        if (i >= arrElement.length)
            clearInterval(iny);
        wrapper0(arrElement[i], arrElement[i + 1]);
        wrapper(arrElement[i], arrElement[i + 1]);
        wrapper1(arrElement[i], arrElement[i + 1]);
        //arrElement[i].style.backgroundColor = "#E42F65";
        let tmp = arrElement[i];
        arrElement[i] = arrElement[i + 1];
        arrElement[i + 1] = tmp;
        i++;
    }, 8200);
}


// function selectionWrapper() attempt to get rid of initial delay. Fail{
//     calcTimeInterval();
//     selection(0);
//     window.setTimeout(function(){
//         intervalId = setInterval(selection(1), iterateTime);
//     },iterateTime);
//     //intervalId = setInterval(selection(selectionCounter), iterateTime);
// }
// function selection(i) {
//     let len = arrElement.length;
//     if (i >= len - 1)
//         clearInterval(intervalId);
//     let min = i;
//     let j = i;
//     let interval2Id = setInterval(function () {
//         if (j >= len) {
//             if (min !== i) {
//                 wrapper0(arrElement[i], arrElement[min]);
//                 wrapper(arrElement[i], arrElement[min]);
//                 wrapper1(arrElement[i], arrElement[min]);
//                 let tmp = arrElement[i];
//                 arrElement[i] = arrElement[min];
//                 arrElement[min] = tmp;
//             }
//             else {
//                 arrElement[i].style.backgroundColor = "green";
//             }
//             for (let u = i + 1; u < len; u++)
//                 arrElement[u].style.backgroundColor = "#E42F65";
//             selectionCounter++;
//             clearInterval(interval2Id);
//         }
//         else {
//             arrElement[j].style.backgroundColor = "orange";
//             if (parseInt(arrElement[min].getAttribute("value")) >
//                 parseInt(arrElement[j].getAttribute("value"))) {
//                 arrElement[min].style.backgroundColor = "orange";
//                 arrElement[j].style.backgroundColor = "red";
//                 min = j;
//                 counter++;
//             }
//         }
//         j++;
//     }, iterateTimeSingle);
// }



// function selection() Works w/ minFeature{
//     calcTimeInterval()
//     let len = arrElement.length;
//     let i = 0;
//     intervalId = setInterval(function () {
//         if (i >= len - 1)
//             clearInterval(intervalId);
//         let min = i;
//         let j = i;
//         let interval2Id = setInterval(function () {
//             if (j >= len) {
//                 if (min !== i) {
//                     wrapper0(arrElement[i], arrElement[min]);
//                     wrapper(arrElement[i], arrElement[min]);
//                     wrapper1(arrElement[i], arrElement[min]);
//                     let tmp = arrElement[i];
//                     arrElement[i] = arrElement[min];
//                     arrElement[min] = tmp;
//                 }
//                 else {
//                     arrElement[i].style.backgroundColor = "green";
//                 }
//                 for (let u = i + 1; u < len; u++)
//                     arrElement[u].style.backgroundColor = "#E42F65";
//                 i++;
//                 clearInterval(interval2Id);
//             }
//             else {
//                 arrElement[j].style.backgroundColor = "orange";
//                 if (parseInt(arrElement[min].getAttribute("value")) >
//                     parseInt(arrElement[j].getAttribute("value"))) {
//                     arrElement[min].style.backgroundColor = "orange";
//                     arrElement[j].style.backgroundColor = "red";
//                     min = j;
//                     counter++;
//                 }
//             }
//             j++;
//         }, iterateTimeSingle);
//     }, iterateTime);
// }



// function selection() Original w/o minFerature{
//     let len = arrElement.length;
//     let i = 0;
//     intervalId = setInterval(function () {
//         if (i >= len - 1)
//             clearInterval(intervalId);
//         let min = i;
//         for (let j = i + 1; j < len; j++) {
//             //arrElement[j].style.backgroundColor = "orange";
//             if (parseInt(arrElement[min].getAttribute("value")) >
//                 parseInt(arrElement[j].getAttribute("value"))) {
//                 min = j;
//                 counter++;
//             }
//         }

//         if (min !== i) {
//             wrapper0(arrElement[i], arrElement[min]);
//             wrapper(arrElement[i], arrElement[min]);
//             wrapper1(arrElement[i], arrElement[min]);
//             let tmp = arrElement[i];
//             arrElement[i] = arrElement[min];
//             arrElement[min] = tmp;
//         }
//         else
//             arrElement[i].style.backgroundColor = "green";
//         console.clear()
//         for (let o = 0; o < arrElement.length; o++)
//             console.log(arrElement[o].getAttribute("value"))
//         i++
//     }, 2800);
// }


// function selection() minFeature failed{
//     let len = arrElement.length;
//     let i = 0;
//     intervalId = setInterval(function () {
//         if (i >= len - 1)
//             clearInterval(intervalId);
//         let min = i;
//         let j = i + 1;
//         let interval2Id = setInterval(function () {
//             if (j >= len) {
//                 if (min !== i) {
//                     //wrapper0(arrElement[i], arrElement[min]);
//                     wrapper(arrElement[i], arrElement[min]);
//                     //wrapper1(arrElement[i], arrElement[min]);
//                     let tmp = arrElement[i];
//                     arrElement[i] = arrElement[min];
//                     arrElement[min] = tmp;
//                     for (let u = i+1; u < len; u++)
//                         arrElement[u].style.backgroundColor = "#E42F65";
//                     i++;
//                     clearInterval(interval2Id);
//                 }
//                 else {
//                     arrElement[i].style.backgroundColor = "green";
//                     i++;
//                     clearInterval(interval2Id);
//                 }
//                 // console.clear()
//                 // for (let o = 0; o < arrElement.length; o++)
//                 //     console.log(arrElement[o].getAttribute("value"));
//                 //clearInterval(interval2Id);
//             }
//             else {
//                 arrElement[j].style.backgroundColor = "orange";
//                 if (parseInt(arrElement[min].getAttribute("value")) >
//                     parseInt(arrElement[j].getAttribute("value"))) {
//                     //arrElement[min].style.backgroundColor = "orange";
//                     //arrElement[j].style.backgroundColor = "red";
//                     min = j;
//                     counter++;
//                 }
//             }
//             j++
//         }, 400);
//     }, 2800);
// }








// let len = arrElement.length;
//     for (let i = 0; i < len; i++) {
//         let min = i;

//             for (let j = i + 1; j < len; j++) {
//                 arrElement[j].style.backgroundColor = "red";
//                 if (parseInt(arrElement[min].getAttribute("value")) >
//                     parseInt(arrElement[j].getAttribute("value"))) {
//                     min = j;
//                     counter++;
//                 }

//                 arrElement[j].style.backgroundColor = "#E42F65";
//             }

//         if (min !== i) {
//             let tmp = arrElement[i];
//             arrElement[i] = arrElement[min];
//             arrElement[min] = tmp;
//         }
//     }
//     display();

// for(let i = 1; i<arrElement.length; i++){
//     let key = arrElement[i];
//     let keyValue = arrElement[i].getAttribute('value');
//     let j = i-1;
//     while(j>=0 && arrElement[j].getAttribute('value')>keyValue){
//         arrElement[j+1] = arrElement[j];
//         j--;
//     }
//     arrElement[j+1] = key;

//}
//(500-(slider.value-1)*10)

// Technically, according to the DTDs, they shouldn't have a value attribute either, but generally you'll want to use .getAttribute() in this case:

// function overlay()
// {
//     var cookieValue = document.getElementById('demo').getAttribute('value');
//     alert(cookieValue);
// }

// switch(slider2.value){
        //     case 2:
        //         generator = ~~(Math.random()*240+(temp-120));
        //         console.log(~~(Math.random()*60+(temp-30)));
        //         break;
        //     case 3:
        //         generator = ~~(Math.random()*160+(temp-80));
        //         break;
        //     case 4:
        //         generator = ~~(Math.random()*100+(temp-50));
        //         break;
        //     case 5:
        //         generator = ~~(Math.random()*60+(temp-30));
        //         console.log(~~(Math.random()*60+(temp-30)));
        //         break;
        //     default:
        //         generator = ~~(Math.random()*380+20);
        // }
