# 1. Sử dụng image Java 17 làm môi trường chạy
FROM eclipse-temurin:17-jdk-alpine

# 2. Đặt thư mục làm việc bên trong container
WORKDIR /app

# 3. Copy file JAR của ứng dụng vào container (được tạo ra sau khi build maven)
COPY target/backend-api-0.0.1-SNAPSHOT.jar app.jar

# 4. Mở cổng 8081 để ứng dụng có thể nhận request
EXPOSE 8081

# 5. Lệnh để khởi chạy ứng dụng khi container được bật lên
ENTRYPOINT ["java", "-jar", "app.jar"]