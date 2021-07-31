resource "aws_key_pair" "key" {
  key_name   = "shorty-key"
  public_key = file("${path.root}/key.pub")
}

resource "aws_instance" "ec2_instance" {
  ami                  = "ami-02f26adf094f51167"
  instance_type        = "t2.micro"
  key_name             = "shorty-key"
  vpc_security_group_ids = [aws_security_group.sg.id]

  tags = {
    Name = "shorty-ec2"
  }
}
