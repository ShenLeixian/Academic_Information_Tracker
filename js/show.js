function get_Area(x) {
    var tds = x.querySelectorAll('td')
    td = tds[7]
    if (td.innerText == "Area") {
        return 0;
    } else if (td.innerText == "VIS") {
        return 1
    } else if (td.innerText == "VR") {
        return 2
    } else if (td.innerText == "CG") {
        return 3
    } else if (td.innerText == "HCI") {
        return 4
    } else if (td.innerText == "DM") {
        return 5
    } else if (td.innerText == "AI") {
        return 6
    } else if (td.innerText == "NLP") {
        return 7
    } else if (td.innerText == "CV") {
        return 8
    } else if (td.innerText == "MM") {
        return 9
    } else if (td.innerText == "ID") {
        return 10
    }

    // items = td.innerText.split(" - ");

    // var delta = 0;
    // try {
    //     delta = parse(td.innerText);
    // }
    // catch(e){}

    // if (isNaN(delta)){
    //     delta = 0;
    // }else {
    //     delta = -1 * delta;
    // }

    return delta;
}

function get_conference_time(x) {
    var tds = x.querySelectorAll('td')
    td = tds[5]
    if (td.innerText == "Conference Date") {
        return -1;
    }

    items = td.innerText.split(" - ");

    var delta = 36600;
    try {
        var targetDate = Date.parse(items[1]);
        if (targetDate < Date.now()) {
            delta = -1
        }
        else {
            delta = targetDate - Date.now();
            delta = Math.floor(delta / (24 * 60 * 60 * 1000))
        }
    }
    catch (e) { }

    if (delta < 0) {
        delta = 36700;
    }

    if (isNaN(delta)) {
        delta = 36600;
    }

    return delta;
}


function get_Abstract_time(x) {
    var tds = x.querySelectorAll('td')
    td = tds[3]
    if (td.innerText == "Abstract Deadline") {
        return -1;
    }

    var delta = 36600;
    try {
        var targetDate = Date.parse(td.innerText)
        if (targetDate < Date.now()) {
            delta = -1
        }
        else {
            delta = targetDate - Date.now()
            delta = Math.floor(delta / (24 * 60 * 60 * 1000))
        }
    }
    catch (e) { }

    if (delta < 0) {
        delta = 36700;
    }

    if (isNaN(delta)) {
        delta = 36600;
    }

    return delta;
}

function get_submission_time(x) {
    var tds = x.querySelectorAll('td')
    td = tds[4]
    if (td.innerText == "Submission Deadline") {
        return -1;
    }

    var delta = 36600;
    try {
        var targetDate = Date.parse(td.innerText)
        if (targetDate < Date.now()) {
            delta = -1
        }
        else {
            delta = targetDate - Date.now()
            delta = Math.floor(delta / (24 * 60 * 60 * 1000))
        }
    }
    catch (e) { }

    if (delta < 0) {
        delta = 36700;
    }

    if (isNaN(delta)) {
        delta = 36600;
    }

    return delta;
}

function cmp(x, y) {
    var tx = get_time(x);
    var ty = get_time(y);
    var idx = get_idx(x);
    var idy = get_idx(y);
    if (tx < ty) return true;
    if (tx > ty) return false;
    return idx - idy;
}

function makeSortable_by_AbstractDeadline() {
    var table = document.getElementsByTagName("table")[0];
    var flag = false;

    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    rows.sort(function (x, y) {
        var tx = get_Abstract_time(x);
        var ty = get_Abstract_time(y);
        return tx - ty;

    });
    for (var i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }
}

function makeSortable_by_SubmissionDeadline() {
    var table = document.getElementsByTagName("table")[0];
    var flag = false;

    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    rows.sort(function (x, y) {
        var tx = get_submission_time(x);
        var ty = get_submission_time(y);
        return tx - ty;

    });
    for (var i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }
}

