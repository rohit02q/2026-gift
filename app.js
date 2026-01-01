const APP_STATE = {
    currentPage: 1,
    friend: null,
}
const default_f = {
        texts: ["Happy new year🎉", "Aaj se har din thoda better.", "Jo 2025 mein chhoot gaya, 2026 mein complete ho"],
        images: ["7.jpg","1.jpg", "2.jpg", "3.jpg", "4.jpg","5.jpg","3.jpg", "4.jpg"],
        message:"Sahi ko meri taraf se happy new year"
    }
const friends = [
{
        name: "Aman",
        question: "Ye bata do tumhara 10th mein kya marks hai",
        texts: ["Happy new year🎉", "aaj se Har din thoda better.", "Ye dekho ->"],
        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg","5.jpg","3.jpg", "4.jpg"],
        answers: [391,"391"],
         message:"Hello aman ye new year special gift greeting card"
    },
{
        name: "Ashish",
        question: "Us din kitne ruoay nikale the bank se",
        texts: ["Happy new year🎉", "aaj se Har din thoda better.", "Ye dekho ->"],
        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg","5.jpg","3.jpg", "4.jpg"],
        answers: ['100',100],
         message:"Hello ashish ye new year special gift greeting card"
    },
    {
        name: "Varsha",
        question: "Jab main ek baar aya tha tumne mujhse ek spelling puchcha tha jiska answer maine keypad vaale phone mein likh kar dikhaya tha jo ki galat tha <br> haan to mujhe yo word ka speelling abhi bhi nahi aata hai :)<br> us word ka spelling kya tha?",
        texts: ["Happy new year🎉", "aaj se Har din thoda better.", "Ye dekho ->"],
        images: ["V1.jpg", "V2.jpg", "V3.jpg", "1.jpg", "V6.jpg","2.jpg", "3.jpg", "4.jpg","5.jpg","3.jpg", "4.jpg","V4.jpg", "v5.jpg"],
        answers: ['inter', "Intermediate"],
        message:"Hello varsha yahi hai jo main bahut pahle hi banaya tha dene ko but aaj new year ke din greeting card ki tarah ho gaya"
    }
]
const formDiv = document.querySelector('.form')
function handleForm(e) {
    e.preventDefault()
    document.getElementById('input').blur()
    if (APP_STATE.currentPage === 1) {
        let inputAns = document.getElementById('input').value
        let friend = friends.find(f => inputAns.toLowerCase().includes(f.name.toLowerCase()))
        let page1 = document.querySelector('.page1')
        if (!friend) {
                    formDiv.style.opacity = '0'
            page1.style.transform = 'translateX(-100%)'
            let page2 = document.querySelector('.page2')
        formDiv.style.display = "none"
        APP_STATE.currentPage = 3;
            APP_STATE.friend = default_f;
               APP_STATE.friend.name = inputAns
                   initNext()
        page2.style.transform = 'translateX(-100%)'
            return
        }
        formDiv.style.opacity = '0'
            page1.style.transform = 'translateX(-100%)'
        setTimeout(() => {
            APP_STATE.friend = friend
            makeForm(`😾 Wait, Main kaise maan lu tum ${friend.name} ho?`, 'answer', friend.question)
            APP_STATE.currentPage = 2
            formDiv.style.opacity = '1'
        }, 2000)
    }
    else if (APP_STATE.currentPage === 2) {
        let inputAns = document.getElementById('input').value
        let isCorrect = APP_STATE.friend.answers.some(a => inputAns.toLowerCase().includes(a))
        if (!isCorrect) return makeForm(`Achcha to tum ${APP_STATE.friend.name} nahi ho😏 <br> iska answer sirf ${APP_STATE.friend.name} ko hi pata hai`, 'answer', APP_STATE.friend.question)
        let page2 = document.querySelector('.page2')
        formDiv.style.display = "none"
        APP_STATE.currentPage = 3
        initNext()
        page2.style.transform = 'translateX(-100%)'
    }
}
function initNext() {
    const textDiv = document.querySelector('.text')
    textDiv.style.display = 'flex'
    APP_STATE.friend.texts.unshift("Hello " + APP_STATE.friend.name)
    function showNewText() {
        textDiv.style.opacity = '0'
        let showTimeout = setTimeout(() => {
            if (APP_STATE.currentPage == 7) {
                textDiv.style.display = 'none'
                clearTimeout(showTimeout)
                return
            }
            textDiv.style.opacity = '1'
            textDiv.innerHTML = `<h1 class="text-lg">${APP_STATE.friend.texts[APP_STATE.currentPage - 3]}</h1>`
        }, 1000)
    }
    showNewText()
    let slide = setInterval(() => {
        showNewText()
        document.querySelector(`.page${APP_STATE.currentPage}`).style.transform = 'translateX(-100%)'
        APP_STATE.currentPage += 1
        if (APP_STATE.currentPage >= 7) {
            makeLastPage();
            clearInterval(slide); return
        }
    }, 3000)
}
function makeLastPage() {
    document.body.style.overflow = 'auto'
    document.querySelector('.lastPage').innerHTML = `
         <div class="flex w-fit h-fit items-center gap-2 m-auto">
            <h1 class="text-3xl">Hi,${APP_STATE.friend.name}</h1>
            <p class="hand-wave text-lg">✋</p>
        </div>
        <div class="p-2 w-full h-fit">
            <div class="image-stock my-[4rem]">
            ${APP_STATE.friend.images.map((img, i) => {
        return `
                    <img src="./images/${img}" alt="${APP_STATE.friend.name}-image${i + 1}" onclick="topImage(${i})" height="auto" width="180" id="img${i}" style="--img-id:${i % 2 == 0 ? i : -i};z-index:${i}">
                    `
    })
        }
            </div>
        </div>
              <div class="h-auto w-full">
            <p class="text-lg" style="letter-spacing:1.2px;">${(APP_STATE.friend.message || "Happy New Year 2026!") + "<br>" + main_msg}</p>
        </div>
    `
}
// ---------------- Particle canvas & engine---------------
;(function initParticleCanvas(){
  // create canvas overlay
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let particles = [];
  let raf = null;

  function startLoop(){
    if(raf) return;
    function loop(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i = particles.length - 1; i >= 0; i--){
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;            // gravity
        p.vx *= 0.995;         // slight air
        p.vy *= 0.995;
        p.life -= 1;
        p.angle += p.spin;
        // draw as rotated rectangle for confetti-like look
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        ctx.restore();
        if(p.life <= 0 || p.y > canvas.height + 50) particles.splice(i,1);
      }
      if(particles.length > 0) raf = requestAnimationFrame(loop);
      else { cancelAnimationFrame(raf); raf = null; ctx.clearRect(0,0,canvas.width,canvas.height); }
    }
    raf = requestAnimationFrame(loop);
  }

  // public burst function
  window.particleBurst = function(x, y, opts = {}) {
    const count = opts.count || 26;
    const colors = opts.colors || ["#ffd1e6","#fff6f9","#ff9fc1","#ff6b94","#fff5ee","#ffd6ea"];
    for(let i=0;i<count;i++){
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 6) + 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (Math.random()*3);
      const p = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        g: 0.25 + Math.random()*0.2,
        life: 40 + Math.floor(Math.random()*40),
        size: 6 + Math.random()*8,
        color: colors[Math.floor(Math.random()*colors.length)],
        angle: Math.random()*Math.PI,
        spin: (Math.random()-0.5)*0.4
      };
      particles.push(p);
    }
    startLoop();
  };
})();
// ---------------- topImage with particle call ----------------
function topImage(i) {
    const imgs = Array.from(document.querySelectorAll('.image-stock img'));
    if (!imgs || imgs.length === 0) return;

    const clicked = imgs[i];
    if (!clicked) return;

    // compute center coordinates of clicked image relative to viewport
    const rect = clicked.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // fire particles at center (uses the particleBurst created above)
    if (typeof window.particleBurst === 'function') {
        window.particleBurst(cx, cy, { count: 28 });
    }

    // ---- existing z-index cycling logic (robust) ----
    // gather z-index values (fallback to 0)
    const zIndexes = imgs.map(img => {
        const z = img.style.zIndex;
        return z !== '' ? parseInt(z, 10) : 0;
    });

    const maxZ = Math.max(...zIndexes);
    const minZ = Math.min(...zIndexes);

    // if clicked image is already top => rotate stack (bottom -> top)
    if (parseInt(clicked.style.zIndex || 0, 10) === maxZ) {
        imgs.forEach(img => {
            const z = parseInt(img.style.zIndex || 0, 10);
            img.style.zIndex = (z === minZ) ? maxZ : (z - 1);
        });
    } else {
        // bring clicked image to top
        // set clicked to maxZ + 1, then normalize all z-index to keep numbers small
        clicked.style.zIndex = maxZ + 1;
        // normalize: set z-index based on position sorted by existing z
        const sorted = imgs.slice().sort((a,b) => (parseInt(a.style.zIndex||0) - parseInt(b.style.zIndex||0)));
        sorted.forEach((el, idx) => {
            el.style.zIndex = idx; // keep 0..n-1
        });
        // finally ensure clicked is top
        clicked.style.zIndex = imgs.length - 1;
    }

    // optional: add a tiny 'pop' class for animation if you have CSS for it (not required)
    clicked.classList.add('active');
    setTimeout(()=> clicked.classList.remove('active'), 420);
}
function makeForm(text, type = "name", question) {
    formDiv.innerHTML = `
        <div>
            <p class="">${text}</p>
            ${type == "answer" ? `<p class='text-md mt-2 text-sm'>${question}</p>` : ""}
            <form class="space-y-2 mt-1" id="entryForm">
                <input type="text" placeholder="${type == "answer" ? "Your Answer..." : "Enter Your Name..."}" id="input"
                    class="text-sm border-none outline-pink-500 text-pink-400 p-2 rounded" spellcheck="false" required autocomplete="off">
                <button type="submit" class="bg-white text-pink-400 p-2 font-semibold rounded">Enter</button>
            </form>
        </div>
`
    document.getElementById('input').focus()
    document.getElementById('entryForm').addEventListener('submit', (e) => { handleForm(e) })
}
function init() {
    window.topImage = topImage
    makeForm("This is not for everyone :)")
}
document.addEventListener('DOMContentLoaded', init)

