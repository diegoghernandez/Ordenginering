package com.backend.pizzaingredient.domain;

import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.web.config.PizzaIngredientProperties;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

   private final PizzaIngredientProperties pizzaIngredientProperties;

   private final IngredientRepository ingredientRepository;

   public IngredientServiceImpl(PizzaIngredientProperties pizzaIngredientProperties, IngredientRepository ingredientRepository) {
      this.pizzaIngredientProperties = pizzaIngredientProperties;
      this.ingredientRepository = ingredientRepository;
   }

   @Override
   public List<IngredientEntity> getAllIngredients() {
      return ingredientRepository.findAll();
   }

   @Override
   public Optional<Integer> getIdByIngredientName(String name) {
      return ingredientRepository.findByIngredientName(name);
   }

   @Override
   public Optional<String> getIngredientNameById(int id) {
      return ingredientRepository.findByIdIngredient(id);
   }

   @Override
   public void saveIngredient(IngredientDto ingredientDto, MultipartFile image) throws NotAllowedException, IOException {
      if (ingredientRepository.existsByIngredientName(ingredientDto.ingredientName()))
         throw new NotAllowedException("Repeat names are not allowed");

      Image resultingImage = ImageIO.read(image.getInputStream()).getScaledInstance(124, 112, Image.SCALE_DEFAULT);
      BufferedImage outputImage = new BufferedImage(124, 112, BufferedImage.TYPE_INT_RGB);
      outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);

      var imageExtension = Arrays.stream(Objects.requireNonNull(image.getContentType()).split("/")).toList().get(1);
      var baos = new ByteArrayOutputStream();
      ImageIO.write(outputImage, imageExtension, baos);

      var credentials = AwsBasicCredentials.builder()
              .accessKeyId(pizzaIngredientProperties.accessKeyId())
              .secretAccessKey(pizzaIngredientProperties.secretAccessKey())
              .build();

      var s3 = S3Client.builder()
              .region(Region.CA_WEST_1)
              .credentialsProvider(StaticCredentialsProvider.create(credentials))
              .build();

      var objectRequest = PutObjectRequest.builder()
              .bucket(pizzaIngredientProperties.bucket())
              .key(image.getOriginalFilename())
              .contentType(image.getContentType())
              .build();

      s3.putObject(objectRequest, RequestBody.fromBytes(baos.toByteArray()));

      ingredientRepository.save(IngredientEntity.builder()
              .fileNameImage(image.getOriginalFilename())
              .ingredientName(ingredientDto.ingredientName())
              .ingredientType(ingredientDto.ingredientType())
              .authorImage(ingredientDto.authorImage())
              .build());
   }
}
