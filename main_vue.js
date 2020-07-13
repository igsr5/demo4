var app = new Vue({
    el: "#app",
    data: {
        lat: 35.02725763144587,
        lng: 137.02609432481168,
        result: "",
    },
    watch: {
        // この関数は result が変わるごとに実行されます。
        result: function() {
            this.result.rest.map((item, index) => {
                //地図中に各店舗のマーカーを作成
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.latitude, item.longitude),
                    title: item.name,
                    label: {
                        text: String(index + 1),
                        color: "#fff",
                        fontWeight: 'bold',
                        fontSize: '14px'
                    },
                });

                // マーカーを地図中にセットする
                marker.setMap(map);
            });
        }
    },
})

function initMap() {
    let lat, lng, i;
    const url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"

    navigator.geolocation.getCurrentPosition((position) => {

        // 緯度経度の取得

        app.lat = position.coords.latitude;
        app.lng = position.coords.longitude;

        // 緯度経度の取得
        latLng = new google.maps.LatLng(app.lat, app.lng);

        // 地図の作成
        map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 16
        });

        const params = {
            keyid: "9be00fbaa95f4bcc1b759ab2072385e0",
            latitude: app.lat,
            longitude: app.lng,
            range: 5,
            hit_per_page: 20
        }


        $.getJSON(url, params, result => {
            app.result = result;
        })

    }, () => {
        alert('位置情報取得に失敗しました');
    });
}
