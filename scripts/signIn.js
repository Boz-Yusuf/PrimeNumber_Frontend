const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const signInButton = document.querySelector("#signInButton");
const errorSection = document.querySelector("#errorSection");
let token = ""


signInButton.addEventListener("click",signIn);


function signIn(){
  let email = emailInput.value;
  let password = passwordInput.value;
  if(email == "" || password == "" ){
    window.alert("Fill All Required Sections");
    return;
  }
  sendLoginRequest(email, password);
}

async function sendLoginRequest(emailInput, passwordInput) {
  const apiUrl = "https://localhost:7100/api/User/Login";
  const requestBody = {
    email: emailInput,
    password: passwordInput
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (response.ok) {  
      
      console.log("Başarılı:", data);
      token = data.data;
      console.log(token);
      setCookie("authToken", token, 7);
      window.location.href = 'index.html';
    } else {
      errorSection.innerText = data.errors;
    }
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  }
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict;Secure";
}


  
 
  