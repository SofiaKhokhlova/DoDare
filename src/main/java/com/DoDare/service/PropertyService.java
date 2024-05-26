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

    @Value("${custom.default-head-filename}")
    private String _defaultHeadFilename;

    @Value("${custom.default-body-filename}")
    private String _defaultBodyFilename;

    @Value("${custom.default-legs-filename}")
    private String _defaultLegsFilename;

    @Getter
    private static String baseImagesUrl;

    @Getter
    private static String itemsImagesDir;

    @Getter
    private static String defaultHeadFilename;

    @Getter
    private static String defaultBodyFilename;

    @Getter
    private static String defaultLegsFilename;

    @PostConstruct
    public void init() {
        baseImagesUrl = _baseImageUrl;

        itemsImagesDir = _itemsImagesDir;
        defaultHeadFilename = _defaultHeadFilename;
        defaultBodyFilename = _defaultBodyFilename;
        defaultLegsFilename = _defaultLegsFilename;


    }
}
