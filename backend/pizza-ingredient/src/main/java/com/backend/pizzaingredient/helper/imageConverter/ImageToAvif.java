package com.backend.pizzaingredient.helper.imageConverter;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

public class ImageToAvif {

   private static final Path WORKING__DIRECTORY = Path.of("src", "main", "java", "com", "backend", "pizzaingredient", "helper", "imageConverter");

   public static byte[] converter(MultipartFile image) throws IOException, InterruptedException {
      Image resultingImage = ImageIO.read(image.getInputStream()).getScaledInstance(124, 112, Image.SCALE_DEFAULT);
      BufferedImage outputImage = new BufferedImage(124, 112, BufferedImage.TYPE_INT_RGB);
      outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);

      String originalNameWithoutExtension = Objects.requireNonNull(image.getOriginalFilename()).split("\\.")[0];

      ImageIO.write(outputImage, "jpg", new FileOutputStream(
              WORKING__DIRECTORY.toAbsolutePath() + "/images/" + originalNameWithoutExtension + ".jpg")
      );

      makeAvifImage(originalNameWithoutExtension);

      Files.delete(WORKING__DIRECTORY.resolve(Path.of("images", originalNameWithoutExtension + ".jpg")));

      Path avifImage = Path.of("images", originalNameWithoutExtension + ".avif");
      var avifFileBytes = Files.readAllBytes(WORKING__DIRECTORY.resolve(avifImage));
      Files.delete(WORKING__DIRECTORY.resolve(avifImage));

      return avifFileBytes;
   }

   private static void makeAvifImage(String originalName) throws IOException, InterruptedException {
      ProcessBuilder builder = new ProcessBuilder();
      builder.command("/bin/sh", "-c", "ls");
      builder.command(
              "avifenc", "images/" + originalName + ".jpg",
              "-j", "all", "-d", "10", "-y", "422", "--min", "36", "--max", "36", "--minalpha", "36", "--maxalpha", "36",
              "images/" + originalName + ".avif"
      );
      builder.directory(WORKING__DIRECTORY.toFile());

      var process = builder.start();

      BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
      Thread.sleep(2000);
      while (stdInput.ready()) System.out.println(stdInput.readLine());
      process.destroy();
   }
}
