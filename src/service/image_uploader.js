class ImageUploader {
    async upload(file) {
        const data = new FormData();
        data.append('file', file); /*POST에 필요한 데이터 전달*/
        data.append('upload_preset', 'w9pxjlsr');
        const result = await fetch(
          'https://api.cloudinary.com/v1_1/ddwswbchd/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        return await result.json();
    }
}

export default ImageUploader;

/*
ImageUploader: 서버에 이미지 업로드 후 URL등의 결과값 리턴

[이미지 업로드 Dependency Injection과정]
1. Dependency Injection이 필요한 이유: 
    ImageUploader 컴포넌트 생성 후 Image_file_input에서 사용하고자 할 때에, 5가지 이상의 클래스를 거쳐 props를 전달해야 한다. 만약 Image_file_input이 다수의 props를  전달받게 된다면, 불필요한 코드가 늘어남으로 이를 방지하깅 위해 아래와 같은 방법으로 Dependency Injection을 사용할 수 있다.

2. 과정: 
    (1) props을 전달하는 최상위 파일에서 FileInput을 생성한다 (index.js 파일참고)
        -> FileInput: Image_file_input이 prop을 전달받으면, 이를 전달
    (2)

* Dependency Injection: 어떤 함수나 클래스가 사용하는 다른 함수나 클래스를 외부에서 생성하여 넣어주는 것

[Cloudinary Image Upload API]
'w9pxjlsr':
Cloudinary 사이트 접속 - setting - upload - Add upload preset - Unsigned 및 기타설정 - Save - Unsigned Name
URL:
'https://api.cloudinary.com/v1_1/<cloud_name>/<resource_type>/upload'

[REST API]
POST: POST를 통해 해당 URL을 요청하면 리소스 생성
GET: GET을 통해 해당 리소스를 조회하고 자세한 정보를 가져옴
PUT: PUT을 통해 리소스 수정
DELETE: DELETE을 통해 리소스 삭제
*/