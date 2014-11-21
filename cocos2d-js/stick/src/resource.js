var res = {
    bg_jpg: "res/bg.jpg",
    stick_plist: "res/stick.plist",
    stick_png: "res/stick.png",

    dead_mp3: "res/sound/dead.mp3",
    fall_mp3: "res/sound/fall.mp3",
    kick_mp3: "res/sound/kick.mp3",
    score_mp3: "res/sound/score.mp3",
    stick_grow_loop_mp3: "res/sound/stick_grow_loop.mp3"
};

var inRes = {
    run1_png: "#run1.png",
    blank_png: "#blank.jpg",
    bg_front_png: "#bg_front.png",
    settlement_bg_png: "#settlement_bg.png",
    rank_btn_png: "#rank_btn.png",
    replay_btn_png: "#replay_btn.png",
    share_btn_png: "#share_btn.png",
    score_bg_png: "#score_bg.png",
    title_png: "#title.png",
    play_png: "#play.png",
    help_png: "#help.png"
};

var aniRes = {
    run1_png: "run1.png",
    run2_png: "run2.png",
    run3_png: "run3.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
