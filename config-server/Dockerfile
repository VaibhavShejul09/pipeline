# ----------------------------
# Stage 1 — Build
# ----------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Working directory
WORKDIR /app

# Copy only Maven config first (for dependency caching)
COPY pom.xml .

RUN mvn dependency:go-offline -B

# Copy source and build artifact
COPY src ./src
RUN mvn clean package -DskipTests

# ----------------------------
# Stage 2 — Runtime image
# ----------------------------
FROM eclipse-temurin:21-jre-alpine

# Create non‑root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy JAR built in stage 1
COPY --from=build /app/target/*.jar app.jar

# Switch to non‑root user
USER appuser

# Document the port
EXPOSE 8888

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
