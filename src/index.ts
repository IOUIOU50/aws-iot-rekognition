import express, { Request, Response } from "express";
import AWS, { AWSError } from "aws-sdk";
import { StillCamera } from "pi-camera-connect";

const stillCamera = new StillCamera({
  width: 640,
  height: 480,
});

const rekognition = new AWS.Rekognition({
  apiVersion: "2016-06-27",
  region: "ap-northeast-2",
});

const app = express();

// express app settings
app.set("view engine", "ejs");
app.set("views", "./views");

// express middleware
app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  const cntPeople = await detectPeople();
  res.send(`<h1>현재 장소에 ${cntPeople}명이 있습니다.</h1>`);
});

app.listen(3000, () => {
  console.log(`Server started at port 3000`);
});

async function detectPeople(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    stillCamera.takeImage().then((image) => {
      const params = {
        Image: {
          Bytes: image,
        },
      };

      rekognition.detectFaces(
        params,
        (err: AWSError, data: AWS.Rekognition.DetectFacesResponse) => {
          if (err) {
            console.log(err, err.stack);
            reject(err);
          } else {
            resolve(data.FaceDetails.length);
          }
        }
      );
    });
  });
}
