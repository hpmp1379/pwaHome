// cache storage 에 저장될 이름
// var CHCHE_NAME = "pwa-offline-v1";
var CHCHE_NAME = "pwa-offline-v2";

//  / 는 index.html가리키다(현재)
// 캐싱할 웹자원(이미지,css..등) 목록을 배열로

// var filesToCache = ["/", "/img/logo.png"];
var filesToCache = ["/", "img/logo.png", "css/main.css"];

//서비스워커 설치(웹지원 캐싱)
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CHCHE_NAME) //cache_name 변수 이름으로 cache storage에 캐시를 생성 ->PWA 파일 나옴
      //caches - 캐시스토리지에 접근할 수 있는 예약어

      .then(function (cache) {
        //캐싱이 성공했을때 (위에 결과물 캐시파일)
        return cache.addAll(filesToCache); //pwa파일 웹자원 추가
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

//서비스워커 설치 후 캐시된 자원에 대한 네트워크 요청이 있을때는 캐쉬로 돌려줌;
self.addEventListener("fetch", function (event) {
  event.respondWith(
    //fetch과에 대한 응답을 알려주는 paramter
    caches
      .match(event.request) //caches.match() - network request 해당하는 캐싱을 반환)
      .then(function (response) {
        return response || fetch(event.request); //cache에  없을때는 fetch API network로 가서 가져옴
      })
      .catch(function (error) {
        return console.log(error);
      })
  );
});

//서비스원커 활성화 및 업데이트
self.addEventListener("activate", function (event) {
  var newCacheList = ["pwa-offline-v2"]; //바뀐 내용
  event.waitUntil(
    //내부 동작이 끝날때까지 기다려줌
    caches
      .keys() //객체안에 모든 키들, 스토리지에 모든 내용 확인
      .then(function (cacheList) {
        //위에 목록을 가져온다
        return Promise.all; //여러 비동기 작업을 동시에 처리하여 결과를 얻고자 할때
        cacheList.map(function (cacheName) {
          //새로운 서비스워커에서 사용할 캐시 이외의 것들은 모두 삭제

          //문자열.indexOf('찾을문자') - 같은게 몇번째 인지 알아옴
          if (newCacheList.indexOf(cacheName) === -1) {
            //새로운 newCacheList의 아이템이 기존 캐쉬에 없을경우
            return caches.delete(cacheName);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  );
});
