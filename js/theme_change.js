function change_theme() {
    let btn = document.getElementById("theme_change");
    let link = document.getElementById("theme_link");
    const defaultTheme = "../css/theme.css";
    const fancyTheme = "../css/fancytheme.css";
    btn.onclick = function changetheme() {
        let curr_theme = localStorage.getItem("currtheme");

        if (curr_theme == "defaultTheme") {
            curr_theme = "fancyTheme";
            localStorage.setItem("currtheme", curr_theme);
            link.href = fancyTheme;
        } else {
            curr_theme = "defaultTheme";
            localStorage.setItem("currtheme", curr_theme);
            link.href = defaultTheme;
        }
    };
}
export {change_theme};