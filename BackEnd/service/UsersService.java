package com.brandnew.saw.service;

import com.brandnew.saw.config.PrincipalDetails;
import com.brandnew.saw.config.redis.RedisDao;
import com.brandnew.saw.domain.eat.Eat;
import com.brandnew.saw.domain.eat.EatRepository;
import com.brandnew.saw.domain.food.FoodRepository;
import com.brandnew.saw.domain.posts.Posts;
import com.brandnew.saw.domain.posts.PostsRepository;
import com.brandnew.saw.domain.user.User;
import com.brandnew.saw.domain.user.UserRepository;
import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.web.dto.users.UserInfoDto;
import com.brandnew.saw.web.dto.users.UserSignUpRequestDto;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class UsersService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final RedisDao redisDao;
    private final PostsRepository postsRepository;

    @Transactional
    public void save(UserSignUpRequestDto userSignUpRequestDto){
        if(userRepository.existsByEmail(userSignUpRequestDto.getEmail())){
            throw new BadRequestException("다시 확인해주세요.");
        }
        //여기
//
//        String emailInRedis = redisDao.getValues(userSignUpRequestDto.getEmail());
//        if (Objects.isNull(emailInRedis)) {
//            throw new BadRequestException("인증가능 시간이 초과되었습니다.");
//        }
//        else if(emailInRedis.equals("authEmail")){
//            redisDao.deleteValues(userSignUpRequestDto.getEmail());
//        }
//        else{
//            throw new BadRequestException("인증 번호가 다릅니다.");
//        }

        userRepository.save(User.createUser(userSignUpRequestDto, passwordEncoder));
    }

    @Transactional
    public void delete(Long id){
        User userEntity = userRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 유저는 없습니다.")
        );

        userRepository.delete(userEntity);
        postsRepository.deleteByUidAll(id);
        redisDao.deleteValues(userEntity.getId().toString());

    }

    @Transactional
    public void deleteR(Long id){
        User entity = userRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 유저는 없습니다.")
        );

        redisDao.deleteValues(entity.getId().toString());
    }

    @Transactional
    public void update(Long id, UserInfoDto userInfoDto) {
        User entity = userRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 유저는 존재하지 않습니다.")
        );

        if(!userInfoDto.getName().isBlank()){
            userRepository.updateName(userInfoDto.getName(), id);
        }
        if(StringUtils.isNotEmpty(userInfoDto.getPassword())){
            if(userInfoDto.getPassword().length() < 3 || userInfoDto.getPassword().length() > 16){
                throw new BadRequestException("비밀번호는 4자 이상, 16자 이하로 입력해주세요.");
            }
            userRepository.updatePaswword(passwordEncoder.encode(userInfoDto.getPassword()), id);
        }

    }

    public Map<String, Object> findByUser(Long id){
        User entity = userRepository.findById(id).orElseThrow(
                () -> new BadRequestException("해당 유저는 없습니다.")
        );

        Map<String, Object> result = new HashMap<>();
        result.put("message", entity);
        return result;
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<User> findUser = userRepository.findByEmail(userEmail);
        if (findUser.isPresent()) {
            return new PrincipalDetails(findUser);
        }
        return null;
    }


}
