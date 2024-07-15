package com.backend.pizzaingredient.helper;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.helper.imageConverter.ImageToAvif;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@ExtendWith(OutputCaptureExtension.class)
class ImageToAvifTest {

   @Test
   @DisplayName("Should convert an image with the supported type bu java to avif")
   void converter(CapturedOutput capturedOutput) throws IOException, NotAllowedException {
      var avifImageBytes = ImageToAvif.converter(TestIngredientUtil.getImageFile());
      Path avifFile = Path.of("src", "test", "resources", "test.avif");

      FileUtils.writeByteArrayToFile(avifFile.toFile(), avifImageBytes);

      assertAll(
              () -> assertEquals("test.avif", avifFile.toFile().getName()),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Start processing of multipartFile to a jpg image with the right width and height"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Jpg image created at:"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Converted multipartFile to a jpg with the right size, took: "),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Start processing of jpg image to avif"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Successfully loaded: images/image.jpg"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("AVIF to be written: (Lossy)"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Wrote AVIF: images/image.avif"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Converted jpg image to avif, took: ")
      );

      Files.delete(avifFile);
   }
}
