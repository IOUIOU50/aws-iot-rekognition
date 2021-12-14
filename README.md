# aws-iot-rekognition

aws rekognition과 라즈베리파이/카메라를 이용한 프로젝트

## synopsis

rekognition의 SDK로 주어지는 API중 하나인 `detectFaces()`메소드를 이용하여 카메라에 인식된 인물의 얼굴 갯수를 브라우저에 응답하는 간단한 프로젝트입니다.

## prerequisite

### dependensies

- node 14이상
- npm 6이상
- (라즈베리파이)라즈비안OS 필요
- 서버를 열 수 있는 PC(리눅스, 윈도우 무관)

### aws requisite

aws로부터 디바이스 생성 및 IAM으로부터 액세스 키를 발급받은 상태이어야 합니다.

`aws-rekognition`의 인증서는 

- 리눅스: `~/.aws/`경로에 `credentials`파일 생성 후 아래와 같이 `access_id`와 `secret_access_key`를 입력
- 윈도우: `c:\users\사용중인_계정\.aws`경로(없다면 생성) `credentials`생성 후 아래와 같이 `access_id`와 `secret_access_key`를 입력

```
[default]
aws_access_key_id=<발급받은_액세스키_id>
aws_secret_access_key=<발급받은_액세스키에대한_시크릿키>
```

## usage

먼저 하위 두 개의 디렉토리를 확인합니다.

```text
aws-iot-rekongtion
|---aws-iot-rekognition-ec2   // 웹 서버를 가동시킬 node.js(express)코드가 있습니다. 웹 서버에 이 디렉토리를 다운받습니다.
|---aws-iot-rekognition-pi    // 사진을 촬영할 라즈베리파이/카메라 코드가 있습니다. 라즈베리파이에 이 디렉토리를 다운받습니다.
```

그 후 각각 터미널을 열고, 아래의 커맨드를 입력합니다.

```
> npm install
> npx tsc
> node dist/index
```

이후 `http://localhost:3000` 또는 `http://{로컬ip주소}:3000`으로 접속하여 잘 동작하는지 확인합니다.

## 결과

<img width="252" alt="image" src="https://user-images.githubusercontent.com/57579709/146011787-10065e80-ad3b-4918-894d-e28ac2afefb0.png">

