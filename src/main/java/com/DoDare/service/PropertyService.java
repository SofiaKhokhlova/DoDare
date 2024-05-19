package com.DoDare.service;


import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PropertyService {

  @Value("${custom.base-image-url}")
  private String _baseImageUrl;

  @Value("${custom.items-images-dir}")
  private String _itemsImagesDir;

  @Getter
  private static String baseImagesUrl;

  @Getter
  private static String itemsImagesDir;

  @PostConstruct
  public void init() {
      baseImagesUrl = _baseImageUrl;
      itemsImagesDir = _itemsImagesDir;
  }
}
