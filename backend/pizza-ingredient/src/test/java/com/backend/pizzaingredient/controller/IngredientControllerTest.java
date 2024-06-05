package com.backend.pizzaingredient.controller;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.advice.PizzaDataExceptionHandler;
import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.web.IngredientController;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class IngredientControllerTest {

   private MockMvc mockMvc;

   @Autowired
   private IngredientController ingredientController;

   @MockBean
   private IngredientService ingredientService;

   @BeforeEach
   public void setUp() {
      this.mockMvc = MockMvcBuilders.standaloneSetup(ingredientController)
              .setControllerAdvice(new PizzaDataExceptionHandler())
              .build();
   }

   @Test
   @DisplayName("Should return a not found status instead of all ingredients")
   void getAllIngredients__NOT__FOUND() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(List.of());

      mockMvc.perform(MockMvcRequestBuilders.get("/")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isNotFound());
   }

   @Test
   @DisplayName("Should return all ingredients available using the repository if exist")
   void getAllIngredients__OK() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(TestIngredientUtil.getIngredientList());

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.get("/")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestIngredientUtil.getIngredientList())));
   }

   @Test
   @DisplayName("Should return one IngredientDomain using the repository if the id exist")
   void getNameById() {
      Mockito.when(ingredientService.getIdByIngredientName("not-found"))
              .thenReturn(Optional.empty());

      Mockito.when(ingredientService.getIdByIngredientName("Pepperoni"))
              .thenReturn(Optional.of(33));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/name/not-found")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIdByIngredientName("not-found"),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/name/Pepperoni")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("33")),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIdByIngredientName("Pepperoni")
      );
   }

   @Test
   @DisplayName("Should return the desire id with the name using the service if exist")
   void getIdByIngredientName() {
      Mockito.when(ingredientService.getIdByIngredientName("not-found"))
              .thenReturn(Optional.empty());

      Mockito.when(ingredientService.getIdByIngredientName("Pepperoni"))
              .thenReturn(Optional.of(33));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/name/not-found")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIdByIngredientName("not-found"),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/name/Pepperoni")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("33")),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIdByIngredientName("Pepperoni")
      );
   }

   @Test
   @DisplayName("Should return the desire name with the id using the service if exist")
   void getIngredientNameById() {
      Mockito.when(ingredientService.getIngredientNameById(45325))
              .thenReturn(Optional.empty());

      Mockito.when(ingredientService.getIngredientNameById(1))
              .thenReturn(Optional.of("Pepperoni"));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/id/45325")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIngredientNameById(45325),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/id/1")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Pepperoni")),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIngredientNameById(1)
      );
   }

   @Test
   @DisplayName("Should catch an error instead of save it and return a bad request with a message")
   void saveIngredient__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Repeat name",
              IngredientType.VEGETABLE,
              "/meat/peperoni",
              "Author"
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/save/one")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDto)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"No repeat name\",\"fieldError\":null}"));
   }

   @Test
   @DisplayName("Should save one ingredientDto using the service")
   void saveIngredient__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Good",
              IngredientType.VEGETABLE,
              "/meat/peperoni",
              "Author"
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/save/one")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDto)))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().string("Ingredient save correctly"));
   }

   @Test
   @DisplayName("Should catch an error instead of save them and return a bad request with a message")
   void saveIngredientList__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                 "Repeat",
                 IngredientType.VEGETABLE,
                 "/meat/peperoni",
                 "Author"
              ),
              new IngredientDto(
                 "Repeat",
                 IngredientType.VEGETABLE,
                 "/meat/peperoni",
                 "Author"
              )
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/save/list")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDtoList)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"No repeat name\",\"fieldError\":null}"));
   }

   @Test
   @DisplayName("Should save the ingredientDto list using the service")
   void saveIngredientList__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                      "Good 1",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              ),
              new IngredientDto(
                      "Good 2",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              )
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/save/list")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDtoList)))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().string("All ingredients save correctly"));
   }
}