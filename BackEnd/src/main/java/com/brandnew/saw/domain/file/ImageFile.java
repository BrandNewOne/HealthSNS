package com.brandnew.saw.domain.file;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ImageFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private Long imageId;

    private String orgNm;

    private String savedNm;

    private String savedPath;

    @Builder
    public ImageFile(Long id , Long imageId, String orgNm, String savedNm, String savedPath) {
        this.id = id;
        this.imageId = imageId;
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
    }
}
