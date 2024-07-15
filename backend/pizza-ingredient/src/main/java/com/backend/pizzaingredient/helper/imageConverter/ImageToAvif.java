package com.backend.pizzaingredient.helper.imageConverter;

import com.backend.pizzaingredient.exceptions.NotAllowedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
public class ImageToAvif {

   private static final Path WORKING__DIRECTORY = Path.of("src", "main", "java", "com", "backend", "pizzaingredient", "helper", "imageConverter")
           .normalize();

   public static byte[] converter(MultipartFile image) throws IOException, NotAllowedException {
      log.info("Start processing of multipartFile to a jpg image with the right width and height");
      long startJPG = System.currentTimeMillis();

      Image resultingImage = ImageIO.read(image.getInputStream()).getScaledInstance(124, 112, Image.SCALE_DEFAULT);
      BufferedImage outputImage = new BufferedImage(124, 112, BufferedImage.TYPE_INT_RGB);
      outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);

      String originalNameWithoutExtension = Objects.requireNonNull(image.getOriginalFilename()).split("\\.")[0];

      ImageIO.write(outputImage, "jpg", new FileOutputStream(
              WORKING__DIRECTORY.toAbsolutePath() + "/images/" + originalNameWithoutExtension + ".jpg")
      );

      log.info("Jpg image created at: " + WORKING__DIRECTORY.toAbsolutePath() + "/images/" + originalNameWithoutExtension + ".jpg");
      long endJPG = System.currentTimeMillis();
      log.info("Converted multipartFile to a jpg with the right size, took: " + ((endJPG - startJPG) * 0.001) + " seconds");

      long startAvif = System.currentTimeMillis();
      var makeAvifImageResponse = makeAvifImage(originalNameWithoutExtension);

      Path jpgImagePath = Path.of("images", originalNameWithoutExtension + ".jpg");
      if (!makeAvifImageResponse) {
         Files.delete(WORKING__DIRECTORY.resolve(jpgImagePath));
         throw new NotAllowedException("Couldn't transform the image to avif");
      }

      long endAvif = System.currentTimeMillis();
      log.info("Converted jpg image to avif, took: " + ((endAvif - startAvif) * 0.001) + " seconds");

      Files.delete(WORKING__DIRECTORY.resolve(jpgImagePath));

      Path avifImage = Path.of("images", originalNameWithoutExtension + ".avif");
      var avifFileBytes = Files.readAllBytes(WORKING__DIRECTORY.resolve(avifImage));
      Files.delete(WORKING__DIRECTORY.resolve(avifImage));

      return avifFileBytes;
   }

   private static boolean makeAvifImage(String originalName) {
      log.info("Start processing of jpg image to avif");
      try {
         ProcessBuilder builder = new ProcessBuilder();
         builder.command(
                 "./avifenc", "images/" + originalName + ".jpg",
                 "-j", "all", "-d", "10", "-y", "422", "--min", "36", "--max", "36", "--minalpha", "36", "--maxalpha", "36",
                 "images/" + originalName + ".avif"
         );
         builder.directory(WORKING__DIRECTORY.toFile());

         var process = builder.start();
         boolean finished = process.waitFor(3, TimeUnit.SECONDS);
         if (!finished) {
            process.destroy();
         }

         BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
         while (stdInput.ready()) System.out.println(stdInput.readLine());

         return true;
      } catch (IOException | InterruptedException e) {
         log.error(e.getMessage());

         return false;
      }
   }
}
