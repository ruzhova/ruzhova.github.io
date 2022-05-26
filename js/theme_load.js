let link = document.getElementById("theme_link");

const defaultTheme_link = "../css/theme.css";
const fancyTheme_link = "../css/fancytheme.css";

const defaultTheme = "defaultTheme";
const fancyTheme = "fancyTheme";

let curr_theme = localStorage.getItem("currtheme");

if (curr_theme == defaultTheme || curr_theme == "undefined") {
  link.href = defaultTheme_link;
} else {
  link.href = fancyTheme_link;
}