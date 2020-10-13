/* instagram */
$(function () {
    try {
        instaurl = "https://www.instagram.com/";
        this.name = "minnano.hanare";
        $.ajax(instaurl + this.name + '/', {
            timeout: 2000,
            datatype: 'html'
        }).then(function (data) {
            json_string = data.split("window._sharedData = ")[1];
            json_string = json_string.split("};</script>")[0] + "}";
            this.Arrya_data = JSON.parse(json_string);
            let datas = this.Arrya_data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
            var num = 0;
            for (i in datas) {
                // カウンティング
                // 画像URL取得
                var url = datas[i].node.display_url;
                // テキスト取得
                var text = datas[i].node.edge_media_to_caption.edges[0].node.text;
                // リンク取得
                var link = instaurl + "/p/" + datas[i].node.shortcode;

                if (num < 6) {
                    this.html = `
<div class="col-lg-4 col-xs-6" style="padding:15px">
<a href="${link}" target="_blank">
<div class="FlexImg" style="background-image: url('${url}');">
</div>
</a>
</div>
`;
                    num += 1;
                    console.log(num);
                    $(".insta-card").append(this.html);
                }
            }
        });
    } catch (error) {
        alert(error);
    }
})
