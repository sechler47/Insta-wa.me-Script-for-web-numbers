// ==UserScript==
// @name         WhatsApp Quick Open (+55 auto)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Selecione um número e abra no WhatsApp rapidamente (com +55 automático)
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let button = document.createElement("div");
    button.innerText = "💬 WhatsApp";
    button.style.position = "absolute";
    button.style.padding = "6px 10px";
    button.style.background = "#25D366";
    button.style.color = "#fff";
    button.style.borderRadius = "6px";
    button.style.cursor = "pointer";
    button.style.zIndex = 999999;
    button.style.display = "none";
    button.style.fontSize = "12px";
    button.style.fontFamily = "Arial, sans-serif";
    button.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    document.body.appendChild(button);

    let selectedNumber = "";

    function formatNumber(text) {
        if (!text) return null;

        // remove tudo que não for número
        let num = text.replace(/\D/g, "");

        if (num.length < 8) return null;

        // adiciona +55 se não tiver
        if (!num.startsWith("55")) {
            num = "55" + num;
        }

        return num;
    }

    document.addEventListener("mouseup", function(e) {
        setTimeout(() => {
            let selection = window.getSelection().toString().trim();

            let formatted = formatNumber(selection);

            if (formatted) {
                selectedNumber = formatted;

                button.style.top = (e.pageY + 10) + "px";
                button.style.left = (e.pageX + 10) + "px";
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        }, 10);
    });

    button.addEventListener("click", function() {
        if (!selectedNumber) return;

        let url = "https://wa.me/" + selectedNumber;
        window.open(url, "_blank");

        button.style.display = "none";
    });

    document.addEventListener("click", function(e) {
        if (e.target !== button) {
            button.style.display = "none";
        }
    });

})();
