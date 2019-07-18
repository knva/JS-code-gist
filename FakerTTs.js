    var FakerTTS = {

        playurl: function (url) {
            var audio = new Audio(url);
            audio.play();
        },
        playtts: function (text) {
            let url = `https://fanyi.baidu.com/gettts?lan=zh&text=${text}&spd=5&source=web`;
            FakerTTS.playurl(url);
        }

    }
