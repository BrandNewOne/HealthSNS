package com.brandnew.saw.domain.file;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
public class ImageFileId implements Serializable {
    private long postsId;
    private Long imageId;

    @Builder
    public ImageFileId(long postsId, Long imageId) {
        this.postsId = postsId;
        this.imageId = imageId;
    }
}
