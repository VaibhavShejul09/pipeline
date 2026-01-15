########################################
# Stage 1 — Build
########################################
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml ./

# Download dependencies (cached)
RUN mvn dependency:go-offline -B

# Copy source & build
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

########################################
# Stage 2 — Runtime
########################################
FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

USER appuser

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
