package com.DoDare.dto;

import com.DoDare.enums.ItemType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ItemDTO {
    private Long id;
    private String name;
    private String description;
    private String fileName;
    private ItemType type;
    private int price;

    // Currently is being set only on GET item request.
    // Probably also should be stored in DB for simplicity.
    // Or maybe we should store just the original file name and then
    // form url and filePath based on environmental variables
    // TODO: should be filled all the time?
    private String imageUrl;
}
