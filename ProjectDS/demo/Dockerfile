FROM maven:3.8.3-openjdk-17 AS builder

WORKDIR /app
COPY pom.xml ./
COPY src ./src

EXPOSE 8080

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-XX:+UseContainerSupport", "-jar", "/app/app.jar"]