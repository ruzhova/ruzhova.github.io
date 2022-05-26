function begin() {
    const defaultName = "Игрок";
    const authField = document.getElementById("authField");
    const startButton = document.getElementById("startbutton");
  
    startButton.addEventListener("click", () => {
        if (authField.value === "") {
            let cfm = confirm("Вы не ввели имя! Нажимая \"ОК\" Вы продолжите под именем Игрок.");
            if (cfm == true) {
                localStorage.setItem("username", defaultName);
                localStorage.setItem("score", "0");
                location.href = "../levels/level1.html";
            } else {
                return;
            }
        } else {
            localStorage.setItem("username", authField.value);
            localStorage.setItem("score", "0");
            location.href = "../levels/level1.html";
        }
    });
}
  
export { begin };