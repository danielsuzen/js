 // 指定 dom
  var list = document.querySelector('.list');
  var sendData = document.querySelector('.send');
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

    //回傳bmi狀態到index頁面
    document.querySelector('.result').textContent = bmi_status;

    //alert(bmi_status);
    var todo = {
      bmi_status_text: bmi_status,
      bmi_text: bmi.toFixed(2),
      weight_text: weight,
      height_text: height,
      date_text: Date()
    };
     data.push(todo);
    updateList(data);
     localStorage.setItem('listData', JSON.stringify(data));
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
      str +='<li><span>'+items[i].bmi_status_text+'</span> BMI <span>'
      + items[i].bmi_text + '</span> weight <span>'
      + items[i].weight_text + '</span> height <span>'
      + items[i].height_text + '</span> <span>'
      + items[i].date_text + '</span></li>';
    }
    list.innerHTML = str;
  }
