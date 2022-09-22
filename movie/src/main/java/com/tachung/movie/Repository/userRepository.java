package com.tachung.movie.Repository;

import com.tachung.movie.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String Email);
}
