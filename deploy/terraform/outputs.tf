output "frontend_dns" {
  value = aws_instance.frontend.public_dns
}

output "backend_dns" {
  value = aws_instance.backend.public_dns
}
