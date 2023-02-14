package com.brandnew.saw.domain.file;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.io.Serializable;

@Getter
@Entity
@NoArgsConstructor
public class ImageFile {

    @EmbeddedId
    private ImageFileId imageFileId;
    private String orgNm;
    private String savedNm;
    private String savedPath;
    private long size;

    @Builder
    public ImageFile(ImageFileId imageFileId, String orgNm, String savedNm, String savedPath, long size) {
        this.imageFileId = imageFileId;
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
        this.size = size;
    }
}
