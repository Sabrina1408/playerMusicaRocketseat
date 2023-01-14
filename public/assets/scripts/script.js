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
            img: "../public/assets/img/purple.png",
            song: "../public/assets/audio/acorda-pedrinho.mp3"
        },
        {
            nameSong: "Universo de coisas que eu desconheço",
            artist: "Lagum e Anavitória",
            img: "../public/assets/img/unsplash.jpg",
            song: "../public/assets/audio/universo-de-coisas-que-eu-desconheço.mp3"
        }
    ],
    start() {
        let i = 0;
        let updateTimer; /* v */
        clearInterval(updateTimer); /* v */
        reset();
        /* Fazer */
        function reset() {
            player.currentTime.textContent = "00:00";
            player.totalDuration.textContent = "00:00";
            player.rangeMusic.value = 0;
        }
        player.play.addEventListener("click", () => {
            if(this.audio.paused == true) {
                this.audio.src = player.list[i].song;
                this.audio.play();
                player.h1Player.forEach(element => {
                    element.innerHTML = player.list[i].nameSong;
                });
                player.h2Player.forEach(element => {
                    element.innerHTML = player.list[i].artist;
                });
                player.imgPlayer.forEach(element => {
                    element.src = player.list[i].img;
                });
                player.playPauseImage.src = "public/assets/img/pause.svg";
                /* Fazer */
                updateTimer = setInterval(() => {
                    console.log("a");
                }, 1000);
                console.log(this.audio.duration);
                let rangeMusicSeparate = this.audio.duration * (rangeMusic.value/100);
                this.currentTime = rangeMusicSeparate; // Não tá pegando
            } else {
                this.audio.pause();
                player.playPauseImage.src = "public/assets/img/play.svg";
            }
        });
        this.audio.addEventListener("ended", () => {
            if(i < player.list.length-1){
                i+=1;
                this.audio.src = player.list[i].song;
                this.audio.play();
                player.h1Player.forEach(element => {
                    element.innerHTML = player.list[i].nameSong;
                });
                player.h2Player.forEach(element => {
                    element.innerHTML = player.list[i].artist;
                });
                player.imgPlayer.forEach(element => {
                    element.src = player.list[i].img;
                });
            } else {
                i=0;
                this.audio.src = player.list[i].song;
                this.audio.play();
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
        });
        /* fazer */
        player.rangeMusic.addEventListener("change", () => {

        });
    
        player.back.addEventListener("click", () => {
            i--;
            if(i<=player.list.length){
                i=0;
            }
            if(this.audio.paused == true){
                player.playPauseImage.src = "public/assets/img/pause.svg";
            }
            player.h1Player.forEach(element => {
                element.innerHTML = player.list[i].nameSong;
            });
            player.h2Player.forEach(element => {
                element.innerHTML = player.list[i].artist;
            });
            player.imgPlayer.forEach(element => {
                element.src = player.list[i].img;
            });
            this.audio.src = player.list[i].song; /* v */
            this.audio.play();
            //Mudar o ícone de play pra pause se tiver
        });
        player.next.addEventListener("click", () => {
            i++;
            if(i>=player.list.length){
                i=0;
            }
            // Não está indo
            if(this.audio.paused == true){
                player.playPauseImage.src = "public/assets/img/pause.svg";
            }
            player.h1Player.forEach(element => {
                element.innerHTML = player.list[i].nameSong;
            });
            player.h2Player.forEach(element => {
                element.innerHTML = player.list[i].artist;
            });
            player.imgPlayer.forEach(element => {
                element.src = player.list[i].img;
            });
            this.audio.src = player.list[i].song; /* v */
            this.audio.play();
            //Mudar o ícone de play pra pause se tiver
        });
    }
}
player.start();

// Onde tem player pode trocar por this
// Botar o range
// Botar o tempo da música
// Pegar todos os elementos
// Mudar os audios
// Botar um onload com as informações do primeiro

//https://www.w3schools.com/tags/ref_av_dom.asp