function makeSortable_by_Area() {
    var table = document.getElementsByTagName("table")[0];
    var flag = false;

    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    rows.sort(function (x, y) {
        var tx = get_Area(x);
        var ty = get_Area(y);
        return tx - ty;

    });
    for (var i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

}

function makeSortable_by_ConferenceDate() {
    var table = document.getElementsByTagName("table")[0];
    var flag = false;

    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    rows.sort(function (x, y) {
        var tx = get_conference_time(x);
        var ty = get_conference_time(y);
        return tx - ty;

    });
    for (var i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

}

function get_on_click() {
    var table = document.getElementsByTagName("table")[0];
    var t_hand = document.getElementsByTagName('tr')[0];
    var tds = t_hand.querySelectorAll('td');
    tds[3].onclick = makeSortable_by_AbstractDeadline;
    tds[4].onclick = makeSortable_by_SubmissionDeadline;
    tds[5].onclick = makeSortable_by_ConferenceDate;
    tds[7].onclick = makeSortable_by_Area;
    var area = document.getElementById("area");
    area.onclick = filter;
}


function filter() {
    var list = new Array();

    if (document.getElementById("VIS-checkbox").checked == true) {
        list.push("VIS");
    }
    if (document.getElementById("VR-checkbox").checked == true) {
        list.push("VR");
    }
    if (document.getElementById("CG-checkbox").checked == true) {
        list.push("CG");
    }
    if (document.getElementById("HCI-checkbox").checked == true) {
        list.push("HCI");
    }
    if (document.getElementById("DM-checkbox").checked == true) {
        list.push("DM");
    }
    if (document.getElementById("AI-checkbox").checked == true) {
        list.push("AI");
    }
    if (document.getElementById("NLP-checkbox").checked == true) {
        list.push("NLP");
    }
    if (document.getElementById("CV-checkbox").checked == true) {
        list.push("CV");
    }
    if (document.getElementById("MM-checkbox").checked == true) {
        list.push("MM");
    }
    if (document.getElementById("ID-checkbox").checked == true) {
        list.push("ID");
    }
    var table = document.getElementsByTagName("table")[0];
    // console.log(list)

    for (var i = 1; i < table.getElementsByTagName("tr").length; i++) {
        var tr = table.getElementsByTagName("tr")[i];
        var td = tr.getElementsByTagName("td")[7];
        var num = list.indexOf(td.innerHTML);
        if (num == -1) {
            tr.hidden = true;
            continue;
        } else {
            tr.hidden = false;
            continue;
        }
    }
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

//高亮显示
function heightlight(node, keyword) {
    node.innerHTML = node.innerHTML.replace(new RegExp(keyword, "g"), "<span class='heightlight'>" + keyword + "</span>");
}

//清除高亮
function clearHeightlight(node) {
    node.innerHTML = node.innerHTML.replace(/<span class=\"heightlight\">/g, "").replace(/<\/span>/g, "");
}

//恢复显示
function showAllTr(table) {
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        tr[i].hidden = false;
    }
}

//让列表变得可能够过滤
function makeFilterable(table) {
    var input = document.getElementById("input");

    input.oninput = function () {
        // clearHeightlight(table);
        showAllTr(table);

        //过滤词为空则直接返回
        if (!this.value)
            return;
        for (var i = 1; i < table.getElementsByTagName("tr").length; i++) {
            var tr = table.getElementsByTagName("tr")[i];
            //查找是否含有关键字,不含有则隐藏
            if (tr.innerHTML.indexOf(this.value) == -1) {
                tr.hidden = true;
                continue;
            }
            // for (var j = 0; j <  tr.cells.length; j++)
            //     heightlight(tr.cells[j], this.value);
        }
    };
    table.parentNode.insertBefore(input, table);
    return table;
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++)
        makeFilterable(tables[i]);
}

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
    get_on_click();
    document.querySelectorAll('tr').forEach(function (item) {
        var tds = item.querySelectorAll('td'),
        td3 = tds[3]
        td4 = tds[4]
        td5 = tds[5]
        try {
            var targetDate3 = Date.parse(td3.innerText)
            var targetDate4 = Date.parse(td4.innerText)
            if (targetDate3 < Date.now()) {
                td3.style.color = 'gray'
                td3.style.textDecoration = 'line-through'
            }
            else if (targetDate3 - Date.now() < 1000 * 60 * 60 * 24 * 30) {
                // td3.style.color = 'red'
                td3.style.fontWeight = 'bolder'
                var delta = targetDate3 - Date.now()
                var days = Math.floor(delta / (24 * 60 * 60 * 1000))
                td3.innerText = td3.innerText + '\n(' + days.toString() + ' days left' + ')'
            }
            if (targetDate4 < Date.now()) {
                td4.style.color = 'gray'
                td4.style.textDecoration = 'line-through'
            }
            else if (targetDate4 - Date.now() < 1000 * 60 * 60 * 24 * 30) {
                // td4.style.color = 'red'
                td4.style.fontWeight = 'bolder'
                var delta = targetDate4 - Date.now()
                var days = Math.floor(delta / (24 * 60 * 60 * 1000))
                td4.innerText = td4.innerText + '\n(' + days.toString() + ' days left' + ')'
            }
            if (Date.parse(td5.innerText.split(" - ")[1]) < Date.now()) {
                td5.style.color = 'gray'
                td5.style.textDecoration = 'line-through'
            }
        }
        catch (e) { }
    });
}
