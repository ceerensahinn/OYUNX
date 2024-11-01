const kartlarDizisi = [
    { isim: 'imege1', img: 'imege1.png' },
    { isim: 'imege2', img: 'imege2.png' },
    { isim: 'imege3', img: 'imege3.png' },
    { isim: 'imege4', img: 'imege4.png' },
    { isim: 'imege1', img: 'imege1.png' },
    { isim: 'imege2', img: 'imege2.png' },
    { isim: 'imege3', img: 'imege3.png' },
    { isim: 'imege4', img: 'imege4.png' }
];

const oyunTahtasi = document.getElementById('oyunTahtasi');
const tebrikMesaji = document.getElementById('tebrikMesaji');
let ilkKart, ikinciKart;
let kartKilidi = false;
let eslesmeler = 0;

function karistir(dizi) {
    dizi.sort(() => 0.5 - Math.random());
}

function oyunTahtasiniOlustur() {
    karistir(kartlarDizisi);
    kartlarDizisi.forEach(item => {
        const kart = document.createElement('div');
        kart.classList.add('kart');
        kart.dataset.isim = item.isim;

        const onYuz = document.createElement('img');
        onYuz.src = item.img;
        kart.appendChild(onYuz);

        oyunTahtasi.appendChild(kart);

        kart.addEventListener('click', kartCevir);
    });
}

function kartCevir() {
    if (kartKilidi) return;
    if (this === ilkKart) return;

    this.classList.add('cevirdi');

    if (!ilkKart) {
        ilkKart = this;
        return;
    }

    ikinciKart = this;
    eslesmeKontrolu();
}

function eslesmeKontrolu() {
    let eslesmeVarMi = ilkKart.dataset.isim === ikinciKart.dataset.isim;

    eslesmeVarMi ? kartlariDevreDisiBirak() : kartlariYenidenCevir();
}

function kartlariDevreDisiBirak() {
    ilkKart.removeEventListener('click', kartCevir);
    ikinciKart.removeEventListener('click', kartCevir);

    eslesmeler++;
    if (eslesmeler === kartlarDizisi.length / 2) {
        tebrikMesajiniGoster();
    }

    tahtayiSifirla();
}

function kartlariYenidenCevir() {
    kartKilidi = true;

    setTimeout(() => {
        ilkKart.classList.remove('cevirdi');
        ikinciKart.classList.remove('cevirdi');

        tahtayiSifirla();
    }, 1000);
}

function tahtayiSifirla() {
    [ilkKart, ikinciKart, kartKilidi] = [null, null, false];
}

function tebrikMesajiniGoster() {
    tebrikMesaji.style.display = 'block';
}

oyunTahtasiniOlustur();
