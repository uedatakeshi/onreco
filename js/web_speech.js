var recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";
recognition.maxAlternatives = 10;

//認識開始+設定の変更
function startRecognition() {
        //連続認識
        if ($("#continuous").prop("checked") == true) recognition.continuous = true;
        else recognition.continuous = false;

        //中間結果の表示
        if ($("#interim").prop("checked") == true) recognition.interimResults = true;
        else recognition.interimResults = false;

        recognition.start();
    }
    //話し声の認識中
recognition.onsoundstart = function() {
    $("#state").text("認識中");
};
//マッチする認識が無い
recognition.onnomatch = function() {
    $("#recognizedText").text("もう一度試してください");
};
//エラー
recognition.onerror = function() {
    $("#recognizedText").text("エラー");
};
//話し声の認識終了
recognition.onsoundend = function() {
    $("#state").text("停止中");
};
//認識が終了したときのイベント
recognition.onresult = function(event) {
    var results = event.results;
    for (var i = event.resultIndex; i < results.length; i++) {
        //認識の最終結果
        if (results[i].isFinal) {
            $("#recognizedText").text(results[i][0].transcript);
        }
        //認識の中間結果
        else {
            $("#recognizedText").text(results[i][0].transcript);
        }
    }

    //トップ10の認識仮説の表示
    $("#recognizedDetail").empty();
    for (var i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
            for (var j = 0; j < recognition.maxAlternatives; j++) {
                $("#recognizedDetail").append("<p>" + "ランク" + j + " " + results[i][j].transcript +
                    ": " + results[i][j].confidence +
                    "</p>");
            }
        }
    }

};