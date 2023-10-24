var data = [
  {
    title: "昌平北四村选房系统",
    url: "http://www.klmxf.com",
  },
  {
    title: "海淀北四村选房系统1",
    url: "http://www.klmxf.com",
  },
  {
    title: "朝阳北四村选房系统2",
    url: "http://www.klmxf.com",
  },
  {
    title: "平谷北四村选房系统3",
    url: "http://www.klmxf.com",
  },
  {
    title: "密云北四村选房系统4",
    url: "http://www.klmxf.com",
  },
  {
    title: "东城北四村选房系统5",
    url: "http://www.klmxf.com",
  },
  {
    title: "西城北四村选房系统6",
    url: "http://www.klmxf.com",
  },
  {
    title: "大兴北四村选房系统7",
    url: "http://www.klmxf.com",
  },
  {
    title: "丰台北四村选房系统8",
    url: "http://www.klmxf.com",
  },
  {
    title: "石景山北四村选房系统9",
    url: "http://www.klmxf.com",
  },
  {
    title: "门头沟北四村选房系统10",
    url: "http://www.klmxf.com",
  },
  {
    title: "通州北四村选房系统11",
    url: "http://www.klmxf.com",
  },
  {
    title: "怀柔北四村选房系统12",
    url: "http://www.klmxf.com",
  },
  {
    title: "房山北四村选房系统13",
    url: "http://www.klmxf.com",
  },
  {
    title: "平谷北四村选房系统14",
    url: "http://www.klmxf.com",
  },
];

var selectVal = {};

function init(data) {
  var autocomplete_list = document.querySelector(".autocomplete_list");
  var autocomplete_list_html = "";
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      if (i < 10) {
        autocomplete_list_html +=
          "<li system='" +
          JSON.stringify(data[i]) +
          "'>" +
          data[i].title +
          "</li>";
      } else {
        break;
      }
    }
  }
  autocomplete_list.innerHTML = autocomplete_list_html;
  select();
}

function toggle() {
  var input = document.querySelector(".input");
  var autocomplete = document.querySelector(".autocomplete");
  input.addEventListener("focus", function () {
    autocomplete.style.display = "block";
  });
  input.addEventListener("blur", function () {
    setTimeout(() => {
      autocomplete.style.display = "none";
    }, 100);
  });
}

function select() {
  var autocomplete_list = document.querySelector(".autocomplete_list");
  var autocomplete_list_item = autocomplete_list.querySelectorAll("li");
  for (var i = 0; i < autocomplete_list_item.length; i++) {
    autocomplete_list_item[i].addEventListener("click", function () {
      selectVal = JSON.parse(this.getAttribute("system"));
      var input = document.querySelector(".input");
      input.value = selectVal.title;
    });
  }
}

function jump() {
  if (selectVal.url) {
    var input = document.querySelector(".input");
    location.href = selectVal.url;
    input.value = "";
  }
}

function change() {
  var input = document.querySelector(".input");
  input.addEventListener("input", function () {
    var newData = data.filter((f) => f.title.includes(this.value));
    var autocomplete = document.querySelector(".autocomplete");
    if (newData.length) {
      init(newData);
      autocomplete.style.display = "block";
    } else {
      autocomplete.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  init(data);
  toggle();
  change();
});
