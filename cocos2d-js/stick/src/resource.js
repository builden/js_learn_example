var res = {
    run1_png: "res/run/run1.png",
    run2_png: "res/run/run2.png",
    run3_png: "res/run/run3.png",
    bg_jpg: "res/bg.jpg",
    bg_front_png: "res/bg_front.png",
    blank_png: "res/blank.png",
    dead_mp3: "res/sound/dead.mp3",
    fall_mp3: "res/sound/fall.mp3",
    kick_mp3: "res/sound/kick.mp3",
    score_mp3: "res/sound/score.mp3",
    stick_grow_loop_mp3: "res/sound/stick_grow_loop.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
