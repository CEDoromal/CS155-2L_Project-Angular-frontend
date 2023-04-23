import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class S3Service {

  private s3: S3Client;

  constructor(private http: HttpClient) {
    const ACCOUNT_ID = "bc84771a09dc41d4bfcbaeec3a6fd984";

    this.s3 = new S3Client({
      region: "auto",
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: environment.R2_ACCESS_KEY_ID,
        secretAccessKey: environment.R2_SECRET_ACCESS_KEY
      },
    });
  }


  async uploadFile(file: File) {

    const params = {
      Bucket: 'cs155-2l-project',
      Key: file.name,
      Body: file,
      ContentType: file.type
    };

    try {
      const response = await this.s3.send(new PutObjectCommand(params));
      console.log("SUCCESS", response);
    } catch (error) {
      console.log("FAILURE", error);
    }

  }

  async uploadFileWithPreSignedURL(file: File) {
  
    const params = {
      Bucket: 'cs155-2l-project',
      Key: file.name,
      ContentType: file.type
    };

    const command = new PutObjectCommand(params)

    try {
      const preSignedURL = await getSignedUrl(this.s3, command, { expiresIn: 3600});
      
      this.http.put(preSignedURL, file).subscribe({
        next: (res) => {
          console.log("SUCCESS", res);
        },
        error: (err) => {
          console.log("FAILED", err);
        },
        complete: () => {
          console.log("DONE")
        }
      })
    } catch(err) {
      console.log(err);
    }
  }

}
