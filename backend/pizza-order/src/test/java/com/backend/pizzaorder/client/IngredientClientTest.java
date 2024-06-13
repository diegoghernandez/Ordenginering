package com.backend.pizzaorder.client;

import com.backend.pizzaorder.TestDataUtil;
import com.backend.pizzaorder.setup.client.IngredientClientWireMock;
import com.backend.pizzaorder.web.api.IngredientClient;
import feign.FeignException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseCookie;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class IngredientClientTest implements IngredientClientWireMock {

   @Autowired
   private IngredientClient ingredientClient;

   @Test
   @DisplayName("Should return the id of the desire ingredient if is found")
   void getIdByIngredientName() {
      var cookie = ResponseCookie.from(TestDataUtil.getCookie().getName(), TestDataUtil.getCookie().getValue()).build();
      var exception = assertThrows(FeignException.class, () -> ingredientClient.getIdByIngredientName("not-found", cookie));

      assertAll(
              () -> assertEquals(1, ingredientClient.getIdByIngredientName("Pepperoni", cookie)),
              () -> assertEquals(3, ingredientClient.getIdByIngredientName("Pineapple", cookie)),
              () -> assertEquals(404, exception.status())
      );
   }

   @Test
   @DisplayName("Should return the name of the desire ingredient if is found")
   void getIngredientNameById() {
      var cookie = ResponseCookie.from(TestDataUtil.getCookie().getName(), TestDataUtil.getCookie().getValue()).build();
      var exception = assertThrows(FeignException.class, () -> ingredientClient.getIngredientNameById(8765, cookie));

      assertAll(
              () -> assertEquals("Pineapple", ingredientClient.getIngredientNameById(3, cookie)),
              () -> assertEquals(404, exception.status())
      );
   }
}
