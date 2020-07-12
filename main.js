const showResult = result => {
    console.log(result.tatal_hit_count);
    $("#total").text(result.tatal_hit_count);
    result.rest.map(item => {
        $("#table").append(`
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.opentime}</td>
                        <td>${item.tel}</td>
                        <td><a href="${item.url}">pc版サイト</a></td>
                        <td><a href="${item.url_mobile}">スマホ版サイト</a></td>
                        <td>${item.access.station}${item.access.walk}分</td>
                        <td>${item.code.prefname}</td>
                        <td>${item.pr.pr_short}</td>
                        <td><img src="${item.image_url.shop_image1}"></td>
                        <td><img src="${item.image_url.shop_image2}"></td>
                        <td>${item.e_money}</td>
                    </tr>
                `);
    })
}

$(function() {

    let lat, lng;
    const url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"

    navigator.geolocation.getCurrentPosition((position) => {

        // 緯度経度の取得
        // pcの現在位置がおかしいため固定する
        // lat = position.coords.latitude;
        // lng = position.coords.longitude;
        lat=35.02725763144587;
        lng=137.02609432481168;

        console.log(lat, lng);

        const params = {
            keyid: "9be00fbaa95f4bcc1b759ab2072385e0",
            latitude: lat,
            longitude: lng,
            range: 5,
            hit_per_page:20
        }


        $.getJSON(url, params, result => {
            console.log(result.total_hit_count);
            console.log(result.hit_per_page);
            console.log(result.rest.length);
            showResult(result);
        })
    }, () => {
        alert('位置情報取得に失敗しました');
    });

})
