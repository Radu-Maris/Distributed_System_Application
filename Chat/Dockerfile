# Use OpenJDK 17 base image
FROM openjdk:17-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and the project pom.xml to the container
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the entire project source code to the container
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Create a new image based on openjdk
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the previous image
COPY --from=build /app/target/Chat-0.0.1-SNAPSHOT.jar /app/chat.jar

# Expose the port the app runs on
EXPOSE 8083

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "/app/chat.jar"]
