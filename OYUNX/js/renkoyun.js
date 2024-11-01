document.addEventListener('DOMContentLoaded', function() {
    const turkceInput = document.getElementById('turkce-input');
    const ingilizceInput = document.getElementById('ingilizce-input');
    const checkButton = document.getElementById('check-button');
    const resultText = document.getElementById('result');

    let currentColorIndex = 0;

    // Başlangıçta ilk renk sorusunu göster
    showNextColorQuestion();

    // Kontrol et düğmesine tıklanınca çalışacak fonksiyon
    checkButton.addEventListener('click', function() {
        const turkceInputValue = turkceInput.value.trim().toLowerCase();
        const ingilizceInputValue = ingilizceInput.value.trim().toLowerCase();

        // Doğru cevap kontrolü
        if (ingilizceInputValue === kelimeListe[currentColorIndex].ingilizce.toLowerCase()) {
            resultText.textContent = 'Doğru!';
            resultText.style.color = 'green';
        } else {
            resultText.textContent = 'Yanlış!';
            resultText.style.color = 'red';
        }

        // Sonraki renk sorusunu göster
        setTimeout(function() {
            resultText.textContent = '';
            resultText.style.color = '';

            currentColorIndex++;
            if (currentColorIndex >= kelimeListe.length) {
                currentColorIndex = 0; // Liste sonuna gelince başa dön
            }
            showNextColorQuestion();
        }, 1000);
    });

    // Sonraki renk sorusunu gösteren fonksiyon
    function showNextColorQuestion() {
        turkceInput.value = kelimeListe[currentColorIndex].turkce;
        ingilizceInput.value = '';
    }
});

// Renkler sözlüğü
var kelimeListe = [
    {turkce: "kırmızı", ingilizce: "red"},
    {turkce: "mavi", ingilizce: "blue"},
    {turkce: "yeşil", ingilizce: "green"},
    {turkce: "sarı", ingilizce: "yellow"},
    {turkce: "turuncu", ingilizce: "orange"},
    {turkce: "siyah", ingilizce: "black"},
    {turkce: "beyaz", ingilizce: "white"},
    {turkce: "pembe", ingilizce: "pink"},
    {turkce: "gri", ingilizce: "gray"},
    {turkce: "lacivert", ingilizce: "darkblue"},
    {turkce: "mor", ingilizce: "purple"},
    {turkce: "kahverengi", ingilizce: "brown"}
];
