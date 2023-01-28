package com.brandnew.saw.domain.file;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageFileRepository extends JpaRepository<ImageFile, Long>, ImageFileRepositoryCustom {

}
