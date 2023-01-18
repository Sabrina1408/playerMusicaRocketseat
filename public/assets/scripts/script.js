const player = {
    audio: document.createElement("audio"), /* mudar pra create */
    play: document.querySelector(".play"),
    back: document.querySelector(".back"),
    next: document.querySelector(".next"),
    rangeMusic: document.querySelector(".rangeMusic"),
    currentTime: document.querySelector(".currentTime"),
    totalDuration: document.querySelector(".totalDuration"),
    /* https://www.youtube.com/watch?v=vqrjFnq3-uo */

    playPauseImage: document.querySelector(".playPauseImage"),

    h1Player: document.querySelectorAll(".h1Player"),
    h2Player: document.querySelectorAll(".h2Player"),
    imgPlayer: document.querySelectorAll(".imgPlayer"),
    list: [
        {
            nameSong: "Acorda Devinho",
            artist: "Banda Rocketseat",
            img: "public/assets/img/purple.png",
            song: "public/assets/audio/acorda-pedrinho.mp3"
        },
        {
            nameSong: "Universo de coisas que eu desconheço",
            artist: "Lagum e Anavitória",
            img: "public/assets/img/unsplash.jpg",
            song: "public/assets/audio/universo-de-coisas-que-eu-desconheço.mp3"
        }
    ],
    start() {
        let i = 0;
        let updateTimer;
        clearInterval(updateTimer);
        reset();
        function musicInformation() {
            player.h1Player.forEach(element => {
                element.innerHTML = player.list[i].nameSong;
            });
            player.h2Player.forEach(element => {
                element.innerHTML = player.list[i].artist;
            });
            player.imgPlayer.forEach(element => {
                element.src = player.list[i].img;
            });
        }
        window.addEventListener("load", () => {
            console.log("page is fully loaded");
            musicInformation();
        });
        window.onload = musicInformation();
        /* Fazer */
        function reset() {
            player.currentTime.textContent = "00:00";
            player.totalDuration.textContent = "00:00";
            player.rangeMusic.value = 0;
        }
        this.play.addEventListener("click", () => {
            if(this.audio.paused == true) {
                this.audio.src = this.list[i].song;
                this.audio.play();
                musicInformation();
                this.playPauseImage.src = "public/assets/img/pause.svg";
                /* Fazer */
                updateTimer = setInterval(() => {
                    console.log(Math.floor(this.audio.currentTime/60));
                    console.log(Math.floor(this.audio.duration/60));
                    /* console.log((this.audio.currentTime/60).toFixed(2));
                    console.log((this.audio.duration/60).toFixed(2)); */
                    /* console.log((this.audio.currentTime/(this.audio.duration/60)*100).toFixed(2))
                    player.rangeMusic.style.width = (this.audio.currentTime/60*100).toFixed(2); */
                }, 1000); // Se apertar mais ta indo mais rápido
                /* let rangeMusicSeparate = this.audio.duration * (this.rangeMusic.value/100);
                this.currentTime = rangeMusicSeparate; // Não tá pegando */
            } else {
                this.audio.pause();
                this.playPauseImage.src = "public/assets/img/play.svg";
            }
        });
        this.audio.addEventListener("ended", () => {
            if(i < this.list.length-1){
                i+=1;
                this.audio.src = player.list[i].song;
                this.audio.play();
                musicInformation();
            } else {
                i=0;
                this.audio.src = player.list[i].song;
                this.audio.play();
                musicInformation();
            }
        });
        /* fazer */
        this.rangeMusic.addEventListener("change", () => {
            let positionRange = this.audio.duration * (player.rangeMusic.value/100);
            console.log(player.rangeMusic.value);
            this.audio.currentTime = positionRange;
        });
    
        this.back.addEventListener("click", () => {
            i--;
            if(i<=this.list.length){
                i=0;
            }
            if(this.audio.paused == true){
                this.playPauseImage.src = "public/assets/img/pause.svg";
            }
            musicInformation();
            this.audio.src = this.list[i].song; /* v */
            this.audio.play();
        });
        this.next.addEventListener("click", () => {
            i++;
            if(i>=this.list.length){
                i=0;
            }
            if(this.audio.paused == true){
                this.playPauseImage.src = "public/assets/img/pause.svg";
            }
            musicInformation();
            this.audio.src = this.list[i].song; /* v */
            this.audio.play();
        });
    }
}
player.start();

// Botar o range
// Botar o tempo da música
// Pegar todos os elementos
// Não está funcionando no Opera, mas funciona no Edge e Chrome
// Pause vai mais reinicia a musica

//https://www.w3schools.com/tags/ref_av_dom.asp
//https://www.youtube.com/watch?v=vOBlIR8cneg