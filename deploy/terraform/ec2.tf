resource "aws_key_pair" "key" {
  key_name   = "shorty-key"
  public_key = file("${path.root}/key.pub")
}

resource "aws_instance" "frontend" {
  ami                    = "ami-02f26adf094f51167"
  instance_type          = "t2.micro"
  key_name               = "shorty-key"
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]

  tags = {
    Name = "shorty-frontend"
  }
}

resource "aws_instance" "backend" {
  ami                    = "ami-02f26adf094f51167"
  instance_type          = "t2.micro"
  key_name               = "shorty-key"
  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  tags = {
    Name = "shorty-backend"
  }
}
