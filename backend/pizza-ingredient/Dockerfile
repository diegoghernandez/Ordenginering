FROM eclipse-temurin:21 AS base
WORKDIR /app
RUN apt update && apt install -y libavif-bin

FROM base AS build
COPY . /app
RUN --mount=type=cache,id=maven,target=/root/.m2 ./mvnw clean dependency:go-offline
RUN --mount=type=cache,id=maven,target=/root/.m2 ./mvnw clean -o package -Dmaven.test.skip=true
#RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../../target/*.jar)

FROM base
#ARG DEPENDENCY=/app/build/dependency
#COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
#COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
#COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
#
#ENTRYPOINT ["java","-cp","app:app/lib/*","com.backend.pizzaingredient.PizzaIngredientApplication"]

COPY --from=build /app/target/pizza-ingredient-0.0.1-SNAPSHOT.jar /app
ENTRYPOINT ["java","-jar","pizza-ingredient-0.0.1-SNAPSHOT.jar"]