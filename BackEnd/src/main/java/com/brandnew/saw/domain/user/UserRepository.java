package com.brandnew.saw.domain.user;

import com.brandnew.saw.domain.posts.Posts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String Email);

    boolean existsByEmail(String Email);

    @Transactional
    @Modifying
    @Query(value = "UPDATE USER u SET u.name = :name WHERE u.id = :id", nativeQuery = true)
    int updateName(@Param("name") String name, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE USER u SET u.password = :password WHERE u.id = :id", nativeQuery = true)
    int updatePaswword(@Param("password") String password, @Param("id") Long id);

}
