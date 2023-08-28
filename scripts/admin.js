const tbodyElement = document.getElementById("primeNumberSets");
const signOutButton = document.querySelector("#signOutButton");

signOutButton.addEventListener("click",signOut);

let result = "";
let savedToken = getCookie("authToken");

if(savedToken == null)
  window.location.href = 'unauthorized.html';



  fetchDataWithToken(savedToken);

async function fetchDataWithToken(token) {
  const apiUrl = "https://localhost:7100/api/PrimeNumber";
  const tbodyElement = document.getElementById("primeNumberSets"); 

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    let result = ""; 

    data.data.forEach(element => {
      result += `
        <tr>
          <td>${element.biggestPrimeNumber}</td>
          <td>${element.numbers}</td>
        </tr>
      `;
    });

    tbodyElement.innerHTML = result; 

  } catch (error) {
    window.location.href = 'unauthorized.html'; 
    console.error('Bir hata oluştu:', error);
  }
}


function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return "";
}


function signOut(){
  console.log("test")
  document.cookie = "authToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = 'index.html'; 
}



  
