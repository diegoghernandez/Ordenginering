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

   private static final Path IMAGE__DIRECTORY = Path.of("").resolve("images")
           .normalize();

   public static byte[] converter(MultipartFile image) throws IOException, NotAllowedException {
      Files.createDirectories(IMAGE__DIRECTORY);
      log.info("Start processing of multipartFile at: " + IMAGE__DIRECTORY.toAbsolutePath());
      long startJPG = System.currentTimeMillis();

      Image resultingImage = ImageIO.read(image.getInputStream()).getScaledInstance(124, 112, Image.SCALE_DEFAULT);
      BufferedImage outputImage = new BufferedImage(124, 112, BufferedImage.TYPE_INT_RGB);
      outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);

      String originalNameWithoutExtension = Objects.requireNonNull(image.getOriginalFilename()).split("\\.")[0];

      ImageIO.write(outputImage, "jpg", new FileOutputStream(IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".jpg").toString()));

      log.info("Jpg image created at: " + IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".jpg").toAbsolutePath());
      long endJPG = System.currentTimeMillis();
      log.info("Converted multipartFile to a jpg with the right size, took: " + ((endJPG - startJPG) * 0.001) + " seconds");

      long startAvif = System.currentTimeMillis();
      var makeAvifImageResponse = makeAvifImage(originalNameWithoutExtension);

      if (!makeAvifImageResponse) {
         Files.delete(IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".jpg"));
         throw new NotAllowedException("Couldn't transform the image to avif");
      }

      long endAvif = System.currentTimeMillis();
      log.info("Converted jpg image to avif, took: " + ((endAvif - startAvif) * 0.001) + " seconds");

      Files.delete(IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".jpg"));

      var avifFileBytes = Files.readAllBytes(IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".avif"));
      Files.delete(IMAGE__DIRECTORY.resolve(originalNameWithoutExtension + ".avif"));

      return avifFileBytes;
   }

   private static boolean makeAvifImage(String originalName) {
      log.info("Start processing of jpg image to avif");
      try {
         ProcessBuilder builder = new ProcessBuilder();
         builder.command(
                 "avifenc", originalName + ".jpg",
                 "-j", "all", "-d", "10", "-y", "422", "--min", "36", "--max", "36", "--minalpha", "36", "--maxalpha", "36",
                 originalName + ".avif"
         );
         builder.directory(IMAGE__DIRECTORY.toFile());

         var process = builder.start();
         boolean finished = process.waitFor(3, TimeUnit.SECONDS);
         if (!finished) {
            process.destroy();
         }

         Path avifPath = IMAGE__DIRECTORY.resolve(Path.of(originalName + ".avif"));
         if (!Files.exists(avifPath)) throw new IOException("Avif file couldn't be created in the path: " + avifPath.toAbsolutePath());

         BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
         while (stdInput.ready()) log.info(stdInput.readLine());

         log.info("JPG image converted to avif at: " + avifPath.toAbsolutePath());
         return true;
      } catch (IOException | InterruptedException e) {
         log.error(e.getMessage());

         return false;
      }
   }
}
