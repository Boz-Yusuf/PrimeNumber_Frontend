const apiUrl = "https://localhost:7100/api/User/Register";

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const confirmPasswordInput = document.querySelector("#confirmPasswordInput");
const signUpButton = document.querySelector("#submitButton");
const errorection = document.querySelector("#errorSection");

signUpButton.addEventListener("click",signUp);

function signUp(){
    if(isEmpty()){
        window.alert("Bu alalar boş bırakılamaz");
        return;
    }
    if(isPasswordConfirmed()){
        window.alert("Şifreler Uyumsuz");
        confirmPasswordInput.value = "";
        return;
    }
    sendRegisterRequest();
}


function isPasswordConfirmed(){
    if(passwordInput.value !== confirmPasswordInput.value)
        return true;
    return false;
}

function isEmpty(){
    if(passwordInput.value === "" || confirmPasswordInput.value === "" || emailInput.value === "")
        return true;
    return false;
}


async function sendRegisterRequest() {
    const requestBody = {
      email: emailInput.value,
      password: passwordInput.value,
      passwordConfirm: confirmPasswordInput.value
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const data = await response.json();
        window.location.href = 'SignIn.html';
      } else {
        console.log("Başarısız istek:", response);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  }
  
 