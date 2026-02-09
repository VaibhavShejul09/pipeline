# ----------------------------
# Stage 1 — Build the application
# ----------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Create app directory
WORKDIR /app

# Copy only Maven config first to leverage cache
COPY pom.xml .

# Download dependencies (offline)
RUN mvn dependency:go-offline -B

# Now copy code and build
COPY src ./src
RUN mvn clean package -DskipTests

# ----------------------------
# Stage 2 — Final runtime image
# ----------------------------
FROM eclipse-temurin:21-jre-alpine

# Security: create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Working directory
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Use non-root user
USER appuser

# Expose documented port
EXPOSE 8761

# Runtime command
ENTRYPOINT ["java", "-jar", "app.jar"]
