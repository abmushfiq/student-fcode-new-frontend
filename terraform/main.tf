provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "student-api-fcode-frontend"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = jsonencode([
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::${aws_s3_bucket.bucket.bucket}/*"
        }
      ]
    }
  ])

}


# resource "aws_s3_bucket_object" "static_files" {
#   bucket = aws_s3_bucket.bucket.bucket
#   key    = "index.html"
#   source = "./build/public/index.html"
#   content_type = "text/html"
#   etag   = filesha256("./build/public/index.html")  # Use filesha256() function for file checksum
#   acl    = "public-read"
# }

# resource "aws_s3_bucket_website_configuration" "website_config" {
#   bucket = aws_s3_bucket.bucket.bucket
#   index_document = "index.html"
#   error_document = "index.html"
# }

