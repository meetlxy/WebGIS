function onApiLoaded(){
    var map = new AMap.Map('container', {
        center: [117.146361,34.216403],
        zoom: 15
    });


map.on("complete", function(){
        log.success("地图加载完成！");  
    });

AMap.event.addDomListener(document.getElementById('pantoBtn'), 'click', function() {
        map.panTo([117.146361,34.216403]);
    });

map.plugin(['AMap.ToolBar','AMap.PlaceSearch','AMap.Walking'],function(){//异步同时加载多个插件
    
    var toolbar = new AMap.ToolBar();
    map.addControl(toolbar);
    
    var placeSearch = new AMap.PlaceSearch({ 
        type: '', // 兴趣点类别
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: "徐州", // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "panel", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });
    
    function searchclassroom(){
    var cpoint = [117.146361,34.216403]; //中心点坐标
    placeSearch.searchNearBy ('博学楼', cpoint, 10000, function(status, result) {

    });
}

function searchmall(){
    var cpoint = [117.146361,34.216403]; //中心点坐标
    placeSearch.searchNearBy ('超市', cpoint, 10000, function(status, result) {

    });
}

function walk(){
    var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    }); 
    walking.search([
        {keyword: '环测学院',city:'徐州'},
        {keyword: '学生第一餐厅',city:'徐州'}
    ], function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            log.success('绘制步行路线完成')
        } else {
            log.error('步行路线数据查询失败' + result)
        } 
    });
}

document.querySelector("#create-btn").onclick = searchclassroom;
document.querySelector("#destroy-btn").onclick = searchmall;
document.querySelector("#way").onclick = walk;
});


}
var url = 'https://webapi.amap.com/maps?v=1.4.14&key=a18b773d449563d623f886998432b842&callback=onApiLoaded';
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);