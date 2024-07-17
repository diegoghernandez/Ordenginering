FROM eclipse-temurin:21 AS build
WORKDIR /app
COPY . /app
#RUN --mount=type=cache,id=maven,target=/root/.m2 ./mvnw clean dependency:go-offline
RUN --mount=type=cache,id=maven,target=/root/.m2 ./mvnw clean package -Dmaven.test.skip=true
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../../target/*-SNAPSHOT.jar)

FROM eclipse-temurin:21
WORKDIR /src/main/java
ARG DEPENDENCY=/app/build/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib ./lib
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes .
COPY --from=build ${DEPENDENCY}/META-INF ./META-INF

RUN apt update && apt install -y libavif-bin

ENTRYPOINT ["java","-cp",".:lib/*","com.backend.pizzaingredient.PizzaIngredientApplication"]