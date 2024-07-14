package com.backend.pizzaingredient.helper;

import com.backend.pizzaingredient.TestIngredientUtil;
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

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@ExtendWith(OutputCaptureExtension.class)
class ImageToAvifTest {

   @Test
   @DisplayName("Should convert an image with the supported type bu java to avif")
   void converter(CapturedOutput capturedOutput) throws IOException, InterruptedException {
      var avifImageBytes = ImageToAvif.converter(TestIngredientUtil.getImageFile());
      FileUtils.writeByteArrayToFile(new File("src/test/resources/test.avif"), avifImageBytes);
      var avifFile = new File("src/test/resources/test.avif");

      assertAll(
              () -> assertEquals("test.avif", avifFile.getName()),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Successfully loaded: images/image.jpg"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("AVIF to be written: (Lossy)"),
              () -> Assertions.assertThat(capturedOutput.getOut()).contains("Wrote AVIF: images/image.avif")
      );

      avifFile.delete();
   }
}
