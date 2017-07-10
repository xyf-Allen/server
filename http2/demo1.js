var obj={abc:"字符串",a:10,ccc:"jashj"};

function aa(obj) {
    with (obj) {
        var tpl = '';
        tpl += '<div class="abc">' + abc + '    '
        if (a > 10) {
            tpl += '<span class="abc">10</span>    '
        } else {
            tpl += '<span class="a">  ' + ccc + '</span>    '
        }
        tpl += '</div>';
        console.log(tpl)
    }
}


