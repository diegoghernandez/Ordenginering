package com.backend.pizzaingredient.domain;

import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.helper.imageConverter.ImageToAvif;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.IngredientName;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.env.BucketProperties;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

   private final BucketProperties bucketProperties;

   private final IngredientRepository ingredientRepository;

   public IngredientServiceImpl(BucketProperties bucketProperties, IngredientRepository ingredientRepository) {
      this.bucketProperties = bucketProperties;
      this.ingredientRepository = ingredientRepository;
   }

   @Override
   public List<IngredientEntity> getAllIngredients() {
      return ingredientRepository.findAll();
   }

   @Override
   public boolean existIngredientId(int id) {
      return ingredientRepository.findByIdIngredient(id).isPresent();
   }

   @Override
   public Optional<IngredientName> getIngredientNameById(int id) {
      return ingredientRepository.findByIdIngredient(id);
   }

   @Override
   public void saveIngredient(IngredientDto ingredientDto, MultipartFile image) throws NotAllowedException, IOException {
      if (
              ingredientRepository.findByNameIfExist(ingredientDto.ingredientName().getEn()).isPresent() ||
              ingredientRepository.findByNameIfExist(ingredientDto.ingredientName().getEs()).isPresent()
      ) {
         throw new NotAllowedException("Repeat names are not allowed");
      }

      var imageBytes = ImageToAvif.converter(image);
      var imageNameWithoutExtension = Objects.requireNonNull(image.getOriginalFilename()).split("\\.")[0];

      var credentials = AwsBasicCredentials.builder()
              .accessKeyId(bucketProperties.accessKeyId())
              .secretAccessKey(bucketProperties.secretAccessKey())
              .build();

      var s3 = S3Client.builder()
              .region(Region.US_WEST_2)
              .credentialsProvider(StaticCredentialsProvider.create(credentials))
              .build();

      var objectRequest = PutObjectRequest.builder()
              .bucket(bucketProperties.name())
              .key("image/ingredients/" + imageNameWithoutExtension + ".avif")
              .contentType("image/avif")
              .build();

      s3.putObject(objectRequest, RequestBody.fromBytes(imageBytes));

      ingredientRepository.save(IngredientEntity.builder()
              .fileNameImage(imageNameWithoutExtension)
              .ingredientName(ingredientDto.ingredientName())
              .ingredientType(ingredientDto.ingredientType())
              .authorImage(ingredientDto.authorImage())
              .build());
   }
}
