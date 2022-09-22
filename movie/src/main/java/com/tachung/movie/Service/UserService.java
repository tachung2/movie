package com.tachung.movie.Service;

import com.tachung.movie.Dto.UserDto;
import com.tachung.movie.Entity.UserEntity;
import com.tachung.movie.Repository.userRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final userRepository userrepository;


    public Long save(UserDto userDto) {
        UserEntity userEntity = UserEntity.toSaveEntity(userDto);
        Long savedId = userrepository.save(userEntity).getId();
        return savedId;
    }

    public UserDto login(UserDto userDto) {
        Optional<UserEntity> optionalUserEntity = userrepository.findByEmail(userDto.getEmail());
        if (optionalUserEntity.isPresent()) {
            UserEntity loginEntity = optionalUserEntity.get();
            if (loginEntity.getPassword().equals(userDto.getPassword())) {
                return UserDto.toUserDto(loginEntity);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
