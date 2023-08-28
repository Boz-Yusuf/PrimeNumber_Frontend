const apiUrl = "https://localhost:7100/api/PrimeNumber";
let numberList = [];
let numberListViewValue = "Numbers: ";


const addButton = document.querySelector("#addNumberButton");
const calculateButton = document.querySelector("#calculateButton");
const numberInput = document.querySelector("#numberInput");
const resultValue = document.querySelector("#biggestPrimeNumber");

let numberListView = document.querySelector("#numberListView");



addButton.addEventListener("click",addNumber);
calculateButton.addEventListener("click",calculate)



// Add New Number
function addNumber(){
  if(numberInput.value < 2)
    {
      console.log("1den küçük");
      validation();
      return;
    }
    numberList.push(parseInt(numberInput.value));
    numberListViewValue += (numberInput.value + " ")
    numberListView.innerText = numberListViewValue;
    numberInput.value = "";
}

// Find Biggest Prime Number
function calculate(){
  
    sendPostRequest(numberList);
    numberList = [];
    numberListViewValue  = "";
    numberListView.innerText = "Number: "
    
}

function validation(number){
  numberInput.value = "";
  window.alert("prime numbers greater than 1");

}


async function sendPostRequest(numberSet) {
    
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ numberSet })
      });
  
      const data = await response.json();
      let result = data.data.biggestPrimeNumber
      if(result === -1)
        resultValue.innerText =  "Result: " + "there is no prime number in your list" ;
      else
        resultValue.innerText =  "Result: " + result ;
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  }