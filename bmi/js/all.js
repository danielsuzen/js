 // 指定 dom
  var list = document.querySelector('.list');
  var sendData = document.querySelector('.send');
  var refresh = document.querySelector('.refresh');
  var data = JSON.parse(localStorage.getItem('listData')) || [];

  // 監聽與更新
  sendData.addEventListener('click', addData);
  updateList(data);

  //bmi狀態
  function bmiStatus(state) {
    //alert(state);
    var state_text ="";
    //判斷bmi狀態
    if (state>40) {
      state_text = "重度肥胖";
    }
    else if(state<=40 && state>35) {
      state_text = "中度肥胖";
    }
    else if(state<=35 && state>30) {
      state_text = "輕度肥胖";
    }
    else if(state<=30 && state>25) {
      state_text = "過重";
    }
    else if(state<=25 && state>18.5) {
      state_text = "理想";
    }
    else{
      state_text = "過輕";
    }
    return state_text;
  }

  //加入列表，並同步更新網頁與 localstorage
  function addData(e) {
    e.preventDefault();
    var height = document.querySelector('.height_text').value;
    var weight = document.querySelector('.weight_text').value;
    var bmi = weight/(height*height/10000);
    var bmi_status = bmiStatus(bmi);

    //回傳bmi數值到index頁面   
    document.querySelector('.result_bmi').textContent = bmi.toFixed(2);
    //回傳bmi狀態到index頁面
    document.querySelector('.result_bmi_status').textContent = bmi_status;

    //隱藏看結果案件，顯示bmi結果
    document.querySelector('.result_button').style.display="none";
    document.querySelector('.show_result').style.display="block";

    //結果紀錄到localStorage
    var d = new Date();
    var todo = {
      bmi_status_text: bmi_status,
      bmi_text: bmi.toFixed(2),
      weight_text: weight,
      height_text: height,
      date_text: String(d.getMonth() + 1).padStart(2, '0') + "-" + d.getDate() + "-" + d.getFullYear()
    };
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));

    //以回傳bmi狀態修改結果顯示顏色
    switch (bmi_status){
    case "理想":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#86D73F');
        document.querySelector('.result_bmi').style.color="#86D73F";
        document.querySelector('.bmi').style.color="#86D73F";
        document.querySelector('.result_bmi_status').style.color="#86D73F";
        document.querySelector('.refresh').style.backgroundColor="#86D73F";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #86D73F";
        break;
    case "過輕":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#31BAF9');
        document.querySelector('.result_bmi').style.color="#31BAF9";
        document.querySelector('.bmi').style.color="#31BAF9";
        document.querySelector('.result_bmi_status').style.color="#31BAF9";
        document.querySelector('.refresh').style.backgroundColor="#31BAF9";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #31BAF9";
        break;
    case "過重":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#FF982D');
        document.querySelector('.result_bmi').style.color="#FF982D";
        document.querySelector('.bmi').style.color="#FF982D";
        document.querySelector('.result_bmi_status').style.color="#FF982D";
        document.querySelector('.refresh').style.backgroundColor="#FF982D";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #FF982D";
        break;
    case "輕度肥胖":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#FF6C03');
        document.querySelector('.result_bmi').style.color="#FF6C03";
        document.querySelector('.bmi').style.color="#FF6C03";
        document.querySelector('.result_bmi_status').style.color="#FF6C03";
        document.querySelector('.refresh').style.backgroundColor="#FF6C03";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #FF6C03";
        break;
    case "中度肥胖":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#FF6C03');
        document.querySelector('.result_bmi').style.color="#FF6C03";
        document.querySelector('.bmi').style.color="#FF6C03";
        document.querySelector('.result_bmi_status').style.color="#FF6C03";
        document.querySelector('.refresh').style.backgroundColor="#FF6C03";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #FF6C03";
        break;
    case "重度肥胖":
        document.querySelector('.show_result svg circle').setAttribute('stroke','#FF1200');
        document.querySelector('.result_bmi').style.color="#FF1200";
        document.querySelector('.bmi').style.color="#FF1200";
        document.querySelector('.result_bmi_status').style.color="#FF1200";
        document.querySelector('.refresh').style.backgroundColor="#FF1200";
        document.querySelector('.show_record ul li').style.borderLeft="7px solid #FF1200";
        break;
    }
  }

  //refresh重置按鈕
  refresh.addEventListener('click', refreshButton);
  function refreshButton(e){
    document.querySelector('.height_text').value ="";
    document.querySelector('.weight_text').value ="";
    document.querySelector('.result_button').style.display="block";
    document.querySelector('.show_result').style.display="none";
  }


  // 更新網頁內容
  function updateList(items) {
    //沒有紀錄時隱藏BMI紀錄
    if (items == "") {
      document.querySelector('.show_record').style.display="none";
    }
    else{
      document.querySelector('.show_record').style.display="block";
    }

    str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
      str +='<li  data-index=' + i + '><span>'+items[i].bmi_status_text+'</span> BMI <span>'
      + items[i].bmi_text + '</span> weight <span>'
      + items[i].weight_text + '</span> height <span>'
      + items[i].height_text + '</span>'
      + items[i].date_text + '</li>';
    }

    list.innerHTML = str;

    var list_color = document.querySelectorAll('.show_record ul li');

    for (var j = 0; len > j; j++) {
      //以回傳bmi狀態修改紀錄顯示顏色
      switch (items[j].bmi_status_text){
      case "理想":
        list_color[j].style.borderLeft="7px solid #86D73F";
        break;
      case "過輕":
        list_color[j].style.borderLeft="7px solid #31BAF9";
        break;
      case "過重":
        list_color[j].style.borderLeft="7px solid #FF982D";
        break;
      case "輕度肥胖":
        list_color[j].style.borderLeft="7px solid #FF6C03";
        break;
      case "中度肥胖":
        list_color[j].style.borderLeft="7px solid #FF6C03";
        break;
      case "重度肥胖":
        list_color[j].style.borderLeft="7px solid #FF1200";
        break;
      }
    }

  }
