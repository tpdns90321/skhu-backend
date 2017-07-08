// 팬텀 유틸
var ph_utils = require('../ph_utils');

// 출결현황 조회
var run = function(req, res, next){
  console.log("POST /user/attendance");
  console.log("REMOTE IP : " + req.ip);
  console.log("REMOTE IPS : " + req.ips);

  // 파일별 url 설정
  var url = ph_utils.baseurl+"/Gate/UniMainStudent.aspx";

  // 파일별 콜백 함수
  var callbackFunc = (err, window) => {
    if(err == undefined) {
      var jsonAttendance = [];
      window.$("#gvList > tbody > tr")
        .each(function(index, element){
          if(index>=1){
            jsonAttendance.push({
              "subject" : utils.trim(window.$( element ).children("td:eq(0)").text()),
              "time" : utils.trim(window.$( element ).children("td:eq(1)").text()),
              "attend" : utils.trim(window.$( element ).children("td:eq(2)").text()),
              "late" : utils.trim(window.$( element ).children("td:eq(3)").text()),
              "absence" : utils.trim(window.$( element ).children("td:eq(4)").text()),
              "approved" : utils.trim(window.$( element ).children("td:eq(5)").text()),
              "menstrual" : utils.trim(window.$( element ).children("td:eq(6)").text()),
              "early" : utils.trim(window.$( element ).children("td:eq(7)").text())
            });
          }
        });

      // JSON 으로 처리하여 클라이언트에 응답
      res.send(JSON.stringify({
        "attendance" : jsonAttendance
      }));

    } else {
      console.log(err, stdout, stderr);
    }
  };

  // ph get 호출
  ph_utils.get(req, res, url, callbackFunc);
}

module.exports = run;