const main_msg =`
2025 khatam ho gaya.
Ab hum sab ek nayi shuruaat kar rahe hain.
<br><br>
Mujhe nahi pata tum yeh message poora padhoge ya nahi,
lekin meri maano to ek baar zaroor padh lo.
Maine isse khud, word-by-word likha hai.
Isse padhne mein 4–5 minutes lagenge —
lekin yeh 2026 ke liye sirf ek message nahi, tumhari zindagi ka ek naya shuruaat hai.
Kya pata…
2026 waaqai tumhara best year of your life ban jaaye.<br><br>
Main maanta hoon 2025 shayad hamara best year nahi tha.
Ho sakta hai kami situation mein nahi, ham mein hi thi —
aur achhi baat yeh hai ki un kamiyon ko hum chahein to door kar sakte hain.
Mera yeh kehna nahi hai ki 2026 mein hum crorepati ban jaayenge
ya aisa kuchh ho jaayega jo agle 10 saalon mein bhi possible na ho.
Lekin haan…
hum un sab cheezon ke kaafi kareeb zaroor pahunch sakte hain.
Main chahta hoon 2026 sirf mera nahi, tumhara bhi best year ho.
Isliye mere saath yeh padho —
aur imagine karo ki yeh tum khud apne aap se keh rahe ho:
<br>
<br>
<b>
“Main jaanta hoon maine 2025 mein kai goals banaye the,
lekin main unhe poora nahi kar saka.
Iska dosh kisi aur ka nahi — main khud zimmedaar hoon.
Lekin is saal ke saath
main 2025 ke saare dukh, gham aur disappointments ko chhod raha hoon.
Ab waqt hai nayi soch banane ka,
aur apni zindagi mein kuchh aisa karne ka
jisse main aam na rahoon — balki rare aur unique banoon.
Main is saal ko apni zindagi ka sabse accha saal bana ke rahunga.
Agar 2020 jaise corona se bhi badi koi mushkil aa jaaye,
tab bhi main rukne wala nahi hoon.
Kab tak main khud se jhooth bolta rahunga
ki ‘iss saal kuchh achha karunga’?
Ab bas.
Yahi woh saal hai jab sab kuchh badlega.
Mujhe apne aap par poora bharosa hai
ki 2026 mera sabse strong saal hoga.
Aur 31 December 2026 ko main zaroor kuchh alag jagah par khada hoonga —
mere paas koi aisa dard, regret ya adhura sapna nahi hoga
jo mujhe sata sake.”</b>
<br><br>
~ R O H I T
<br> 
<br>
Yeh sirf padh lena kaafi nahi hai.
Isse zyada zaroori hai ki tum honestly apna analysis karo.
2025 mein tumne kya sahi kiya,
kya galti ki,
kis jagah khud ko ignore kiya,
aur 2026 mein exactly kya badalna chahte ho —
yeh sab clear hona chahiye.
Ideally yeh kaam tum khud paper par likh kar karte.
Lekin maine kaha na —
main chahta hoon ki 2026 sirf mera nahi, sabka accha saal bane.
Isliye maine yeh process tumhare liye ready kar diya hai.
Neeche diye gaye form mein apna real self-analysis likho.
Isse casually mat bharo — yeh tumhari life ka reset button hai.
<br>
<a href="https://forms.gle/sMUYm3oP46gZBsiS6"
   class="inline-flex items-center justify-center mt-6 px-8 py-3
          rounded-full bg-blue-400 text-white font-semibold text-base
          shadow-md hover:bg-pink-500 active:scale-95 transition">
   👉 START YOUR 2026
</a>
`