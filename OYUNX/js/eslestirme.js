
const kartlarDizisi = [
    { isim: 'kek1', resim: 'https://w7.pngwing.com/pngs/734/421/png-transparent-german-chocolate-cake-fruitcake-layer-cake-torte-choco-cream-food-strawberries-thumbnail.png' },
    { isim: 'kek2', resim: 'https://w7.pngwing.com/pngs/374/951/png-transparent-chocolate-cupcake-cupcake-icing-chocolate-cake-muffin-strawberry-cake-cream-food-baking-thumbnail.png' },
    { isim: 'kek3', resim: 'https://w7.pngwing.com/pngs/454/622/png-transparent-chocolate-cake-birthday-cake-tart-bakery-cheesecake-fruit-cake-cream-frutti-di-bosco-food-thumbnail.png' },
    { isim: 'kek4', resim: 'https://w7.pngwing.com/pngs/281/16/png-transparent-cupcake-illustration-cupcake-birthday-cake-chocolate-cake-icing-cup-cake-cream-food-baking-thumbnail.png' },
    { isim: 'kek1', resim: 'https://w7.pngwing.com/pngs/734/421/png-transparent-german-chocolate-cake-fruitcake-layer-cake-torte-choco-cream-food-strawberries-thumbnail.png' },
    { isim: 'kek2', resim: 'https://w7.pngwing.com/pngs/374/951/png-transparent-chocolate-cupcake-cupcake-icing-chocolate-cake-muffin-strawberry-cake-cream-food-baking-thumbnail.png' },
    { isim: 'kek3', resim: 'https://w7.pngwing.com/pngs/454/622/png-transparent-chocolate-cake-birthday-cake-tart-bakery-cheesecake-fruit-cake-cream-frutti-di-bosco-food-thumbnail.png' },
    { isim: 'kek4', resim: 'https://w7.pngwing.com/pngs/281/16/png-transparent-cupcake-illustration-cupcake-birthday-cake-chocolate-cake-icing-cup-cake-cream-food-baking-thumbnail.png' }
 
];



//html
const oyunTahtasi = document.getElementById('oyun-tahtasi');
const tebrikMesaji = document.getElementById('tebrik-mesaji');

// Oyunun için değişkenler
let ilkKart = null;
let ikinciKart = null;
let tahtaKilidi = false;
let eslesmeler = 0;

//1.fonk=function karistir-> Diziyi rastgele karıştırma fonksiyonu
function karistir(array) {
    array.sort(() => 0.5 - Math.random());
}

// 2.fonk=function tahtaOlustur->Oyun tahtasını oluşturma fonksiyonu
function tahtaOlustur() {
    karistir(kartlarDizisi);
    kartlarDizisi.forEach(item => {
        const kart = document.createElement('div');
        kart.classList.add('kart');
        kart.dataset.isim = item.isim;

        // Kartın ön yüzü (resim)
        const onYuz = document.createElement('img');
        onYuz.src = item.resim;
        onYuz.classList.add('on-yuz');
        kart.appendChild(onYuz);

        oyunTahtasi.appendChild(kart);

        // Her kart için tıklama olayı ekleyin
        kart.addEventListener('click', kartiCevir);
    });
}

// 3.fonk=function kartiCevir->Kartı çevirme fonksiyonu
function kartiCevir() {
    if (tahtaKilidi || this === ilkKart) return;

    this.classList.add('flipped');

    if (!ilkKart) {
        ilkKart = this;
        return;
    }

    ikinciKart = this;
    eslesmeyiKontrolEt();
}

//4.fonk=function eslesmeyiKontrolEt-> Kartların eşleşip eşleşmediğini kontrol etme fonksiyonu
function eslesmeyiKontrolEt() {
    const eslesmeVarMi = ilkKart.dataset.isim === ikinciKart.dataset.isim;

    eslesmeVarMi ? kartlariDevreDisiBirak() : kartlariYenidenCevir();
}

//5.fonk=function kartlariDevreDisiBirak-> Eşleşen kartları devre dışı bırakma fonksiyonu
function kartlariDevreDisiBirak() {
    if (ilkKart && ikinciKart) {
        ilkKart.removeEventListener('click', kartiCevir);
        ikinciKart.removeEventListener('click', kartiCevir);
    }

    eslesmeler++;
    if (eslesmeler === kartlarDizisi.length / 2) {
        setTimeout(tebrikMesajiniGoster, 500);
    }

    tahtayiSifirla();
}

//6.fonk=function kartlariYenidenCevir-> Eşleşmeyen kartları yeniden çevirme fonksiyonu
function kartlariYenidenCevir() {
    tahtaKilidi = true;

    setTimeout(() => {
        if (ilkKart) ilkKart.classList.remove('flipped');
        if (ikinciKart) ikinciKart.classList.remove('flipped');

        tahtayiSifirla();
    }, 1000);
}

//7.fonk=function tahtayiSifirla-> Tahtayı sıfırlama fonksiyonu
function tahtayiSifirla() {
    [ilkKart, ikinciKart, tahtaKilidi] = [null, null, false];
}

//8.fonk=function tebrikMesajiniGoster-> Tebrik mesajını gösterme fonksiyonu
function tebrikMesajiniGoster() {
    tebrikMesaji.style.display = 'block';
}

// Oyunu başlatma 
tahtaOlustur();
