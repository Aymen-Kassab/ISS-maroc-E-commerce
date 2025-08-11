# Use official lightweight OpenJDK 17 image
FROM openjdk:17-jdk-alpine

# Copy the jar file into the container
COPY target/iss-maroc-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (default Spring Boot port)
EXPOSE 8080

# Run the app, telling it to listen on Railway's assigned port
ENTRYPOINT ["sh", "-c", "java -jar /app.jar --server.port=$PORT"]
