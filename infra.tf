provider "aws" {
  region = "eu-central-1"
}

resource "aws_instance" "avangard_prod" {
  ami                  = "ami-7c412f13"
  instance_type        = "t2.micro"
  iam_instance_profile = "avangard_s3"

  tags {
    Name = "avangard_prod"
  }
}

resource "aws_security_group" "avangard_prod" {
  name = "https"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  name = "http"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_instance_profile" "avangard_s3" {
  name = "avangard_s3"
  role = "${aws_iam_role.avangard_s3.name}"
}

resource "aws_iam_role" "avangard_s3" {
  name = "avangard_s3"
  path = "/"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_s3_bucket" "b" {
  bucket = "avangard"
  acl    = "private"

  tags {
    Name = "avangard"
  }
}
