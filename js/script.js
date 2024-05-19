// scroll section active link / Pindah Fungsi Class Pas di Scroll atau pindah slide
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        };
    });
    // Sticky Navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //Hapus toggle icon dan navbar ketika di klik navbar link(scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};





//proyek probabilitas dan statistika


// Fungsi untuk eksponensial
function exp(x) {
    let sum = 1.0; // inisialisasi dengan 1
    let term = 1.0;
    for (let i = 1; i < 100; i++) {
        term *= x / i;
        sum += term;
    }
    return sum;
}

// Fungsi untuk pangkat
function pangkat(base, exponent) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

// Parameter:
// lam - rata-rata kejadian dalam interval waktu tertentu
// x - jumlah kejadian yang terjadi
function poissonProbability(lam, x) {
    return pangkat(lam, x) * exp(-lam) / factorial(x);
}




// Fungsi untuk menghitung faktorial dari sebuah bilangan
// Parameter:
// n - bilangan yang akan dihitung faktorialnya
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}


// Fungsi untuk menggambar grafik distribusi Poisson
// Mengambil nilai lambda dan maxX dari input pengguna, menghitung peluang, dan menampilkan grafik
function drawChart() {
    let lam = parseFloat(document.getElementById('lambda').value); // Mengambil nilai lambda dari input pengguna
    let maxX = parseInt(document.getElementById('maxX').value); // Mengambil nilai maxX dari input pengguna
    let probabilities = [];
    for (let x = 0; x <= maxX; x++) {
        probabilities.push(poissonProbability(lam, x)); // Menghitung peluang untuk setiap x dan menyimpannya dalam array
    }
    let chart = document.getElementById('chart');
    chart.innerHTML = ''; // Mengosongkan konten chart sebelumnya
    
    // Membuat sumbu y
    let sumbuY = document.createElement('div');
    sumbuY.className = 'y-axis';
    chart.appendChild(sumbuY);
    
    // Membuat sumbu x
    let sumbuX = document.createElement('div');
    sumbuX.className = 'axis';
    sumbuX.style.bottom = '-2px'; // Penyesuaian posisi sumbu x
    chart.appendChild(sumbuX);
    
    // Menentukan tinggi maksimum untuk skala bar
    let maxProbability = Math.max(...probabilities);
    let scaleFactor = 300 / maxProbability; // Tinggi maksimum container dibagi dengan peluang maksimum
    
    for (let i = 0; i < probabilities.length; i++) {
        let barContainer = document.createElement('div');
        barContainer.style.display = 'inline-block';
        barContainer.style.width = '30px';
        
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (probabilities[i] * scaleFactor) + 'px'; // Skala tinggi bar sesuai dengan faktor skala
        bar.style.width = '80%';
        bar.style.marginBottom = '0'; // Menghilangkan margin bawah
        barContainer.appendChild(bar);
        
        let label = document.createElement('div');
        label.className = 'bar-label';
        label.innerText = i;
        barContainer.appendChild(label);
        
        // Tambahkan teks peluang di atas bar
        let textProbability = document.createElement('div');
        textProbability.className = 'probability-text';
        textProbability.innerText = probabilities[i].toFixed(4); // Tampilkan 4 angka desimal
        bar.appendChild(textProbability);
        
        chart.appendChild(barContainer);
    }
}